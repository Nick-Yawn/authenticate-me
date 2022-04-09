import Login from './Login';
import Signup from './Signup';

import './LoginSignupForm.css';

export default function LoginSignupForm() {
  return(
    <div className="login-signup-form">
      <Login />
      <Signup /> 
    </div>
  )
}
