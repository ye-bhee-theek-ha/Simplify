import { SignupForm } from "./components/SignupForm/SignupForm"
import { LoginForm } from "./components/loginForm/loginForm"
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NotFound from "./screens/NotFound/NotFound";
import Homescreen from './screens/Homescreen/Homescreen';
import ResetPass from "./screens/ResetPass/ResetPass"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homescreen />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />}/>
        <Route path='/reset' element={<ResetPass />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
