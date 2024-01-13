import mongoose from "mongoose";
import {
  configData
} from "../config/config.js";

// party model schema defiend
const partySchema = new mongoose.Schema({
  p_name: {
    type: String,
    trim: true,
  },
  p_logo: {
    type: String,
    trim: true,
  },
  short_code: {
    type: String,
    trim: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, data) {
      if (data && data.p_logo) {
        data.p_logo = `${configData.base_url}party-images/${data.p_logo}`;
      }
    },
  },
});

export const Party = mongoose.model("Party", partySchema);