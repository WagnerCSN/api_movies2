require("express-async-errors")
require("dotenv/config")

const express = require("express");
const AppError = require("./utils/AppError")
const route = require("./routes");

const uploadConfig = require("./configs/upload");
const app = express();
const cors = require("cors");
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
    Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.use(express.json());
app.use(cors());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(route)


app.use((error, request, response, next) => {
    if(error instanceof AppError) //erro gerado pelo criente
     {
         return response.status(error.statusCode).json({
             message: error.message,
             status: "error"
         })
     }

     console.error(error);

     return response.status(500).json({
        status: "error",
        message: "Internal server error"
     })
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
