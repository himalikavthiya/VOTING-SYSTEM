import { Vote } from "../models/vote.model.js";
import { Auth } from "../models/auth.model.js";
import { connectDB, disconnectDB } from "../db/dbconnection.js";
import { logger } from "../middlewares/logger.js";

/** Createa Vote controller */
export const voteCreate = async (req, res) => {
  try {
    const Auths = await Auth.find();
    if (!Auths) {
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
    console.log(Auths, "===== user ====");
    const { Role } = Auths;

    let voteQuery = new Vote(req.body);
    if (Role == "user") {
      voteQuery = await voteQuery.populate("Auth").populate("Party");
      if (!voteQuery && voteQuery === 0) {
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

      const result = await voteQuery.save();
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
    }

    // const result = await voteQuery.save();
    // if (!result && result === 0) {
    //   logger.error({
    //     StatusCode: 4,
    //     Message: `Error in creating the Vote list..!`,
    //   });
    //   res.status(400).json({
    //     StatusCode: 4,
    //     Success: false,
    //     Message: `Error in creating the Vote list..!`,
    //   });
    // }

    logger.info({
      StatusCode: 5,
      Message: `Vote Created Successfully..!`,
    });

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Vote Created Successfully..!`,
      Data: voteQuery,
    });
  } catch (error) {
    await disconnectDB();

    logger.error({
      StatusCode: 1,
      Message: error.message,
    });
    res.status(400).json({
      StatusCode: 1,
      Error: error.message,
    });
  }
};

/** Get vote list controller */
export const voteList = async (req, res) => {
  try {
    const voteList = await Vote.find()
      .populate({ path: "Auth", select: "-Password -AccessToken" })
      .populate({ path: "Party" });
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
      // total: totalCount,
    });
  } catch (error) {
    await disconnectDB();

    logger.error({
      StatusCode: 1,
      Message: error.message,
    });
    res.status(400).json({
      StatusCode: 1,
      Error: error.message,
    });
  }
};

/** Delete vote Controller */
export const voteDel = async (req, res) => {
  try {
    const votes = await Vote.findById(req.params._Id);
    if (!votes) {
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

    const result = await Vote.findByIdAndDelete(req.params._Id);
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
      Message: `Votes for user vote deleted..!`,
    });

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Votes for user vote deleted..!`,
      Data: result,
    });
  } catch (error) {
    await disconnectDB();

    logger.error({
      StatusCode: 1,
      Message: error.message,
    });
    res.status(400).json({
      StatusCode: 1,
      Error: error.message,
    });
  }
};
