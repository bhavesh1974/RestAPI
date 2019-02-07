const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  server: {
    port: process.env.PORT || 8080
  },

  email: {
    action: process.env.emailAction || false,
    key: process.env.emailKey,
    id: process.env.emailId,
    password: process.env.emailPassword
  },

  mysql: {
    host: process.env.DB_host || "localhost",
    user: process.env.DB_user || "root",
    password: process.env.DB_password || "admin",
    database: process.env.DB_database || "mydb"
  },

  mongo: {
    host: process.env.DB_host || "localhost",
    database: process.env.DB_database || "mydb"
  },

  JWT: {
    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || "speakSuperJWTSecret",
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || "7d"
  },

  videoIndexer: {
    location: process.env.videoIndexerLocation,
    accountId: process.env.videoIndexerAccountId,
    apiKey: process.env.videoIndexerApiKey,
    apiUrl: process.env.videoIndexerApiURL
  },

  applicationDatabase: "MONGO"
};
