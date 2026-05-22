import cors from "cors";

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((s) => s.trim())
  : [];

const corsOptions: cors.CorsOptions = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

if (allowedOrigins.includes("*") || allowedOrigins.length === 0) {
  corsOptions.origin = "*";
} else {
  corsOptions.origin = (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  };
  corsOptions.credentials = true;
}

export default cors(corsOptions);
