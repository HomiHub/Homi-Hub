import 'bootstrap/dist/css/bootstrap.min.css';
import "./bootstrapOverride.scss"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Registration from "../registration/Registration";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Login from "../login/LogIn";
import ErrorPage from "../error/ErrorPage";
import Tracker from "../gpsTracker/Tracker";



function App() {

  return (
    <Router>
      <div>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/tracker" element={<Tracker />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;

//<a href="/home"> Go to home page</a>   //under router