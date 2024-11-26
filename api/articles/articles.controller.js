const ArticlesService = require("./articles.service");

class ArticlesController {
  async create(req, res, next) {
    try {
      const { title, content, status } = req.body;
      const userId = req.user._id; // Récupération de l'utilisateur connecté depuis le middleware
      const article = await ArticlesService.createArticle({
        title,
        content,
        status,
        user: userId,
      });
      req.io.emit("article:create", article); // Temps réel
      res.status(201).json(article);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const articleId = req.params.id;
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
      const updatedArticle = await ArticlesService.updateArticle(articleId, req.body);
      req.io.emit("article:update", updatedArticle); // Temps réel
      res.json(updatedArticle);
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const articleId = req.params.id;
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
      }
      await ArticlesService.deleteArticle(articleId);
      req.io.emit("article:delete", { id: articleId }); // Temps réel
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ArticlesController();
