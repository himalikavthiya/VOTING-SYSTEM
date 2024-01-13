import { Vote } from "../models/vote.model.js";
import { Auth } from "../models/auth.model.js";
import { connectDB, disconnectDB } from "../db/dbconnection.js";
import { logger } from "../middlewares/logger.js";

/** Createa Vote controller */
export const voteCreate = async (req, res) => {
  try {
    await connectDB();

    const userAuth = await Auth.findOne({ Name });
    if (!userAuth) {
      logger.error({
        StatusCode: 4,
        Message: `User authentication information not found..!`,
      });
      return res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `User authentication information not found..!`,
      });
    }

    const { Role } = userAuth;

    let voteQuery = await Vote.create(req.body)
      .populate("Election")
      .populate("Party");

    if (Role === "Name") {
      voteQuery = await voteQuery.populate("Auth");
    }

    const result = await voteQuery.exec();
    if (!result && result === 0) {
      logger.error({
        StatusCode: 4,
        Message: `Error in creating the Vote list..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in creating the Vote list..!`,
      });
    }

    logger.info({
      StatusCode: 5,
      Message: `Vote Created Successfully..!`,
    });

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Vote Created Successfully..!`,
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

/** Get vote list controller */
export const voteList = async (req, res) => {
  try {
    await connectDB();

    const voteList = await Vote.find()
      .populate({ path: "Auth", select: ["Name CardNumber -_Id"] })
      .populate("Party")
      .populate("Election");
    if (!voteList || voteList.length === 0) {
      logger.error({
        StatusCode: 4,
        Message: `Vote information not found..!`,
      });
      return res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Vote information not found..!`,
      });
    }

    logger.info({
      StatusCode: 5,
      Message: `Votes retrieved successfully..!`,
    });

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Votes retrieved successfully..!`,
      Data: voteList,
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

/** Delete vote Controller */
export const voteDel = async (req, res) => {
  try {
    await connectDB();

    const user = await Auth.findById(req.params._Id);
    if (!user) {
      logger.error({
        StatusCode: 4,
        Message: `User authentication information not found..!`,
      });
      return res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `User authentication information not found..!`,
      });
    }

    const userVote = await Vote.find({ Name: user._id });
    if (!userVote) {
      logger.error({
        StatusCode: 4,
        Message: `No votes found for the user..!`,
      });
      return res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `No votes found for the user..!`,
      });
    }

    const result = await Vote.findByIdAndDelete({ Name: user._id });
    if (!result) {
      logger.error({
        StatusCode: 4,
        Message: `Error deleting votes: ${error.message}`,
      });
      return res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error deleting votes: ${error.message}`,
      });
    }

    logger.info({
      StatusCode: 5,
      Message: `Votes for user ${userName} deleted..!`,
    });

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Votes for user ${userName} deleted..!`,
      Data: voteList,
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

/** Count Vote controller */
export const voteCount = async (req, res) => {
  try {
    await connectDB();

    const partyCount = {};
    const voteList = await Vote.find()
      .populate({ path: "Auth", select: "Name CardNumber -_Id" })
      .populate("Party")
      .populate("Election");
    if (!voteList) {
      logger.error({
        StatusCode: 4,
        Message: `Vote information not found..!`,
      });
      return res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Vote information not found..!`,
      });
    }

    // Count votes for each party dynamically
    voteList.forEach((record) => {
      if (record.party && record.party.p_name) {
        const partyName = record.party.p_name;

        // Initialize count for the party if not already present
        partyCount[partyName] = (partyCount[partyName] || 0) + 1;
      }
    });

    logger.info({
      StatusCode: 5,
      Message: `All Vote SuccessFully Display Get..!`,
    });

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `All Vote SuccessFully Display Get..!`,
      total: partyCount,
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
