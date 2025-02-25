import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: {
  ingredients: { [key: string]: ingredient };
  recipes: { [key: string]: recipe };
} = {
  ingredients: {},
  recipes: {},
};

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input);
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  const result = recipeName
    .replace(/(-|_)/g, " ")
    .replace(/[^a-zA-Z\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length)
    .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
    .join(" ");

  if (!result.length) return null;
  return result;
};

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
  const { type, name } = req.body;

  if (
    !type ||
    !name ||
    name in cookbook.ingredients ||
    name in cookbook.recipes
  ) {
    res.status(400).send();
    return;
  }

  switch (type) {
    case "ingredient":
      const { cookTime } = req.body;
      if (typeof cookTime !== "number") {
        res.status(400).send();
        return;
      }
      if (cookTime < 0) {
        res.status(400).send();
        return;
      }
      cookbook.ingredients[name] = { type, name, cookTime };
      res.status(200).send();
      break;

    case "recipe":
      const { requiredItems } = req.body;
      if (!Array.isArray(requiredItems)) {
        res.status(400).send();
        return;
      }

      cookbook.recipes[name] = { type, name, requiredItems };
      res.status(200).send();
      break;

    default:
      res.status(400).send();
      return;
  }
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req: Request, res: Request) => {
  const { name } = req.query;

  if (!(name in cookbook.recipes)) {
    res.status(400).send();
    return;
  }

  const recipe = cookbook.recipes[name];

  const ingredientQuantities: { [key: string]: number } = {};
  let cookTime = 0;

  const queue = [...recipe.requiredItems];
  while (queue.length) {
    const item = queue.shift();
    if (item.name in cookbook.ingredients) {
      ingredientQuantities[item.name] =
        ingredientQuantities[item.name] ?? 0 + item.quantity;
      cookTime += cookbook.ingredients[item.name].cookTime * item.quantity;
    } else if (item.name in cookbook.recipes) {
      const recipe = cookbook.recipes[item.name];
      queue.push(...recipe.requiredItems);
    } else {
      res.status(400).send();
      return;
    }
  }

  res.status(200).send({
    name: recipe.name,
    cookTime,
    ingredients: Object.entries(ingredientQuantities).map(
      ([name, quantity]) => ({ name, quantity }),
    ),
  });
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
