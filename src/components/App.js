//this handles all the page routing using react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Registration from "../registration/Registration";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import LogIn from "../login/LogIn";
import Tracker from "../gpsTracker/Tracker";
import ErrorPage from "../error/ErrorPage"
import JoinAFamily from "../registration/JoinAFamily"
import FamilyHomePage from "../familyHomePage/familyHomePage"
import { AuthProvider } from './auth';
import { PrivateRoute } from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import ChatRoom from '../chatRoom/ChatRoom';

//path is url browser path that leads to each page
//element is the imported page that you want the website to navigate to
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header></Header>
          <Routes>
            <Route path="/Homi-Hub/" element={<LogIn />}></Route>
            <Route path="/Homi-Hub/registration" element={<Registration />}></Route>
            <Route path="/Homi-Hub/tracker" element={ <PrivateRoute><Tracker/></PrivateRoute>}></Route>
            <Route path="/Homi-Hub/login" element={<LogIn />}></Route>
            <Route path="/Homi-Hub/joinafamily" element={<JoinAFamily />}></Route>
            <Route path="/Homi-Hub/family-homepage" element={<PrivateRoute><FamilyHomePage/></PrivateRoute>}></Route>
            <Route path="/Homi-Hub/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/Homi-Hub/chat-room" element={<PrivateRoute><ChatRoom/></PrivateRoute>}></Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </AuthProvider>
  );              
}

export default App; 