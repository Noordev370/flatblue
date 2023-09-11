import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { admin_routes } from "./routes/admin-routes.js";
import { user_routes } from "./routes/user-routes.js";

const app = express();
app.use(
  cors({
    origin: "*",
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
