require("dotenv").config();
require("express-async-errors");

const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

const connectDatabase = require("./database/connect_database");
const userRoutes = require("./routes/user_routes");
const movieRoutes = require("./routes/movie_routes");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(bodyParser.json());
// Database connection
connectDatabase(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected....");
    startServer();
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// Routes
app.use("/user", userRoutes);
app.use(
  "/movies",
  // , authenticateUser
  movieRoutes
);

// Error handling middleware (should be the last middleware)
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start server
function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port} .....`);
  });
}
