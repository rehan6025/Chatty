const express = require("express");
const { chats } = require("./data/data");
const connectDb = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const colors = require("colors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
connectDb();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("App is listening");
});

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`.yellow.bold);
});
