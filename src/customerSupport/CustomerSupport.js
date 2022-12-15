import React, {useState} from "react";
import backPick from "../assets/homi-no-bg.png"
import Logo from "../assets/homi-icon.png"

//timer that checks the current state of the window
function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
}

function CustomerSupport() 
{
    function refreshPage() {
        window.location.reload(false);
    }
  //variables for the height and width of the window
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  const[email, setEmail] = useState("");
  const[message, setMessage] = useState("");

  const handleEmailChange=(e)=>{
    setEmail(e.target.value)
  };

  const handleMessageChange=(e)=>{
    setMessage(e.target.value)
  };

  //uses the React useEffect method to check every second while the user is interacting with the page
  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 1000)
    //calls the resize of the window and its components
    window.addEventListener('resize', debouncedHandleResize)
    //the actual return
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    
    }
  })

  return (
    <div className="loginMiddle">
      <img src={backPick} alt="background_Picture" />
      <div className="login">
        <img src={Logo} alt="site icon"></img>
        <p>Customer Support</p>
        <input class="registrationInput" type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input class="registrationInput" type="text" placeholder="Message" value={message} onChange={handleMessageChange} />
        <button className="registrationButton" style={{backgroundColor: "black"}} 
                onClick={refreshPage}
        >Submit</button>
      </div>
    </div>
  );
}

export default CustomerSupport;