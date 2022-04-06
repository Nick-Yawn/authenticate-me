import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
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
        <Route exact path ='/'>
          <Home />
        </Route>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
