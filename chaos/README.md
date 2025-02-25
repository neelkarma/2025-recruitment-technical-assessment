> This question is relevant for **chaos backend**

# DevSoc Subcommittee Recruitment: Chaos Backend

**_Complete as many questions as you can._**

## Question 1

You have been given a skeleton function `process_data` in the `data.rs` file.
Complete the parameters and body of the function so that given a JSON request of the form

```json
{
  "data": ["Hello", 1, 5, "World", "!"]
}
```

the handler returns the following JSON:

```json
{
  "string_len": 11,
  "int_sum": 6
}
```

Edit the `DataResponse` and `DataRequest` structs as you need.

## Question 2

### a)

Write (Postgres) SQL `CREATE TABLE` statements to create the following schema.
Make sure to include foreign keys for the relationships that will `CASCADE` upon deletion.
![Database Schema](db_schema.png)

**Answer box:**

```sql
CREATE TYPE question_type AS enum ('ShortAnswer', 'MultiSelect', 'MultiChoice');

CREATE TABLE forms (
    id integer PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL
);

CREATE TABLE questions (
    id integer PRIMARY KEY,
    form_id integer REFERENCES forms (id) NOT NULL ON DELETE CASCADE,
    title text NOT NULL,
    question_type question_type NOT NULL
);

CREATE TABLE question_options (
    id integer PRIMARY KEY,
    question_id integer REFERENCES questions (id) NOT NULL ON DELETE CASCADE,
    option text NOT NULL
);
```

### b)

Using the above schema, write a (Postgres) SQL `SELECT` query to return all questions in the following format, given the form id `26583`:

```
   id    |   form_id   |           title             |   question_type   |     options
------------------------------------------------------------------------------------------------------------
 2       | 26583       | What is your full name?     | ShortAnswer       | [null]
 3       | 26583       | What languages do you know? | MultiSelect       | {"Rust", "JavaScript", "Python"}
 7       | 26583       | What year are you in?       | MultiChoice       | {"1", "2", "3", "4", "5+"}
```

**Answer box:**

```sql
SELECT
    q.id,
    q.form_id,
    q.title,
    q.question_type,
    array_agg(o.option) AS options
FROM questions q
LEFT JOIN question_options o ON o.question_id = q.id
GROUP BY q.id;
```

