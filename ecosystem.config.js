module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      max_memory_restart: "200M", // Limite mémoire à 200 Mo
      env_production: {
        NODE_ENV: "production",
      },
      error_file: "/logs/err.log", // Fichier de log pour les erreurs
      out_file: "/logs/out.log", // Fichier de log pour la sortie standard (optionnel)
      log_date_format: "YYYY-MM-DD HH:mm Z", // Format de date dans les logs
    },
  ],
};
