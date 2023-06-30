import { Provider,useSelector } from 'react-redux';
import RouteComponent from './components/RouteComponent';
import store from './Store/Store'; 



function App() {
  return (
    <div className="App">
    <Provider store={store}>
        <RouteComponent />
    </Provider>
    
    </div>
  );
}

export default App;
