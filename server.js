import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Student from "./models/student.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/test-db", async (req, res) => {
  try {
    const student = await Student.create({
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      course: "MERN Stack",
    });
    res.status(201).json({
      message: "Data inserted successfully!",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));