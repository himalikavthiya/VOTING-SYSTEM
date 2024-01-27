import Joi from "joi";

/* -------------------------------------------------------------------------- */
/*                           Auth Routes validation                           */
/* -------------------------------------------------------------------------- */
/** Create Auth Validation */
export const authVal = {
  body: Joi.object().keys({
    Profile: Joi.string().trim(),
    Password: Joi.string().trim(),
    CardNumber: Joi.string().trim().pattern(/^[a-zA-Z0-9]{10}$/),
    Name: Joi.string().trim(),
    Sex: Joi.string().valid("male", "female", "other").default("Not-defined"),
    DOB: Joi.date().max("now"),
    Address: Joi.string().trim(),
    Phone: Joi.string().trim().pattern(/^[0-9]{10}$/),
    Email: Joi.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    Role: Joi.string().trim(),
  }),
};

/** Update Auth validation */
export const authUpVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
  body: Joi.object().keys({
    Profile: Joi.string().trim(),
    Password: Joi.string().trim(),
    CardNumber: Joi.string().trim().pattern(/^[a-zA-Z0-9]{10}$/),
    Name: Joi.string().trim(),
    Sex: Joi.string().valid("male", "female", "other"),
    DOB: Joi.date().max("now"),
    Address: Joi.string().trim(),
    Phone: Joi.string().trim().pattern(/^[0-9]{10}$/),
    Email: Joi.string().trim().lowercase().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    Role: Joi.string().trim(),
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
    ElectionName: Joi.string().trim(),
    RegisterDate: Joi.date(),
    Party: Joi.string().trim(),
  }),
};

/** Update Election Validation */
export const electionUpVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
  body: Joi.object().keys({
    ElectionName: Joi.string().trim(),
    RegisterDate: Joi.date(),
    Party: Joi.string().trim(),
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
    pName: Joi.string().trim(),
    Profile: Joi.string().trim(),
    shortCode: Joi.string().trim(),
  }),
};

/** Update Party Validation */
export const partyUpVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
  body: Joi.object().keys({
    pName: Joi.string().trim(),
    Profile: Joi.string().trim(),
    shortCode: Joi.string().trim(),
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
    Auth: Joi.string().trim(),
    Party: Joi.string().trim(),
  }),
};

/** Delete Vote Validation */
export const voteDelVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
};

/* -------------------------------------------------------------------------- */
/*                              PartyList Routes                              */
/* -------------------------------------------------------------------------- */
/** Create Partylist validation */
export const partylistVal = {
  body: Joi.object().keys({
    Party: Joi.string().trim(),
    Election: Joi.string().trim(),
  }),
};

/** Delete Vote Validation */
export const partylistDelVal = {
  params: Joi.object().keys({
    _Id: Joi.string().trim().required(),
  }),
};
