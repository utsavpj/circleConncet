import { EmailAuthProvider, createUserWithEmailAndPassword, getAuth, reauthenticateWithCredential, sendPasswordResetEmail, signInWithEmailAndPassword, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import  {auth,database, storage} from '../Firebase';
import  { setLoading, setUser, setError, clearError, logoutSuccess }  from './Auth-slice';
import { child, get,ref as sref, set, update } from 'firebase/database';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { toast } from 'react-toastify';


export const register = (email, password,username,name,dob,profilePic) => async (dispatch) => {

  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const storageRef = ref(storage, `users/${user.uid}/profilePicture`);
    await uploadString(storageRef, profilePic,'data_url');

    // Get the download URL of the uploaded profile picture
    const profilePictureUrl = await getDownloadURL(storageRef);

    await updateProfile(user,{displayName:name});

    await set(sref(database,'users/' + user.uid), {
      email: user.email,
      uid: user.uid,
      name: user.displayName,
      username: username,
      password: password,
      dob: dob,
      profilePic:profilePictureUrl,
    });
  
    toast("Successfully Registered")
    dispatch(setUser(user))
    
  } catch (err) {
    console.log("Error",err)
    toast.error("Error while register user.")
    dispatch(setError(err.message));
  } finally{
    dispatch(setLoading(false))
  }
};

  
  export const login = (email, password) => async (dispatch) => {
    try {
      
      dispatch(setLoading(true));
      dispatch(clearError());
  
      // Authenticate user with email and password
      const userCredential = await signInWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;
      
      dispatch(setUser(user));
      toast("Log in successful")
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      toast.error("Error while log in")
      dispatch(setLoading(false));
    }
  };
  
  export const logout = () => async (dispatch) => {
    try {
      
      // Sign out the user
      await auth.signOut();
  
      dispatch(logoutSuccess());
      toast("Successfully logged out")
    } catch (error) {
      dispatch(setError(error.message));
      toast.error("Error while logging out")
      dispatch(setLoading(false));
    }
  };

  export const getUsers = async (userId) => {
    try {
      const dbRef = sref(database);
      const usersData = {};
  
      // Retrieve users data from the "users" node in the Realtime Database
      const snapshot = await get(child(dbRef, `users/${userId}`));
  
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userId = childSnapshot.key;
          const userData = childSnapshot.val();
          usersData[userId] = userData;
        });
      }
  
  
      return usersData;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

 export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  export const updateUser = async (userId,name,username,currentpassword,newpassword,dob,email,profilePic) => {
    console.log(currentpassword,newpassword)
    try {
      await update(sref(database, 'users/' + userId), {
        dob,
        email,
        username,
        name,
        uid: userId,
        profilePic,
      });
  
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
  
      // Reauthenticate the user with their current credentials
      const credential = EmailAuthProvider.credential(user.email, currentpassword);
      await reauthenticateWithCredential(user, credential);
  
      // Update user's email if a new email is provided
      if (email !== '') {
        await updateEmail(user, email);
      }
  
      // Update user's password if a new password is provided
      if (newpassword !== '') {
        await updatePassword(user, newpassword);
      }
  
      toast("User information updated")
    } catch (error) {
      toast('Error while updating user!');
      throw error;
    }
  };
  
