const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer
    const isAuthenticated = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(isAuthenticated);
    if (isAuthenticated) {
        req.body.userId = isAuthenticated.userId; // {userId:a;skdfjasdjkf;}
      next();
    } else {
      res.status(404).json({ message: "Not authenticated" });
    }
  } catch (error) {
    res.status(404).send({ message: "Not authenticated." });
  }
};

module.exports = { authentication };
