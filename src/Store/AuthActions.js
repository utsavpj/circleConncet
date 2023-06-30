import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import  {auth,database,db} from '../Firebase';
import  { setLoading, setUser, setError, clearError, logoutSuccess }  from './Auth-slice';
import { child, get, ref, set } from 'firebase/database';


export const register = (email, password,username,name,dob) => async (dispatch) => {

  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user,{displayName:name});

    await set(ref(database,'users/' + user.uid), {
      email: user.email,
      uid: user.uid,
      name: user.displayName,
      username: username,
      password: password,
      dob: dob,
    });
  

    dispatch(setUser(user))
    
  } catch (err) {
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
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };
  
  export const logout = () => async (dispatch) => {
    try {
      
      // Sign out the user
      await auth.signOut();
  
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

  export const getUsers = async (userId) => {
    try {
      const dbRef = ref(database);
      const usersData = {};
  
      // Retrieve users data from the "users" node in the Realtime Database
      const snapshot = await get(child(dbRef, `users/${userId}`));
  
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userId = childSnapshot.key;
          const userData = childSnapshot.val();
          usersData[userId] = userData;
        });
      } else {
        console.log("No data available");
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
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
