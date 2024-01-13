import { Router } from "express";
import validate from "../middlewares/schemaValidation.js";

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                 Auth Routes                                */
/* -------------------------------------------------------------------------- */
import { authCreate, authList, authUpdate, authDel, authLogin } from "../controllers/auth.controller.js";
import { authVal, authDelVal } from "../validations/validations.js";
router.route("/auth").post(authCreate);
router.route("/authlist").get(authList);
router.route("/authup/:_Id").put(authUpdate);
router.route("/authdel/:_Id").delete(authDel);
router.route("/login").post(authLogin);

/* -------------------------------------------------------------------------- */
/*                               Election Routes                              */
/* -------------------------------------------------------------------------- */
import { electionCreate, electionList, electionUpdate, electionDel } from "../controllers/election.controller.js";
import { electionVal, electionUpVal, electionDelVal } from "../validations/validations.js";
router.route("/ele").post(electionCreate);
router.route("/elelist").get(electionList);
router.route("/eleup/:_Id").put(electionUpdate);
router.route("/eledel/:_Id").delete(electionDel);

/* -------------------------------------------------------------------------- */
/*                                Party Routes                                */
/* -------------------------------------------------------------------------- */
import { partyCreate, partyList, partyUpdate, partyDel } from "../controllers/party.controller.js";
import { partyVal, partyUpVal, partyDelVal } from "../validations/validations.js";
router.route("/party").post(partyCreate);
router.route("/pList").get(partyList);
router.route("/pup/:_Id").put(partyUpdate);
router.route("/pdel/:_Id").delete(partyDel);

/* -------------------------------------------------------------------------- */
/*                                 Vote Routes                                */
/* -------------------------------------------------------------------------- */
import { voteCount, voteCreate, voteDel, voteList } from "../controllers/voteCount.controller.js";
import { voteVal, voteDelVal } from "../validations/validations.js";
router.route("/vote").post(voteCreate);
router.route("/vlist").get(voteList)
router.route("/vcount").get(voteCount);
router.route("vdel/:_Id").delete(voteDel);

export default router;
