import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { database, storage } from "../Firebase";
import { child, get, push, set, ref as sref, update } from "firebase/database";
import { toast } from "react-toastify";

export const postPhoto = async (
  userId,
  photo,
  content,
  likes = 0,
  views = 0
) => {
  try {
    var cleanedContent = content.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
    const fileName = `${userId}_${cleanedContent}`;
    const postId = generatePostId();
    const storageRef = ref(storage, `posts/${userId}/${postId}`);
    await uploadString(storageRef, photo, "data_url");

    // Get the download URL of the uploaded photo
    const photoUrl = await getDownloadURL(storageRef);
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const formatteddate = date.toLocaleString(date);

    await set(sref(database, `posts/${userId}/${postId}`), {
      uid: userId,
      postId: postId,
      photo: photoUrl,
      content: content,
      time: formatteddate,
      likes: likes,
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
  postId,
  likes,
) => {
  try {

    await update(sref(database, `posts/${userId}/${postId}`), {
      likes: likes,
    });

    console.log("Likes updated for: ", userId);
  } catch (error) {
    throw error;
  }
};

export const updateViewActions = async (
  userId,
  postId,
  views
) => {
  try {

    await update(sref(database, `posts/${userId}/${postId}`), {
      views: views,
    });

    console.log("Views updated for: ", userId);
  } catch (error) {
    throw error;
  }
};

  export const saveComment = async (userid,currentUserID,postId ,commentContent) => {
    const commentID = generatePostId()
    try{
    await set(sref(database, `comments/${userid}/${postId}/${commentID}`), {
      uid: currentUserID,
      content: commentContent,      
    });
  }
  catch(error){
    console.log("Comment not send ",error)
  }
  };
  
  const generatePostId = () => {
    const postsRef = sref(database,'posts');
    const newPostRef = push(postsRef); // Create a new child reference with an auto-generated ID
    const postId = newPostRef.key; // Get the generated ID
  
    return postId;
  }; 

  export const getPostComments = async (userId,postId) => {
    try {
      const dbRef = sref(database);
      const comments = [];
  
      // Retrieve users data from the "users" node in the Realtime Database
      const snapshot = await get(child(dbRef, `comments/${userId}/${postId}`));
  
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const postData = childSnapshot.val();
          comments.push(postData);
        });
      }
  
      return comments;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };


