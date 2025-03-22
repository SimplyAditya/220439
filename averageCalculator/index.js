import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', router);

app.all("*", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Average Calculator API",
        status: "success",
    });
    }
);



app.listen(PORT, (err) => {
  if (err) {
    console.error("Error in starting the server:", err.message);
    return;
  }
  console.log(`Server is running on port ${PORT}`);
});
