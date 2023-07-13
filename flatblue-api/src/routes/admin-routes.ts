import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import dbWorkflow from "../db-workflow/admin-workflow.js";
import { validateAuthToken, validatePassword } from "../utils.js";

export const admin_routes = express.Router();

admin_routes.post(
  "/login",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const { role, password } = req.body;
    if (!(role && password)) {
      res.status(401).send("empty role or password");
      return;
    }
    if (!(await validatePassword(role, password))) {
      res.status(401).send("role and password mismatch");
      return;
    }

    const token = jwt.sign({ role: role }, process.env.JWT_SECRET as string, {
      expiresIn: "600s",
    });
    res.send(token);
  }
);
admin_routes.get("/posts", validateAuthToken, async (req, res) => {
  try {
    const result = await dbWorkflow.getUnreviewedPosts();
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("error");
  }
});

admin_routes.post(
  "/posts/transaction",
  express.json(),
  validateAuthToken,
  async (req, res) => {
    const idList = req.body;
    const result = await dbWorkflow.makeTransaction(idList);
    if (result === "error") res.status(500).send("error");
    res.send("ok");
  }
);
