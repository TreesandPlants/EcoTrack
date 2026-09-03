const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

require("./config/db");

const userRoutes = require("./routes/userRoutes");

const app = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header
      // such as server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS policy: Origin not allowed")
      );
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/calculations",
  require("./routes/calculationRoutes")
);

app.use(
  "/api/google",
  require("./routes/googleAuthRoutes")
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/achievements",
  require("./routes/achievementRoutes")
);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

app.get("/", (req, res) => {
  res.json({
    message: "EcoTrack Backend Running",
    status: "ok",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `EcoTrack backend running on port ${PORT}`
  );
});