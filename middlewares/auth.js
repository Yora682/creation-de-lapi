const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../users/users.model"); // Importation du modèle User

module.exports = async (req, res, next) => {
  try {
    // Récupérer le token depuis les headers
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "No token provided";
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, config.secretJwtToken);

    // Récupérer l'utilisateur complet dans la base de données
    const user = await User.findById(decoded.userId).select("-password"); // Exclut le mot de passe
    if (!user) {
      throw "User not found";
    }

    // Ajouter les informations utilisateur à req
    req.user = user;
    next();
  } catch (message) {
    // Gérer les erreurs d'authentification
    next(new UnauthorizedError(message));
  }
};

