import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import Poem from "../models/poemModel.js";
import Collection from "../models/collectionModel.js";
import mongoose from "mongoose";
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
   const targetUserId = req.params.userId;
   console.log(req.params);

   const targetUser = await User.findById(targetUserId).populate("collections", "name createdBy");
   console.log(targetUser);

   res.status(200).json(targetUser.collections);
});

// @desc    Retrieve one specific collection of a user
// @route   GET /api/user-profile/:userId/collections/:collectionId
// @access  Private
export const getOneCollectionOfUser = asyncHandler(async (req, res) => {
   const { collectionId } = req.params;

   const collection = await Collection.findById(collectionId)
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

// @desc    Add a poem to a collection
// @route   POST /api/user-profile/:userId/collections/:collectionId/add/poem/:poemId
// @access  Private
export const addPoemToCollection = asyncHandler(async (req, res) => {
   const { collectionId, poemId } = req.params;

   const targetCollection = await Collection.findById(collectionId);
   const targetPoem = await Poem.findById(poemId);
   const alreadyAdded = targetCollection.poems.includes(targetPoem._id);

   if (!alreadyAdded) {
      // Add and save the review to the author's profileReviews array
      targetCollection.poems.push(targetPoem._id);
      await targetCollection.save();

      res.status(201).json({
         message: `Poem added to collection - ${targetCollection.name} successfully.`,
      });
   } else {
      res.status(400);
      throw new Error("Poem already exists in this collection.");
   }
});

// @desc    Delete a poem from the collection
// @route   DELETE /api/user-profile/:userId/collections/:collectionId/delete/poem/:poemId
// @access  Private
export const removePoemFromCollection = asyncHandler(async (req, res) => {
   const { collectionId, poemId } = req.params;

   const targetCollection = await Collection.findById(collectionId);
   const targetPoem = await Poem.findById(poemId);
   const poemExistsInCollection = targetCollection.poems.includes(targetPoem._id);

   const isCurrentUserTheCollectionOwner =
      targetCollection.createdBy.toString() === req.currentUser._id.toString();

   if (!isCurrentUserTheCollectionOwner) {
      res.status(401);
      throw new Error("You are not authorized to remove poems from this collection.");
   }

   if (poemExistsInCollection) {
      // Remove the poem from the collection
      targetCollection.poems = targetCollection.poems.filter(
         (poem) => poem.toString() !== targetPoem._id.toString()
      );
      await targetCollection.save();

      res.status(201).json({
         message: `Poem (${targetPoem.title}) removed from your collection - ${targetCollection.name} successfully.`,
      });
   } else {
      res.status(400);
      throw new Error("Poem does not exist in this collection.");
   }
});
