import { Auth } from "../models/auth.model.js";
import { connectDB, disconnectDB } from "../db/dbconnection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { configData } from "../config/config.js";
import { logger } from "../middlewares/logger.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/** Add auth controller */
export const authCreate = async (req, res) => {
  try {
    await connectDB();

    /** Create new auth */
    const auth = new Auth(req.body);

    /** hash the passworf before saving */
    auth.Password = await bcrypt.hash(auth.Password, 10);

    /** Generate AccessToken */
    const accessToken = jwt.sign(
      { Password: auth.Password, Email: auth.Email, Phone: auth.Phone },
      configData.jwt.accessTokenSecret,
      { expiresIn: configData.jwt.expiresInAccess }
    );
    auth.AccessToken = accessToken;

    const profileLocalPath = await req.files?.Profile[0]?.path;
    if (profileLocalPath) {
      const profile = await uploadOnCloudinary(profileLocalPath);
      auth.Profile = profile.secure_url;
    }

    /** Check if the card number is unique */
    if (req.body.CardNumber) {
      const existingCardNumber = await Auth.findOne({
        CardNumber: auth.CardNumber,
        _id: { $ne: auth._id },
      });

      if (existingCardNumber) {
        return res.status(400).json({
          StatusCode: 4,
          Success: false,
          Message: `Card number must be unique.`,
        });
      }
    }

    /** Check if the mobile number is unique */
    if (req.body.Phone) {
      const existingUser = await Auth.findOne({
        Phone: auth.Phone,
        _id: { $ne: auth._id },
      });

      if (existingUser) {
        return res.status(400).json({
          StatusCode: 4,
          Success: false,
          Message: `Mobile number must be unique.`,
        });
      }
    }

    /** Save Data into MongoDB Database */
    const result = await auth.save();
    if (!result) {
      logger.error({
        StatusCode: 4,
        Message: `Error in creating the auth..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in creating the auth..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `auth Created Successfully..!`,
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

/** Get auth list */
export const authList = async (req, res) => {
  try {
    await connectDB();

    const Lists = await Auth.find().select("-Password -AccessToken");
    if (!Lists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in find auth list..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in find auth list..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Get auth Lists Successfully..!`,
      Data: Lists,
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
  } finally {
    await disconnectDB();
  }
};

/** auth details update by ID */
export const authUpdate = async (req, res) => {
  try {
    await connectDB();

    /** Find auth By ID */
    const authExists = await Auth.findById(req.params._Id).select(
      "-Password -AccessToken"
    );
    if (!authExists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Find auth by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Find auth by ID..!`,
      });
    }

    /** Check if the mobile number is unique */
    if (req.body.Phone) {
      const existingUser = await Auth.findOne({
        Phone: req.body.Phone,
        _id: { $ne: req.params._Id },
      });

      if (existingUser) {
        return res.status(400).json({
          StatusCode: 4,
          Success: false,
          Message: "Mobile number must be unique.",
        });
      }
    }

    const authUpdate = await Auth.findByIdAndUpdate(
      req.params._Id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!authUpdate) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Update auth by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Update auth by ID..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Update auth data Successfully..!`,
      Data: authUpdate,
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

/** auth Delete by ID */
export const authDel = async (req, res) => {
  try {
    await connectDB();

    /** Find auth By ID */
    const authExists = await Auth.findById(req.params._Id).select(
      "-Password -AccessToken"
    );
    if (!authExists) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Find auth by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Find auth by ID..!`,
      });
    }

    const authDelete = await Auth.findByIdAndDelete(req.params._Id);
    if (!authDelete) {
      logger.error({
        StatusCode: 4,
        Message: `Error in Delete auth by ID..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in Delete auth by ID..!`,
      });
    }

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Delete auth data Successfully..! Deleted Data here...`,
      Data: authDelete,
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
  } finally {
    await disconnectDB();
  }
};

/** Auth login controller */
export const authLogin = async (req, res) => {
  try {
    await connectDB();

    const { Email, Password } = req.body;
    const user = await Auth.findOne({ Email });
    if (!user) {
      logger.error({
        StatusCode: 4,
        Message: `Error in found user..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Error in found user..!`,
      });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
      logger.error({
        StatusCode: 4,
        Message: `Invalid password..!`,
      });
      res.status(400).json({
        StatusCode: 4,
        Success: false,
        Message: `Invalid password..!`,
      });
    }

    const token = jwt.sign(
      { _id: user._id, Email: user.Email, Role: user.Role },
      configData.jwt.secretKey,
      { expiresIn: configData.jwt.expiresInAccess }
    );

    logger.info({
      StatusCode: 5,
      Message: `Login successful..!`,
    });

    return res.status(200).json({
      StatusCode: 5,
      Success: true,
      Message: `Login successful..!`,
      data: user,
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
  } finally {
    await disconnectDB();
  }
};
