import React from "react";
import {Link} from "react-router-dom"

//put a nice navbar in here
function Header() 
{
  return (
    <div className="header">
      <Link to="/LogIn">Login</Link>
    </div>
  );
}

export default Header;