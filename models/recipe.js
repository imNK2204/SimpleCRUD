const mongoose = require("mongoose");
// mongoose.pluralize(null);

// user schema
const recipeSchema = mongoose.Schema({
    id: String,
    name: String,
    description: String
});

const recipeModel = mongoose.model("fullstack", recipeSchema, "fullstack");

module.exports = recipeModel;