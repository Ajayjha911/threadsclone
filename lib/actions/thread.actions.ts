"use server";

import Thread from "../models/thread.models";
import User from "../models/user.models";
import { connectToDB } from "../mongoose";

export declare type CreateThreadType = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};

export async function createThread({
  text,
  author,
  communityId,
  path,
}: CreateThreadType) {
  try {
    connectToDB();
    const createThread = await Thread.create({
      text,
      author,
      communityId,
    });
    //Update User after creating thread
    await User.findByIdAndUpdate(author, {
      $push: { threads: createThread._id },
    });
  } catch (error) {}
}

export async function fetchThreadPost(pageNumber = 1, pageSize: 20) {
  try {
    connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const postQuery = Thread.find({
      parentId: {
        $in: [null, undefined],
      },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    }); // Get the total count of posts

    const posts = await postQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;
    // console.log("first", posts);
    return { posts, isNext };
  } catch (error) {}
}
