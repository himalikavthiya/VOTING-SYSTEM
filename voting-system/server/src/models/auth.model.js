import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    Profile: {
      type: String,
      trim: true,
      // require: [true, `Your profile much be required..!`],
    },
    Password: {
      type: String,
      // default: "User@123",
      // required: [true, `Password much be required..!`],
    },
    CardNumber: {
      type: String,
      trim: true,
      // match: /^[a-zA-Z0-9]{10}$/,
    },
    Name: {
      type: String,
      trim: true,
      // require: [true, `Your name much be required..!`],
    },
    Sex: {
      type: String,
      trim: true,
      enum: ["male", "other", "female"],
      // required: [true, `Gender select much be required..!`],
    },
    DOB: {
      type: Date,
      // require: [true, `Date Of Birth much be required..!`],
    },
    Address: {
      type: String,
      trim: true,
    },
    Phone: {
      type: String,
      trim: true,
      match: /^[0-9]{10}$/,
      // unique: true,
      // required: [true, `Phone number much be required..!`],
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      // unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      // required: [true, `Email address much be required..!`],
    },
    Role: {
      type: String,
      trim: true,
      default: "user",
      enum: ["admin", "user"],
    },
    AccessToken: {
      type: String,
      trim: true,
      default: "",
    },
    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Auth = mongoose.model("Auth", authSchema);
