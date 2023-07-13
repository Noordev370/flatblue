import { pool } from "../database.js";

async function addPost(gender: string, level: string, content: string) {
  await pool.query(
    "INSERT INTO unreviewed_posts(gender,level,date,content) VALUES($1, $2, current_date, $3)",
    [gender, level, content]
  );
}

async function getPostByID(postID: string) {
  const result = await pool.query(
    "SELECT gender,level,date::TEXT,content FROM reviewed_posts WHERE id = $1",
    [postID]
  );
  return result;
}

async function paginatePostsIDs(offset: string) {
  const result = await pool.query(
    "SELECT (id) FROM reviewed_posts LIMIT 5 OFFSET $1",
    [offset]
  );
  return result;
}

async function addComment(postID: string, owner_name: string, comment: string) {
  await pool.query(
    "INSERT INTO comments(post_id, owner_name, content) VALUES($1, $2, $3)",
    [postID, owner_name, comment]
  );
}

async function getCommentsByPostID(postID: string) {
  const result = await pool.query(
    "SELECT owner_name, content FROM comments WHERE post_id = $1",
    [postID]
  );
  return result;
}

async function getCommentsCountByPostID(postID: string) {
  const result = await pool.query(
    "SELECT COUNT(id)::int FROM comments WHERE post_id = $1",
    [postID]
  );
  return result;
}

export default {
  addPost,
  paginatePostsIDs,
  getPostByID,
  addComment,
  getCommentsByPostID,
  getCommentsCountByPostID,
};
