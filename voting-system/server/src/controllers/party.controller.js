import { Party } from "../models/party.model.js";
import { connectDB, disconnectDB } from "../db/dbconnection.js";
import { logger } from "../middlewares/logger.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/** Create Party Controller */
export const partyCreate = async (req, res) => {
  try {
    await connectDB();

    const party = new Party(req.body);
    if (party.shortCode && party.pName) {
      party.shortCode = party.shortCode.toUpperCase();
      party.pName = party.pName.toUpperCase();
    }

    const p_logoLocalPath = await req.files?.Profile[0]?.path;
    if (p_logoLocalPath) {
      const partylogo = await uploadOnCloudinary(p_logoLocalPath);
      party.Profile = partylogo.secure_url;
    }

    const result = await party.save();
    if (!result && result === 0) {
      logger.error({
        StatusCode: 4,
        Message: `Error in creating the Party`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in creating the Party`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Party Created Successfully..!`,
      Data: result,
    });
  } catch (error) {
    logger.error({
      StatusCode: 1,
      Message: error.message,
    });
    res.status(400).json({
      StatusCode: 1,
      Error: error.message,
    });
  } finally {
    await disconnectDB();
  }
};

/** Get Party Controller */
export const partyList = async (req, res) => {
  try {
    await connectDB();

    const Lists = await Party.find();
    if (!Lists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in find Party list..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in find Party list..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Party Created Successfully..!`,
      Data: Lists,
    });
  } catch (error) {
    logger.error({
      StatusCode: 1,
      Message: error.message,
    });
    res.status(400).json({
      StatusCode: 1,
      Error: error.message,
    });
  } finally {
    await disconnectDB();
  }
};

/** Party details update by ID */
export const partyUpdate = async (req, res) => {
  try {
    await connectDB();

    /** Find Party By ID */
    const partyExists = await Party.findById(req.params._Id);
    if (!partyExists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Find Party by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Find Party by ID..!`,
      });
    }

    const partyUpdate = await Party.findByIdAndUpdate(req.params._Id, {
      $set: req.body,
    });
    if (!partyUpdate) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Update Party by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Update Party by ID..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Update Party data Successfully..!`,
      Data: partyUpdate,
    });
  } catch (error) {
    logger.error({
      StatusCode: 1,
      Message: error.message,
    });
    res.status(400).json({
      StatusCode: 1,
      Error: error.message,
    });
  } finally {
    await disconnectDB();
  }
};

/** party Delete by ID */
export const partyDel = async (req, res) => {
  try {
    await connectDB();

    /** Find party By ID */
    const partyExists = await Party.findById(req.params._Id).select(
      "-Password -AccessToken"
    );
    if (!partyExists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Find party by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Find party by ID..!`,
      });
    }

    const partyDelete = await Party.findByIdAndDelete(req.params._Id);
    if (!partyDelete) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Delete party by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Delete party by ID..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Delete party data Successfully..! Deleted Data here...`,
      Data: partyDelete,
    });
  } catch (error) {
    logger.error({
      StatusCode: 1,
      Message: error.message,
    });
    res.status(400).json({
      StatusCode: 1,
      Error: error.message,
    });
  } finally {
    await disconnectDB();
  }
};
