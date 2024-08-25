import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    try {
        console.log(req.body);
        // return res.json("completed");
        const listed = await Listing.create(req.body);
        return res.status(200).json(listed);
    } catch (error) {
        next(error);
    }

}
