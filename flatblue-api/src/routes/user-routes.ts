import express from "express";
import dbWorkflow from "../db-workflow/user-workflow.js";
import { isEmpty } from "../utils.js";

export const user_routes = express.Router();

user_routes.post(
  "/posts/add",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const { gender, level, content } = req.body;
    if (isEmpty(gender, level, content)) res.status(400).send("error");
    try {
      dbWorkflow.addPost(gender, level, content);
      res.send("ok");
    } catch (error) {
      res.status(500).send("error");
    }
  }
);

user_routes.get("/posts/id_list/:offset", async (req, res) => {
  try {
    const result = await dbWorkflow.paginatePostsIDs(req.params.offset);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("error");
  }
});

user_routes.get("/posts/:id", async (req, res) => {
  try {
    const result = await dbWorkflow.getPostByID(req.params.id);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("error");
  }
});

user_routes.post(
  "/comments/add",
  express.urlencoded({ extended: true }),
  async (req, res) => {
    const { post_id, owner_name, comment } = req.body;
    if (isEmpty(post_id, owner_name, comment)) res.status(400).send("error");
    try {
      await dbWorkflow.addComment(post_id, owner_name, comment);
      res.send("ok");
    } catch (error) {
      res.status(500).send("error");
    }
  }
);

user_routes.get("/comments/count/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const result = await dbWorkflow.getCommentsCountByPostID(post_id);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("error");
  }
});

user_routes.get("/comments/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  try {
    const result = await dbWorkflow.getCommentsByPostID(post_id);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("error");
  }
});
