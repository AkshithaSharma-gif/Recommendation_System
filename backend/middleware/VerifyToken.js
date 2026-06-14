// import jwt from "jsonwebtoken";
// import  User  from "../models/UserModel.js";


// export const VerifyToken = (...allowedRoles) => {
//   return async (req, res, next) => {
//     try {
//       // let token = req.cookies?.token;

//       // // fallback to Authorization header
//       // if (!token && req.headers.authorization) {
//       //   token = req.headers.authorization.split(" ")[1];
//       // }

//       let token;

// if (req.headers.authorization) {
//   token = req.headers.authorization.split(" ")[1];
// }

//       if (!token) {
//         return res.status(401).json({
//           message: "Please login first",
//         });
//       }

//       // verify token
//       const decodedToken = jwt.verify(
//         token,
//         process.env.SECRET_KEY
//       );

//       // get fresh user from DB
//       const freshUser = await UserModel.findById(
//         decodedToken.id
//       ).select("-password");

//       if (!freshUser) {
//         return res.status(404).json({
//           message: "User no longer exists",
//         });
//       }

//       // role check (admin protection)
//       if (
//         allowedRoles.length > 0 &&
//         !allowedRoles.includes(freshUser.role)
//       ) {
//         return res.status(403).json({
//           message: "You are not authorized",
//         });
//       }

//       req.user = freshUser;

//       next();
//     } catch (err) {
//       console.error("Auth Middleware Error:", err.message);

//       return res.status(401).json({
//         message: "Invalid or expired token",
//       });
//     }
//   };
// };



import jwt from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/UserModel.js";

config();

export const VerifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};