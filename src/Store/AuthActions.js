import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {auth} from '../Firebase'
import  { setLoading, setUser, setError, clearError, logoutSuccess }  from './Auth-slice';


export const register = (email, password) => async (dispatch) => {

  try {
    dispatch(setLoading(true));
    dispatch(clearError());

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

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



