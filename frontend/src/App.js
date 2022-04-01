import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import { getSessionUser } from './store/session';

require('./App.css');

function App() {
  const dispatch = useDispatch();
  // isLoaded state slice, to be updated on loading user, or other fetch calls? 
 
  useEffect( () => {
    dispatch(getSessionUser());
  }, [dispatch])
  
  return (
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
      <Route path='/signup'>
        <SignupFormPage />
      </Route>
    </Switch>
  );
}

export default App;
