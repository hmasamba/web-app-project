import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import products from "./routes/products.js";
import { connectToDB } from "./utils/database.js";
import users from "./routes/users.js";

// For authentication handling 
import { requireAuth } from "./utils/utils.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import testlogin from "./routes/testlogin.js";
dotenv.config();

// Middleware
const app = express();
app.use(express.json());
//app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser()); // For authentication

// Connect to MongoDB Atlas
connectToDB(process.env.MONGODB_CONNECTION_STRING, process.env.BUCKET_NAME);

// Enable CORS for React front-end (running on port 3000)
app.use(cors({
  origin: 'http://localhost:3000',  // URL of your React app
  methods: ['GET', 'POST'],
  credentials: true,  // Allow cookies or authorization headers
}));

// Routes
//app.use("/api/products",requireAuth, products);


app.use("/api/products", products);

// For authentication 
app.use("/testlogin", requireAuth, testlogin); //Only used during the testing of authentication module
// console.log("Started for testlogin and /api/auth");
// app.use("/", testlogin); //Only used during the testing of authentication module
app.use("/api/auth/", authRoute)

// For Users Operations
//app.use("/api/users", requireAuth, users);
app.use("/api/users", users);
// app.use("/api/users", users);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});