import { pool } from "../database.js";

async function getUnreviewedPosts() {
  const result = await pool.query(
    "SELECT id, gender, level, date::text, content FROM unreviewed_posts"
  );
  return result;
}

async function makeTransaction(idList: any) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(
      `INSERT INTO reviewed_posts(gender, level, date, content) select gender, level, date ,content FROM unreviewed_posts WHERE unreviewed_posts.id = ANY($1)`,
      [idList]
    );
    await client.query("DELETE FROM unreviewed_posts");
    await client.query("COMMIT");
    return "ok";
  } catch (error) {
    await client.query("ROLLBACK");
    return "error";
  } finally {
    client.release();
  }
}

export default { getUnreviewedPosts, makeTransaction };
