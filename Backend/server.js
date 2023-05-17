
const app = require("./app");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const env = require("./util/validateEnv");
const cloudinary = require('cloudinary');
const path = require('path')
app.use(express.static(path.join(__dirname, "../frontend/build")));

const port = env.PORT;

//Handling Uncaugt Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to uncaught Exception`);
    process.exit(1);
});
 
cloudinary.config({
    cloud_name:env.CLOUDINARY_NAME,
    api_key:env.CLOUDINARY_API_KEY,
    api_secret:env.CLOUDINARY_API_SECRET,
})
app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend", "build", "index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });
  
mongoose.connect(env.MONGO_URI)
    .then(() => {
        console.log("MONGO CONNECTED!");
      app.listen(port, () => {
            console.log("server running at port " + port);
        })
    });

//Unhandled Promise Rejection 'if we mess up db uri'
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    })
});