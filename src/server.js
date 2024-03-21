require("express-async-errors")
require("dotenv/config")

const express = require("express");
const AppError = require("./utils/AppError")
const route = require("./routes");

const uploadConfig = require("./configs/upload");
const app = express();
const cors = require("cors");
app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });

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
