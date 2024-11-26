const Article = require("./articles.schema");

class ArticlesService {
  async createArticle(data) {
    return await Article.create(data);
  }

  async updateArticle(articleId, updateData) {
    return await Article.findByIdAndUpdate(articleId, updateData, { new: true });
  }

  async deleteArticle(articleId) {
    return await Article.findByIdAndDelete(articleId);
  }
}

module.exports = new ArticlesService();
