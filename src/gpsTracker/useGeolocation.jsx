//NOT USED ANYMORE 
//LEFT AS A REFERENCE TO GETTING LOCATION PERRMISSION FROM THE USER.




import { Data } from "@react-google-maps/api";
import { get, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import {db} from "../components/firebase";


// function useGetLocationFromDb () {

//     const [location, setLocation] = useState({
//         loaded: false,
//         lat: "",
//         lng: ""
//     });

//     useEffect(() => {
        
//     });

//     setLocation({
//         loaded: true,
//         lat: data.location.lat,
//         lng: data.location.lng,
//     // });
//     // console.log(location);

//     const myRef = ref(db, 'testUser');
//     let data;
//     onValue(myRef, (snapshot) => {
//         data = snapshot.val();
//         console.log(data.location);
//         return data.location;
//     } );
// }


//works with device location
// const useGeolocation = () => {
//     const [location, setLocation] = useState({
//         loaded: false,
//         coordinates: {lat: "", lng: "" },
//         errorCode: {}
//     });

//     const onSuccess = (location) => {
//         setLocation({
//             loaded: true,
//             coordinates: {
//                 lat: 35,
//                 lng: location.coords.longitude,
//             }
//         });
//     };


//     const OnError = (error) => {
//         setLocation({
//             loaded: true,
//             errorCode: error.code,
//         });
//     }


//     useEffect( () => {
//         if(!("geolocation" in navigator)) {
//             OnError({
//                 code: 0,
//                 message: "Geolocation is not supported by your browser",
//             });
//         }

//         navigator.geolocation.getCurrentPosition(onSuccess, OnError);
//     }, []);

//     return location;

// };



// const useGeolocation = () => {

//     const [location, setLocation] = useState({
//         lat: 10,
//         lng: 10,
//     });
//     // var location = {
//     //     lat: 10,
//     //     lng: 10,
//     // };

//     const myRef = ref(db, 'testUser');
//     function fetchLocation() {
//         get(myRef).then((snapshot) => {
//             if(snapshot.exists()) {
//                 console.log("snapshot exists"+ JSON.stringify(snapshot.val()));
//                 setLocation(
//                     location.lat = snapshot.val().lat,
//                     location.lng = snapshot.val().lng,
//                 );
//                 console.log("fetched location " + JSON.stringify(location));
//             } else {
//                 console.log("No data available");
//             }
//         } ).catch((error) => {
//             console.error(error);
//         } );
//     }
//     setInterval(fetchLocation, 10000);
//     useEffect(() => {
//         console.log('location in use effect', location);
//     }, [location] )
//     console.log("location to be returned: " + JSON.stringify(location));
//     return location;

// };


// export default useGeolocation;
// export {useGetLocationFromDb};