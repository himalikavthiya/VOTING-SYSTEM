import mongoose from "mongoose";

const electionSchema = new mongoose.Schema(
  {
    ElectionName: {
      type: String,
      trim: true,
    },
    RegisterDate: {
      type: Date,
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

export const Election = mongoose.model("Election", electionSchema);
