import Listing from "../models/listing.model.js";
import customError from "../utils/error.js";

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

export const deleteListing = async (req, res, next) => {
   const listing = await Listing.findById(req.params.id);
   if(!listing) {
    return next(customError(401, 'Listing not found'));
   }

   if(listing.userRef !== req.user.id) {
    return next(customError(401, 'you can delete your listings only'));
   }

   try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("deleted");
   } catch (error) {
     next(error);
   }
} 

export const updateUserListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if(!listing) {
        return next(customError(401, 'No listing found'));
    }

    if(req.user.id != listing.userRef) {
        return next(customError(401, 'You must update your own listing'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new : true});
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}

export const getListingData = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if(!listing) {
            return next(customError(401, 'No listing found'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}
