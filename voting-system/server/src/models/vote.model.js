import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    Auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    Party: {
      type: mongoose.Types.ObjectId,
      ref: "Party",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Vote = mongoose.model("Vote", voteSchema);
