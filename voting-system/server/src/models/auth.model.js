import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    Profile: {
      type: String,
      trim: true,
    },
    Password: {
      type: String,
      default: "User@123",
    },
    CardNumber: {
      type: String,
      trim: true,
      match: /^[a-zA-Z0-9]{10}$/,
    },
    Name: {
      type: String,
      trim: true,
    },
    Sex: {
      type: String,
      trim: true,
      enum: ["male", "other", "female"],
    },
    DOB: {
      type: Date,
    },
    Address: {
      type: String,
      trim: true,
    },
    Phone: {
      type: String,
      trim: true,
      match: /^[0-9]{10}$/,
      unique: true,
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
