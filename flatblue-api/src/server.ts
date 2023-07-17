import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { admin_routes } from "./routes/admin-routes.js";
import { user_routes } from "./routes/user-routes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.105:5173"],
    credentials: true,
  })
);

app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use("/admin", admin_routes);
app.use("/user", user_routes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
