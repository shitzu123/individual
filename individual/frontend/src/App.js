import { Routes,Route} from 'react-router-dom';
import './App.css';
import Admin_training from './admin_component/create_training';
import Login from './login_component/login';
import Signup from './login_component/register';
import Users from './user_component/Users';
import UserForm from './user_component/UserForm';
import View_training from './admin_component/view_trainings';
import Training from './admin_component/view_trainings';




function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/view_event' element={ <Training/>}/>
      <Route path='/' element={ <Login/>}/>
      <Route path='/signup' element={ <Signup/>}/>
      <Route path='/userform' element={ <UserForm/>}/>
      <Route path='/create_event' element={<Admin_training/>}/>
      </Routes>
    </div>
  );
}

export default App;
