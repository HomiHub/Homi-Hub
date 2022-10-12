//this handles all the page routing using react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';
import "./bootstrapOverride.scss";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Registration from "../registration/Registration";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import LogIn from "../login/LogIn";
import Tracker from "../gpsTracker/Tracker";
import { userToken } from "../login/LogIn";
import PrivateRoute from "./PrivateRoute"
import ErrorPage from "../error/ErrorPage"
import JoinAFamily from "../registration/JoinAFamily"
import FamilyHomePage from "../familyHomePage/familyHomePage"


//path is url browser path that leads to each page
//element is the imported page that you want the website to navigate to
function App() {
  return (
    <Router>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route element={<PrivateRoute/>}>
            <Route path="/tracker" element={<Tracker />}></Route>
          </Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/joinafamily" element={<JoinAFamily />}></Route>
          <Route path="/familyHomePage" element={<FamilyHomePage />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;