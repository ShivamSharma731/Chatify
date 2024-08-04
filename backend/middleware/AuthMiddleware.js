// here we will be verifying the token we get from the server
// its a middleware

// ONLY ROLE OF TOKEN IS TO GIVE THE DECODED TOKEN ID THAT IS THE USER ID WE STORED ON CLIENT SIDE WHEN SIGNING UP THE USER , 
// SO WE JUST CHECK THIS TOKEN USER ID IN OUR DATABSE IF IT IS PRESENT THEN WE ALLOW TO MOVE TO THE NEXT MIDDLEWARE 

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  // if we have no token
  if (!token) {
    return res.status(401).send("You are not authenticated...");
  }
  // if we have any token then we will verify
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {   // payload data contains the decoded id from the token that we will store into userid
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.userId = payload.userId;
    next();
  });
};
