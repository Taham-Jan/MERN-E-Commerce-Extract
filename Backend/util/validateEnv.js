// const cleanEnv = require("envalid");
const envalid = require("envalid");
const { port, str } = require("envalid/dist/validators");

module.exports = envalid.cleanEnv(process.env, {
  MONGO_URI: str(),
  PORT: port(),
  JWT_SECRET: str(),
  JWT_EXPIRE: str(),
  CLOUDINARY_NAME: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_API_SECRET: str(),
});
