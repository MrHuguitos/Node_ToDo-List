import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/dbconfig.js";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import TasksRoutes from "./src/routes/TasksRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

app.get('/ping', (req, res) => {
    res.status(200).send('API is running');
});

app.use("/tasks", TasksRoutes);
app.use("/auth", AuthRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});