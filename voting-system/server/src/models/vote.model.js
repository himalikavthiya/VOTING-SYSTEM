import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    Auth: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    Election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
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
