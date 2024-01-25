import { Router } from "express";
import validate from "../middlewares/schemaValidation.js";
import { upload } from "../middlewares/upload.js";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                 Auth Routes                                */
/* -------------------------------------------------------------------------- */
import { authCreate, authList, authUpdate, authDel, authLogin } from "../controllers/auth.controller.js";
import { authVal, authUpVal, authDelVal } from "../validations/validations.js";
router.route("/auth").post(validate(authVal), upload.fields([{ name: "Profile", maxCount: 1 }]), authCreate);
router.route("/authlist").get(authList);
router.route("/authup/:_Id").put(validate(authUpVal), authUpdate);
router.route("/authdel/:_Id").delete(validate(authDelVal), authDel);
router.route("/login").post(authLogin);

/* -------------------------------------------------------------------------- */
/*                               Election Routes                              */
/* -------------------------------------------------------------------------- */
import { electionCreate, electionList, electionUpdate, electionDel } from "../controllers/election.controller.js";
import { electionVal, electionUpVal, electionDelVal } from "../validations/validations.js";
router.route("/ele").post(validate(electionVal), electionCreate);
router.route("/elelist").get(electionList);
router.route("/eleup/:_Id").put(validate(electionUpVal), electionUpdate);
router.route("/eledel/:_Id").delete(validate(electionDelVal), electionDel);

/* -------------------------------------------------------------------------- */
/*                                Party Routes                                */
/* -------------------------------------------------------------------------- */
import { partyCreate, partyList, partyUpdate, partyDel } from "../controllers/party.controller.js";
import { partyVal, partyUpVal, partyDelVal } from "../validations/validations.js";
router.route("/party").post(validate(partyVal), upload.fields([{ name: "Profile", maxCount: 1 }]), partyCreate);
router.route("/pList").get(partyList);
router.route("/pup/:_Id").put(validate(partyUpVal), partyUpdate);
router.route("/pdel/:_Id").delete(validate(partyDelVal), partyDel);

/* -------------------------------------------------------------------------- */
/*                                 Vote Routes                                */
/* -------------------------------------------------------------------------- */
import { voteCreate, voteDel, voteList } from "../controllers/voteCount.controller.js";
import { voteVal, voteDelVal } from "../validations/validations.js";
router.route("/vote").post(validate(voteVal), voteCreate);
router.route("/vlist").get(voteList);
router.route("/vdel/:_Id").delete(validate(voteDelVal), voteDel);

/* -------------------------------------------------------------------------- */
/*                              PartyList Routes                              */
/* -------------------------------------------------------------------------- */
import { partylistCreate, partylist, partylistDel } from "../controllers/partylist.controller.js";
import { partylistVal, partylistDelVal } from "../validations/validations.js";
router.route("/plist").post(validate(partylistVal), partylistCreate);
router.route("/plistall").get(partylist);
router.route("/plistdel/:_Id").delete(validate(partyDelVal), partylistDel);

export default router;
