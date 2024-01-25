import mongoose from "mongoose";

// party list model schema defiend
const partyListSchema = new mongoose.Schema(
  {
    Party: {
      type: mongoose.Types.ObjectId,
      ref: "Party",
    },
    Election: {
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

export const Partylist = mongoose.model("Partylist", partyListSchema);
