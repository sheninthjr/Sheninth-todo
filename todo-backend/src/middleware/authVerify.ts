import jwt from 'jsonwebtoken';
export const secretkey = 'JrtOdO'; 
import { Request, Response, NextFunction } from "express";

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretkey, (err, payload) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (!payload) {
        return res.sendStatus(403);
      }
      if (typeof payload === "string") {
        return res.sendStatus(403);
      }
      
      req.headers["userId"] = payload.id;
      req.headers["email"] = payload.email;
      req.headers["username"] = payload.username;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

