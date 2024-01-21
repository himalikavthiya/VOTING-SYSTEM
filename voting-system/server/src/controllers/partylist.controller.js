import { Partylist } from "../models/partyList.model.js";
import { connectDB, disconnectDB } from "../db/dbconnection.js";
import { logger } from "../middlewares/logger.js";

/** Create Partylist Controller */
export const partylistCreate = async (req, res) => {
  try {
    await connectDB();

    let partylist = new Partylist(req.body);
    partylist.Party = await partylist.populate("Party");
    partylist.Election = await partylist.populate("Election");
    
    if (!partylist.Party || !partylist.Election) {
      logger.error({
        StatusCode: 4,
        Message: `Error in finding Party or Election for PartyList..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in finding Party or Election for PartyList..!`,
      });
    }

    const result = await Partylist.create(req.body);
    if (!result && result === 0) {
      logger.error({
        StatusCode: 4,
        Message: `Error in creating the Partylist`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in creating the Partylist`,
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

/** Get Partylist Controller */
export const partylist = async (req, res) => {
  try {
    await connectDB();

    const Lists = await Partylist.find().populate("Party").populate("Election");
    if (!Lists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in find Partylist..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in find Partylist..!`,
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

/** party Delete by ID */
export const partylistDel = async (req, res) => {
  try {
    await connectDB();

    /** Find party By ID */
    const partyExists = await Partylist.findById(req.params._Id)
      .populate("Party")
      .populate("Election");
    if (!partyExists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Find partylist by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Find partylist by ID..!`,
      });
    }

    const partyDelete = await Partylist.findByIdAndDelete(req.params._Id);
    if (!partyDelete) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Delete partylist by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Delete partylist by ID..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Delete partylist data Successfully..! Deleted Data here...`,
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
