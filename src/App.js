import Login from './components/Login';
import { useSelector } from 'react-redux';
import RouteComponent from './components/RouteComponent';
import Notification from './components/Notification';


function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <div className="App">
    {!isLoggedIn && <Login/>}
    {isLoggedIn && 
    <RouteComponent/>
    
    }
    </div>
  );
}

export default App;
