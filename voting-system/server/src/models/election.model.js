import mongoose from "mongoose";

const electionSchema = new mongoose.Schema(
  {
    ElectionName: {
      type: String,
      trim: true,
      // require: [true, `Election name must be requried..!`],
    },
    RegisterDate: {
      type: Date,
      // require: [true, `Register Date must be required..!`],
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
