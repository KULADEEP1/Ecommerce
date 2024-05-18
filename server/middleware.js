// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   try {
//     let token = req.header("x-token");
//     if (!token) {
//       return res.status(400).send("Token not found");
//     }
//     let decode = jwt.verify(token, "jwtSecretkey");
//     req.user = decode.user;
//     next();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("Invalid token");
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // console.log("hello",req)
  try {
    let token =
      req.headers.authorization;
    if (!token) {
      return res.status(400).send("Token not found");
    }
    let decode = jwt.verify(token, "jwtSecretkey");
    req.user = decode.user;
    req.token=token;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Invalid token");
  }
};

