import React from "react";
import reactDom from "react-dom/client";
import useGeolocation from "./useGeolocation";
import { GoogleMap, useLoadScript, Marker, MarkerF } from '@react-google-maps/api';
import "./styles.css";


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
    let loc = JSON.stringify(location);
    console.log("look: " + Object.keys(loc));
    if (location.loaded) {
        return (
            JSON.stringify(location));
        // <GoogleMap zoom={10} center={{lat: location.coordinates.lat, lng: location.coordinates.lng}} mapContainerClassName="map-container">
        //     <MarkerF position={{lat: location.coordinates.lat, lng: location.coordinates.lng}} />
        // </GoogleMap>);
    }
    else if ((location.loaded && location.error !== null)) {
        return (
            <div>User denied location permission</div>
        )
    }
    else {
        return(
            <div> Location data are not available</div>
        )
    }
}

export default Tracker;
