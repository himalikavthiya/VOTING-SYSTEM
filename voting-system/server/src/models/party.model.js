import mongoose from "mongoose";

// party model schema defiend
const partySchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      trim: true,
    },
    Profile: {
      type: String,
      trim: true,
    },
    shortCode: {
      type: String,
      trim: true,
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

export const Party = mongoose.model("Party", partySchema);
