import jwt from "jsonwebtoken";
// import { config } from "dotenv";
// config();

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ message: "Session expired, please sign in again." });
    }
  } else {
    res
      .status(403)
      .send({ message: "You are not authorized, please sign in." });
  }
};

export default auth;
