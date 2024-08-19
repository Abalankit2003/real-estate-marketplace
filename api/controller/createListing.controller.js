import Listing from "../models/listing.model.js";

export const createListing = (req, res, next) => {
    try {
        const listed = Listing.create(req.body);
        return res.status(200).json('successfully listed your flat');
    } catch (error) {
        next(error);
    }

}
