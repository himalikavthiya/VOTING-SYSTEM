import Joi from "joi";

/* -------------------------------------------------------------------------- */
/*                           Admin routes validation                          */
/* -------------------------------------------------------------------------- */
/** Create Admin Validation */
export const adminVal = {
  body: Joi.object().keys({
    Profile: Joi.string().trim().required(),
    Password: Joi.string().trim().required(),
    First_name: Joi.string().trim().required(),
    Middle_name: Joi.string().trim().required(),
    Last_name: Joi.string().trim().required(),
    Phone: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/)
      .required(),
    Email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
  }),
};

/** Update Admin validation */
export const adminUpVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
  body: Joi.object().keys({
    Profile: Joi.string().trim(),
    Password: Joi.string().trim(),
    First_name: Joi.string().trim(),
    Middle_name: Joi.string().trim(),
    Last_name: Joi.string().trim(),
    Phone: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/),
    Email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
  }),
};

/** Delete Admin By ID validation */
export const adminDelVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
};

/* -------------------------------------------------------------------------- */
/*                           Auth Routes validation                           */
/* -------------------------------------------------------------------------- */
/** Create Auth Validation */
export const authVal = {
  body: Joi.object().keys({
    Profile: Joi.string().trim().required(),
    Password: Joi.string().trim().required(),
    CardNumber: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{10}$/)
      .required(),
    First_name: Joi.string().trim().required(),
    Middle_name: Joi.string().trim().required(),
    Last_name: Joi.string().trim().required(),
    Sex: Joi.string()
      .valid("male", "female", "other")
      .default("Not-defined")
      .required(),
    DOB: Joi.date().max("now").required(),
    Address: Joi.string().trim().required(),
    Phone: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/)
      .required(),
    Email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
  }),
};

/** Update Auth validation */
export const authUpVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
  body: Joi.object().keys({
    Profile: Joi.string().trim().required(),
    Password: Joi.string().trim().required(),
    CardNumber: Joi.string()
      .trim()
      .pattern(/^[a-zA-Z0-9]{10}$/)
      .required(),
    First_name: Joi.string().trim().required(),
    Middle_name: Joi.string().trim().required(),
    Last_name: Joi.string().trim().required(),
    Sex: Joi.string()
      .valid("male", "female", "other")
      .default("Not-defined")
      .required(),
    DOB: Joi.date().max("now").required(),
    Address: Joi.string().trim().required(),
    Phone: Joi.string()
      .trim()
      .pattern(/^[0-9]{10}$/)
      .required(),
    Email: Joi.string()
      .trim()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } })
      .required(),
  }),
};

/** Delete Auth Validation */
export const authDelVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
};

/* -------------------------------------------------------------------------- */
/*                               Election Routes                              */
/* -------------------------------------------------------------------------- */
/** Create Election Validation */
export const electionVal = {
  body: Joi.object().keys({
    ElectionName: Joi.string().trim().required(),
    RegisterDate: Joi.date().required(),
  }),
};

/** Update Election Validation */
export const electionUpVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
  body: Joi.object().keys({
    ElectionName: Joi.string().trim().required(),
    RegisterDate: Joi.date().required(),
  }),
};

/** Delete Eelection Validation */
export const electionDelVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
};

/* -------------------------------------------------------------------------- */
/*                              Party Validation                              */
/* -------------------------------------------------------------------------- */
/** Create Party Validation */
export const partyVal = {
  body: Joi.object().keys({
    p_name: Joi.string().trim(),
    p_logo: Joi.string().trim(),
    short_code: Joi.string().trim(),
  }),
};

export const partyUpVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
  body: Joi.object().keys({
    p_name: Joi.string().trim(),
    p_logo: Joi.string().trim(),
    short_code: Joi.string().trim(),
  }),
};

/** Delete Party Validation */
export const partyDelVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
};

/* -------------------------------------------------------------------------- */
/*                               Vote Validation                              */
/* -------------------------------------------------------------------------- */
/** Create Vote Validation */
export const voteVal = {
  body: Joi.object().keys({
    Name: Joi.string().trim(),
    party: Joi.string().trim(),
    election: Joi.string().trim(),
  }),
};

/** Delete Vote Validation */
export const voteDelVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
};
