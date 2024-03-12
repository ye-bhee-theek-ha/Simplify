import { SignupForm } from "./components/SignupForm/SignupForm"
import { LoginForm } from "./components/loginForm/loginForm"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from "./screens/NotFound/NotFound";
import Homescreen from './screens/Homescreen/Homescreen';
import {ResetPasswordForm} from "./screens/ResetPass/ResetPass"
import {ForgotPasswordForm} from "./screens/ForgotPass/ForgotPass"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homescreen />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />}/>
        <Route path='/reset' element={<ResetPasswordForm />}/>
        <Route path='/forgotPassword' element={<ForgotPasswordForm />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
