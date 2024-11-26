const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Importez les routes
const articlesRouter = require("./api/articles/articles.router");

// Middleware pour parser le JSON
app.use(express.json());

// Ajouter la route des articles à l'application
app.use("/api/articles", articlesRouter);

// Exposer l'application pour les tests
module.exports = app;

