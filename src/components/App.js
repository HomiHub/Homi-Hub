import 'bootstrap/dist/css/bootstrap.min.css';
import "./bootstrapOverride.scss";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Registration from "../registration/Registration";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import LogIn from "../login/LogIn";
import ErrorPage from "../error/ErrorPage";
import Tracker from "../gpsTracker/Tracker";
import { userToken } from "../login/LogIn";
import PrivateRoute from "./PrivateRoute"


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
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;

//<a href="/home"> Go to home page</a>   //under router