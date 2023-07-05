import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { database, storage } from "../Firebase";
import { child, get, set, ref as sref, update } from "firebase/database";
import { toast } from "react-toastify";

export const postPhoto = async (
  userId,
  photo,
  content,
  likes = 0,
  comments = 0,
  views = 0
) => {
  try {
    var cleanedContent = content.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
    const fileName = `${userId}_${cleanedContent}`;
    const storageRef = ref(storage, `posts/${userId}/${fileName}`);
    await uploadString(storageRef, photo, "data_url");

    // Get the download URL of the uploaded photo
    const photoUrl = await getDownloadURL(storageRef);
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formatteddate = date.toLocaleString(date);

    await set(sref(database, `posts/${userId}/${fileName}`), {
      uid: userId,
      photo: photoUrl,
      content: content,
      time: formatteddate,
      likes: likes,
      comments: comments,
      views: views,
    });

    toast("Post created successfully");
  } catch (error) {
    toast.error("Error while posting photo", error);
    throw error;
  }
};

export const getUserPosts = async (userId) => {
  try {
    const dbRef = sref(database);
    const userPosts = [];

    // Retrieve users data from the "users" node in the Realtime Database
    const snapshot = await get(child(dbRef, `posts/${userId}`));

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const postId = childSnapshot.key;
        const postData = childSnapshot.val();
        userPosts.push(postData);
      });
    } else {
      console.log("No data available");
    }

    return userPosts;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const dbRef = sref(database);
    const userPosts = [];

    // Retrieve users data from the "users" node in the Realtime Database
    const snapshot = await get(child(dbRef, `posts/`));

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const postData = childSnapshot.val();
        userPosts.push(postData);
      });
    } else {
      console.log("No data available");
    }

    return userPosts;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const updateLikeActions = async (
  userId,
  content,
  likes,
  views
) => {
  try {

    var cleanedContent = content.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
    const fileName = `${userId}_${cleanedContent}`;
    await update(sref(database, `posts/${userId}/${fileName}`), {
      likes: likes,
      views: views,
    });

    console.log("Likes updated for: ", userId);
  } catch (error) {
    throw error;
  }
};

export const updateCommentActions = async (
  userId,
  content,
  time,
  comments,
  views
) => {
  try {
    const formattedDateFromDB = time; // Example formatted date from the database

    // Convert the formatted date back to a Date object
    const dateFromDB = new Date(formattedDateFromDB);

    const fileName = `${dateFromDB.getTime()}_${content}`;

    await update(sref(database, `posts/${userId}/${fileName}`), {
      comments: comments,
      views: views,
    });
  } catch (error) {
    throw error;
  }
};
