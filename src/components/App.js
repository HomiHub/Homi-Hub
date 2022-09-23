import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Registration from "./Pages/Registration";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Pages/LogIn";
import ErrorPage from "./Pages/ErrorPage"


function App() {

  return (
    <Router>
      <div>
        <Header></Header>
        <div>
        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;

//<a href="/home"> Go to home page</a>   //under router