import express from 'express';
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';

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

// Create new recipe
router.post('/', async (req, res) => {
  // We create the structure of our model with the request body
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });

  try {
    // We can find in our DB with filters. Here we don't use filters cause we want all of them
    const response = await recipe.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// Save a Recipe
router.put('/', async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes.
router.get('/savedRecipes/ids', async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});

// Get saved recipes
router.get('/savedRecipes', async (req, res) => {
  try {
    const user = UserModel.findById(req.body.userID);
    const savedRecipes = RecipeModel.find({
      id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});
export { router as recipesRouter };
