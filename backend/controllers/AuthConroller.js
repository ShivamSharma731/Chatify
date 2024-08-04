import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { compare } from "bcrypt";

// THIS CONTAINS THE LOGICS OF THE ROUTES OR APIS BEING CALLED

const tokenValid = 3 * 24 * 60 * 60 * 1000; // for 3 days

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: tokenValid,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password required...");
    }
    // now create a user in mongo using this email and password
    const user = await User.create({ email, password });
    // we will send the JWT tokens to the user(frontend) that can be used when user next time login , we will send the token as a cookie
    res.cookie("jwt", createToken(email, user.id), {
      tokenValid,
      secure: true,
      sameSite: "None",
    });
    // send back response status and user data
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error...");
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password required...");
    }
    // now create a user in mongo using this email and password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const passcheck = await compare(password, user.password);
    if (!passcheck) {
      return res.status(400).send("Password incorrect !!");
    }

    // we will send the JWT tokens to the user(frontend) that can be used when user next time login , we will send the token as a cookie
    res.cookie("jwt", createToken(email, user.id), {
      tokenValid,
      secure: true,
      sameSite: "None",
    });
    // send back response status and user data
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        image: user.image,
        profileSetup: user.profileSetup,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error...");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    // console.log(req.userId);   // its the user id decrypted from the token from auth middleware

    const userData = await User.findById(req.userId);

    if (!userData) {
      res.status(404).send("User with given id not found");
    }
    // send back response status and user data
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      profileSetup: userData.profileSetup,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error...");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    const { firstName, lastName, color } = req.body;
    if (!firstName || !lastName) {
      res.status(404).send("Incomplete profile info...");
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstname: firstName,
        lastname: lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    // send back response status and user data
    return res.status(200).json({
      id: userData.id,
      email: userData.email,
      firstname: userData.firstname,
      lastname: userData.lastname,
      image: userData.image,
      color: userData.color,
      profileSetup: userData.profileSetup,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server error...");
  }
};
