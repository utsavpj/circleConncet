import { child, get, ref, remove, set } from "firebase/database";
import { toast } from "react-toastify";
import { database } from "../Firebase";
import { getUsers } from "./AuthActions";

export const sendRequest = async (currentUserid,SendUserid ) => {
    try {
        

        const timestamp = Date.now();
        const date = new Date(timestamp);
        const formatteddate = date.toLocaleString(date);
    
        await set(ref(database, `requests/${SendUserid}/${currentUserid}`), {
          uid: currentUserid,
          requestId: SendUserid,
          time: formatteddate,
        });
    
        toast("Requested");
       
      } catch (error) {
        toast.error("Error while send request", error);
        throw error;
      }
    
};


export const getRequests = async(currentUserid) => {
  try {
    const dbRef = ref(database);
    const userRequestId = [];
    var userRequestData = {}

    // Retrieve users data from the "users" node in the Realtime Database
    const snapshot = await get(child(dbRef, `requests/${currentUserid}`));
  

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
  
        const req = childSnapshot.val();
        userRequestId.push(req.uid);
      });
    }
    const userDetailsPromises = userRequestId.map((id) => getUsers(id));
    const userDetails = await Promise.all(userDetailsPromises);

    userDetails.forEach((userData) => {
      // Add user details to the userRequestData object
      userRequestData[userData.uid] = userData;
    });

    return userRequestData;
    
    
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export const removeRequest = async (currentUserid,SendUserid) => {
  try {
    const requestRef = ref(database, `requests/${SendUserid}/${currentUserid}`);

    // Remove the request node from the database
    await remove(requestRef);

    toast("Request removed");
  } catch (error) {
    toast.error("Error while removing request", error);
    throw error;
  }
}

export const cancelRequest = async (currentUserid,SendUserid) => {
  try {
    const requestRef = ref(database, `requests/${currentUserid}/${SendUserid}`);

    // Remove the request node from the database
    await remove(requestRef);

    toast("Request removed");
  } catch (error) {
    toast.error("Error while removing request", error);
    throw error;
  }
}

export const confirmRequest = async (currentUserid,SendUserid ) => {
  try {
      

      const timestamp = Date.now();
      const date = new Date(timestamp);
      const formatteddate = date.toLocaleString(date);
  
      await set(ref(database, `friends/${currentUserid}/${SendUserid}`), {
        uid: currentUserid,
        requestId: SendUserid,
        time: formatteddate,
      });
  
      toast("Connected");
      return true;
     
    } catch (error) {
      toast.error("Error while confirm request", error);
      throw error;
    }
  
};

export const getFriends = async(currentUserid) => {
  try {
    const dbRef = ref(database);
    const userRequestId = [];
    var userRequestData = {}

    // Retrieve users data from the "users" node in the Realtime Database
    const snapshot = await get(child(dbRef, `friends/${currentUserid}`));
  

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
  
        const req = childSnapshot.val();
        userRequestId.push(req.uid);
      });
    }
    const userDetailsPromises = userRequestId.map((id) => getUsers(id));
    const userDetails = await Promise.all(userDetailsPromises);

    userDetails.forEach((userData) => {
      // Add user details to the userRequestData object
      userRequestData[userData.uid] = userData;
    });

    return userRequestData;
    
    
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}