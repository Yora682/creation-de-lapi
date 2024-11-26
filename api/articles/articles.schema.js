const { Schema, model } = require("mongoose");

const articleSchema = Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: {
      values: ["draft", "published"],
      message: "{VALUE} is not a valid status", // Message pour les valeurs invalides
    },
    required: true, // Rend le champ obligatoire
    default: "draft", // Valeur par défaut
  },
});

let Article;

module.exports = Article = model("Article", articleSchema);


/*async function test() {
  const articles = await Article.find().populate({
    path: "user",
    select: "-password",
    match: { name: /ben/i },
  });
  console.log(articles.filter((article) => article.user));
}

test();*/
