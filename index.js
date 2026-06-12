require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const { dbConnect } = require("./config/dbConnect");
const adminRoutes = require("./routes/adminRoutes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes/categoryRoutes");
const serviceRoutes = require("./routes/serviceRoutes/serviceRoutes");
const pricingRoutes = require("./routes/pricingRoutes/pricingRoutes");
const termRoutes = require("./routes/termRoutes/termRoutes");
const proposalTemplateRoutes = require("./routes/proposalTemplateRoutes/proposalTemplateRoutes");
const settingsRoutes = require("./routes/settingsRoutes/settingRoutes");
const proposalRoutes = require("./routes/proposalRoutes/proposalRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes/dashboardRoutes");

// const contactRoutes = require("./routes/clientRoutes/contactRoutes");

const app = express();

// Fallback port
const port = process.env.PORT || 10500;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

//server static files
app.use(express.static(path.join(__dirname, "public")));

/* ===============================
   ALLOWED ORIGINS
================================ */

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
  : [];

/* ===============================
   MIDDLEWARE
================================ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, postman etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

/* ===============================
   DATABASE
================================ */

dbConnect();

/* ===============================
   ROUTES
================================ */

app.use("/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/term", termRoutes);
app.use("/api/proposal-template", proposalTemplateRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/proposal", proposalRoutes);
app.use("/api/dashboard", dashboardRoutes);
// app.use("/contact", contactRoutes);
// app.use("/scholar", scholarRoutes);

/* ===============================
   TEST ROUTE
================================ */

app.get("/", (req, res) => {
  res.status(200).send("Hello from SLCMS server");
});

/* ===============================
   SERVER START
================================ */

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
