import React from "react";
import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';
import "./styles.css";
import { Spinner } from "react-bootstrap";
import useGetLocationsFromDb from "./useGetLocationsFromDb";
import useGetPpFromDb from "./useGetPpFromDb";
import useUploadLocation from "../gpsTracker/uploadLocation";

//works with one family only for now
function Tracker() {
    const[done, setDone] = useState(false);
    function slowDown() {
        setInterval(() => setDone(true), 1000);
    } 

    useUploadLocation();
    let userLocations = useGetLocationsFromDb();
    let profilePictures = useGetPpFromDb();

    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,});
   
    useEffect(() => {
        slowDown();
    }, []);

    if(!isLoaded || userLocations == null || profilePictures == null || !done ) return (
        <div id="spinner-div">
            <Spinner className="spinner-style" animation="border" role="status"></Spinner>
        </div>
        );
    else return (
        <div>
            <GoogleMap zoom={5.25} center={{lat: 35, lng: -99}} mapContainerClassName="map-container">
                { Object.keys(userLocations).map((key) => (
                    <MarkerF key={key} icon={profilePictures.get(key)} position={{lat: userLocations[key].latitude, lng: userLocations[key].longitude}} />
                 ))}
            </GoogleMap>
        </div>
    );
}

export default Tracker;
