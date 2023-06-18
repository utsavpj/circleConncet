import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import  {auth,db} from '../Firebase'
import { collection, addDoc, getDocs } from "firebase/firestore";
import  { setLoading, setUser, setError, clearError, logoutSuccess }  from './Auth-slice';


export const register = (email, password,username,name,dob) => async (dispatch) => {

  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user,{displayName:name});

    addDoc(collection(db, "users"), {
      username:username,
      name:name,
      dob:dob,
      email:email,
      password:password
      
    })
    .then(() => {
      alert('Message submitted 👍' );
    })
    .catch((error) => {
      alert(error.message);
    });

    dispatch(setUser(user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
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

  export const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const users = querySnapshot.docs.map((doc) => doc.data());
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
