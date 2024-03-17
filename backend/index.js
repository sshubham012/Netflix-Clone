require("dotenv").config();
require("express-async-errors");

const helmet = require("helmet");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());

const connect_database = require("./database/connect_database");
const authenticateUser = require("./middleware/user_auth_middleware");

// Routes
const userRoutes = require("./routes/user_routes");
// const movieRoutes = require("./routes/movie_routes");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(helmet());

app.use("/user", userRoutes);
// app.use("/movie", authenticateUser, movieRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const  startServer = async ()=>{
    try {
        await connect_database(process.env.MONGO_URI);
        console.log("Database running....")
        app.listen(port, () => {
            console.log(`Server started on ${port} .....`);
        });
    } catch (error) {
        console.log(error);
    }
} 

startServer();