import express from 'express';
import { RecipeModel } from '../models/Recipes.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // We can find in our DB with filters. Here we don't use filters cause we want all of them
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res) => {
  // We create the structure of our model with the request body
  const recipe = new RecipeModel({ ...req.body });

  try {
    // We can find in our DB with filters. Here we don't use filters cause we want all of them
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

export { router as recipesRouter };
