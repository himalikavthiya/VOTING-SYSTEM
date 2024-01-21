import { Election } from "../models/election.model.js";
import { connectDB, disconnectDB } from "../db/dbconnection.js";
import { logger } from "../middlewares/logger.js";

/** Create Election Controller */
export const electionCreate = async (req, res) => {
  try {
    await connectDB();

    const { ElectionName } = req.body;
    const findName = await Election.findOne({ ElectionName }).populate("Party");
    if (!findName && findName === 0) {
      logger.error({
        StatusCode: 4,
        Message: `Error in find Election by name..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in find Election by name..!`,
      });
    }

    const result = await Election.create(req.body);
    if (!result && result === 0) {
      logger.error({
        StatusCode: 4,
        Message: `Error in creating the Election`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in creating the Election`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Election Created Successfully..!`,
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

/** Get Election Controller */
export const electionList = async (req, res) => {
  try {
    await connectDB();

    const Lists = await Election.find().populate("Party");
    if (!Lists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in find election list..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in find election list..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Election Created Successfully..!`,
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

/** Election details update by ID */
export const electionUpdate = async (req, res) => {
  try {
    await connectDB();

    /** Find election By ID */
    const electionExists = await Election.findById(req.params._Id).populate(
      "Party"
    );
    if (!electionExists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Find election by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Find election by ID..!`,
      });
    }

    const electionUpdate = await Election.findByIdAndUpdate(req.params._Id, {
      $set: req.body,
    });
    if (!electionUpdate) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Update election by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Update election by ID..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Update election data Successfully..!`,
      Data: electionUpdate,
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

/** election Delete by ID */
export const electionDel = async (req, res) => {
  try {
    await connectDB();

    /** Find election By ID */
    const electionExists = await Election.findById(req.params._Id);
    if (!electionExists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Find election by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Find election by ID..!`,
      });
    }

    const electionDelete = await Election.findByIdAndDelete(req.params._Id);
    if (!electionDelete) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Delete election by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Delete election by ID..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Delete election data Successfully..! Deleted Data here...`,
      Data: electionDelete,
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
