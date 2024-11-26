const request = require("supertest");
const mockingoose = require("mockingoose");
const app = require("../server"); // Assurez-vous que le chemin vers votre fichier server.js est correct
const Article = require("../api/articles/articles.schema"); // Le modèle Article
const User = require("../api/users/users.model"); // Modèle User (si nécessaire pour tester les relations)

describe("Articles API", () => {
  let userId;
  let articleId;

  beforeAll(() => {
    userId = "60d21b4667d0d8992e610c85"; // ID d'exemple pour un utilisateur
  });

  afterEach(() => {
    mockingoose.resetAll(); // Réinitialiser les mocks après chaque test
  });

  // Test pour la création d'un article
  it("should create a new article", async () => {
    const mockArticle = {
      title: "New Article",
      content: "This is the content of the new article",
      user: userId,
    };

    // Mocker la création d'un article avec mockingoose
    mockingoose(Article).toReturn(mockArticle, "save");

    const response = await request(app)
      .post("/api/articles")
      .set("x-access-token", "valid-jwt-token") // Remplacez avec un JWT valide
      .send(mockArticle);

    expect(response.status).toBe(201); // Vérifie que le code de réponse est 201 (Created)
    expect(response.body.title).toBe(mockArticle.title);
    expect(response.body.content).toBe(mockArticle.content);
  });

  // Test pour la mise à jour d'un article
  it("should update an article", async () => {
    const mockUpdatedArticle = {
      title: "Updated Article",
      content: "This is the updated content",
    };

    // Mocker la réponse de la mise à jour de l'article
    mockingoose(Article).toReturn(mockUpdatedArticle, "findOneAndUpdate");

    const response = await request(app)
      .put(`/api/articles/${articleId}`)
      .set("x-access-token", "valid-jwt-token") // Remplacez avec un JWT valide
      .send(mockUpdatedArticle);

    expect(response.status).toBe(200); // Vérifie que le code de réponse est 200 (OK)
    expect(response.body.title).toBe(mockUpdatedArticle.title);
    expect(response.body.content).toBe(mockUpdatedArticle.content);
  });

  // Test pour la suppression d'un article
  it("should delete an article", async () => {
    // Mocker la réponse de suppression de l'article
    mockingoose(Article).toReturn(null, "findOneAndDelete");

    const response = await request(app)
      .delete(`/api/articles/${articleId}`)
      .set("x-access-token", "valid-jwt-token") // Remplacez avec un JWT valide
      .send();

    expect(response.status).toBe(204); // Vérifie que le code de réponse est 204 (No Content)
  });
});
