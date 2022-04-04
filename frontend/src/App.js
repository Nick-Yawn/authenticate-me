import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import { getSessionUser } from './store/session';

require('./App.css');

function App() {
  const dispatch = useDispatch();
  // isLoaded state slice, to be updated on loading user, or other fetch calls? 
  const [isLoaded, setIsLoaded ] = useState(false);
 
  useEffect( () => {
    dispatch(getSessionUser()).then( () => setIsLoaded(true) ) ;
  }, [dispatch])
  
  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
      <div className="footer" />
    </>
  );
}

export default App;
