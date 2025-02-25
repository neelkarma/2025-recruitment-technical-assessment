use axum::{
    http::{header::ValueDrain, StatusCode},
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;

pub async fn process_data(Json(request): Json<DataRequest>) -> impl IntoResponse {
    let mut string_len = 0;
    let mut int_sum = 0;

    for item in request.data {
        match item {
            Value::String(string) => string_len += string.len(),
            Value::Number(num) => {
                // i'm assuming that we only accept integers, due to the response variable name
                if let Some(int) = num.as_i64() {
                    int_sum += int;
                } else {
                    // not exactly sure how to return error messages without pissing off the compiler, sry
                    return (StatusCode::BAD_REQUEST, Json(DataResponse::default()));
                }
            }
            _ => return (StatusCode::BAD_REQUEST, Json(DataResponse::default())),
        }
    }

    let response = DataResponse {
        string_len,
        int_sum,
    };

    (StatusCode::OK, Json(response))
}

#[derive(Deserialize)]
pub struct DataRequest {
    data: Vec<Value>,
}

#[derive(Serialize)]
pub struct DataResponse {
    string_len: usize,
    int_sum: i64,
}

impl Default for DataResponse {
    fn default() -> Self {
        Self {
            string_len: 0,
            int_sum: 0,
        }
    }
}
