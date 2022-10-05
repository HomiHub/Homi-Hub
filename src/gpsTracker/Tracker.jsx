import React from "react";
import reactDom from "react-dom/client";
import useGeolocation from "./useGeolocation";
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api';
import "./styles.css";
import { Spinner } from "react-bootstrap";
import homi from "../assets/homi.png"

function Tracker() {
    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,});
    if(!isLoaded) return <div>loading...</div>
    else return (
        <div>
            <Map/>
        </div>
    )
}

function Map() {
    const location = useGeolocation();
    console.log("check here " + JSON.stringify(location));
    console.log("look: " + Object.keys(location));
    if (location.loaded && location.coordinates != undefined) {
        return (
        <GoogleMap zoom={10} center={{lat: location.coordinates.lat, lng: location.coordinates.lng}} mapContainerClassName="map-container">
            <MarkerF icon={homi} position={{lat: location.coordinates.lat, lng: location.coordinates.lng}} />
        </GoogleMap>);
    }
    else if ((location.loaded && location.errorCode == 1)) {
        return (
            <div className="error-box">Please Allow Location Access and Refresh the Page</div>
        )
    }
    else {
        return(
            <div id="spinner-div">
                <Spinner className="spinner-style" animation="border" role="status"></Spinner>
            </div>
        )
    }
}

export default Tracker;
