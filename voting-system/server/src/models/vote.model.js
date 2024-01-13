import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    Name: {
      type: mongoose.Types.ObjectId,
      ref: "Auth",
    },
    party: {
      type: mongoose.Types.ObjectId,
      ref: "Party",
    },
    election: {
      type: mongoose.Types.ObjectId,
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
