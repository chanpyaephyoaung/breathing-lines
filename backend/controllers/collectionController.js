import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Poem from "../models/poemModel.js";
import Collection from "../models/collectionModel.js";
import { s3RetrieveV3 } from "../s3Service.js";

// @desc    Create a new collection
// @route   POST /api/user-profile/:userId/collections
// @access  Private
export const createNewCollection = asyncHandler(async (req, res) => {
   const { collectionName } = req.body;
   const currentUserId = req.currentUser._id;

   const newCollection = new Collection({
      name: collectionName,
      createdBy: currentUserId,
      poems: [],
   });

   const savedCollection = await newCollection.save();

   // Add the collection to the user's collections field
   const currentUser = await User.findById(req.currentUser._id);
   currentUser.collections.push(savedCollection._id);

   await currentUser.save();

   res.status(201).json(savedCollection);
});

// @desc    Retrieve all collections of a specific user
// @route   GET /api/user-profile/:userId/collections
// @access  Private
export const getCollectionsOfUser = asyncHandler(async (req, res) => {
   const currentUserId = req.currentUser._id;

   const collections = await Collection.find({ createdBy: currentUserId });

   res.status(200).json(collections);
});

// @desc    Retrieve one specific collection of a user
// @route   GET /api/user-profile/:userId/collections/:collectionId
// @access  Private
export const getOneCollectionOfUser = asyncHandler(async (req, res) => {
   const { collectionId } = req.params;

   const collection = await Collection.findById({ _id: collectionId })
      .populate({
         path: "poems",
         select: "title author content coverImg encodedCoverImg viewsCount publishedAt",
         populate: {
            path: "author",
            select: "name",
         },
      })
      .populate("createdBy", "name");

   res.status(200).json(collection);
});
