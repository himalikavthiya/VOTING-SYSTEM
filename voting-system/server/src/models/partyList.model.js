import mongoose from "mongoose";

// party list model schema defiend
const partyListSchema = new mongoose.Schema(
  {
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

export const Partylist = mongoose.model("Partylist", partyListSchema);
