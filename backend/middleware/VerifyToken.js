import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserModel } from "../models/UserModel.js";

const { verify } = jwt;
config();

export const VerifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      let token = req.cookies?.token;

      if (!token && req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
        return res.status(401).json({ message: "Please login first" });
      }

      // Verify Token
      let decodedToken = verify(token, process.env.SECRET_KEY);

      const freshUser = await UserModel.findById(decodedToken.id).select(
        "-password",
      );

      if (!freshUser) {
        return res.status(404).json({ message: "User no longer exists" });
      }

      if (allowedRoles.length > 0 && !allowedRoles.includes(freshUser.role)) {
        return res.status(403).json({ message: "You are not authorized" });
      }

      req.user = freshUser;

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err.message);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
