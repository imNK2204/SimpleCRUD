require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.port || 5000;
const mongoose = require("mongoose");

const recipeModel = require("./models/recipe");

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("mongo db connected"));

app.get("/", (req, res) => res.send("Hello FullStack!"));

app.get("/list", async (req, res) => {
    const recipeList = await recipeModel.find({});

    if(recipeList.length == 0){
        return res.json({ data: "No recipes found"});
    }

    return res.json({ data: recipeList });
});

// add recipe
app.post("/addRecipe", (req, res) => {
    const { newRecipe } = req.body;
    recipeModel.create(newRecipe);
    return res.json({ data: "New recipe added successfully"});
})

// update recipe

app.put("/recipe/update/:id", async (req, res) => {
    const id = req.params.id
    const name = req.body.name;
    const desc = req.body.description;
    const updatedUser = await recipeModel.updateMany(
        { id: id },
        { name: name },
        { description: desc }
    );

    return res.json({ data: "details updated successfully" });
});

// delete recipe

app.delete("/recipe/deleterecipe/:name", async (req, res) => {
    const name = req.params.name;
    const deletedRecipe = await recipeModel.findOneAndDelete({ name: name });
    return res.json({ data: "Recipe deleted successfully" });
});

app.listen(port, () => console.log(`server running on port ${port}`));
