import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import { startQueueMonitor } from "./services/queueMonitor.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Start queue monitoring service
startQueueMonitor()

// middlewares
const allowedOrigins = [
  "http://localhost:5173", // for local development
  "https://queue-management-admin.vercel.app",
  "https://queue-management-frontend-five.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Handle CORS preflight
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working - Queue Monitor Active")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))