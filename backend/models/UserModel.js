import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required..."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required..."],
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// this is the middleware that will be executed before adding data to the database and this will hash the password that we have while putting in mongo
userSchema.pre("save", async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
