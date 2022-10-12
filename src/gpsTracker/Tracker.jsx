import React from "react";
import reactDom from "react-dom/client";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import "./styles.css";
import { Spinner } from "react-bootstrap";
import homi from "../assets/homi.png"
import { get, onValue, ref, set } from "firebase/database";
import { db } from "../components/firebase";
import { userToken } from "../login/LogIn.js";
import { useNavigate } from "react-router-dom";


function Tracker() {
    // let navigate = useNavigate();
    // console.log(userToken);
    // navigate('/');
    // if(userToken === null) { navigate('/'); }
    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,});
    const[myLocation, setLocation] = useState({location: {
        lat: 110,
        lng: 1
    }
    });
    const myRef = ref(db, 'testUser');

    useEffect(() => {

        onValue(myRef, (snapshot) => {
            setLocation(snapshot.val());
        } );
    }, []);

    
    if(!isLoaded) return (
        <div id="spinner-div">
            <Spinner className="spinner-style" animation="border" role="status"></Spinner>
        </div>
        );
    return (
        <div>
            <GoogleMap zoom={10} center={{lat: myLocation.location.lat, lng: myLocation.location.lng}} mapContainerClassName="map-container">
                <MarkerF icon={homi} position={{lat: myLocation.location.lat, lng: myLocation.location.lng}} />
            </GoogleMap>
        </div>
    );
}


export default Tracker;
