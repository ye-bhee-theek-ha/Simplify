import { Label } from './components/ui/label';
import { SignupForm } from "./components/SignupForm/SignupForm"
import './App.css';
import Homescreen from './screens/Homescreen/Homescreen';

function App() {
  return (
    <div className="App">
      <div className="m-5">
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}

export default App;
