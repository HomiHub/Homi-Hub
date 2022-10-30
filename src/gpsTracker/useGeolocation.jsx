import { useEffect, useState } from "react";

//works with device location
const useGeolocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", lng: "" },
        errorCode: {}
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }
        });
    };


    const OnError = (error) => {
        setLocation({
            loaded: true,
            errorCode: error.code,
        });
    }

    useEffect( () => {
        if(!("geolocation" in navigator)) {
            OnError({
                code: 0,
                message: "Geolocation is not supported by your browser",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, OnError);
    }, []);

    return location;

};



export default useGeolocation;
