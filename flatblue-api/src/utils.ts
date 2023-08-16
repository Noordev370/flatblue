import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { pool } from "./database.js";

export async function validatePassword(
  role: string,
  password: string
): Promise<boolean> {
  // not a middleware. call it in the request handler
  const result = await pool.query(
    "SELECT (role, password) FROM special_users WHERE role = $1 AND password = $2",
    [role, password]
  );
  if (result.rowCount) {
    return true;
  }
  return false;
}

export function validateAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader === undefined) {
      throw new Error("no auth header");
    }
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    res.status(401).send("invalide token");
  }
}

// return true if one of the arguments in truthy value
export function isEmpty(...args: any[]) {
  args.forEach((element) => {
    if (!element) return true;
  });
  return false;
}
