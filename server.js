// // const express =require("express");
// // const app =express();
// // const router = require("./router/auth-router");
// // const connectDb=require("./utils/db");

// // app.use(express.json());

// // app.use("/api/auth",router);

// // const PORT=5001;

// // connectDb().then(()=>{

// //     app.listen(PORT,()=>{
// //         console.log(`server is running on port:${PORT}`);
// //     });
// // });

// const express = require("express");
// const app = express();
// const router = require("./router/auth-router");
// const connectDb = require("./utils/db");

// app.use(express.json()); 
// app.use("/api/auth", router);

// const PORT = 5000;

// connectDb().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port: ${PORT}`);
//     });
// });






// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");


// const router = require("./router/auth-router");
// const connectDb = require("./utils/db");

// dotenv.config(); // Load environment variables



// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors()); // Handle CORS issues (optional)
// app.use(express.json()); // Parse JSON request body
// app.use("/api/auth", router);

// // Connect to MongoDB and start the server
// connectDb()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`🚀 Server is running on port: ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error("❌ MongoDB connection failed:", err);
//     });
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");

app.use(cors({
    origin: "http://localhost:5000",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

app.use("/api/auth", router);

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = 5000;

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

module.exports = router;