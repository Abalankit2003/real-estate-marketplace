import express from 'express';
import verifyUser from '../utils/verifyUser.js';
import {
  createListing,
  deleteListing,
  updateUserListing,
} from "../controller/listing.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.post("/update/:id", verifyUser, updateUserListing);

export default router;
