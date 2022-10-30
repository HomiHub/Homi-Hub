import { getAuth } from "firebase/auth";
import { get, ref, update } from "firebase/database";
import { useState } from "react";
import { db } from "../components/firebase";
import useGeolocation from "./useGeolocation";

//Upload location to the first family only for now
function  useUploadLocation() {
    const currentUserUid = getAuth().currentUser.uid;
    const currentLocation = useGeolocation().coordinates;
    const userRef = ref(db, `users/${currentUserUid}`);
    const [userFamilies, setUserFamilies] = useState();
    let tempFams;

    get(userRef).then((snapshot) => {
        tempFams = snapshot.val();
        setUserFamilies(Object.keys(tempFams.families)[0]);
    });

    if(userFamilies !== null) {
        let locationsRef = ref(db, `families/${userFamilies}/locations/${currentUserUid}`);
        update(locationsRef, {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng
        });
    }else(console.log('useFamilies is still null'));

    return currentLocation;

}

export default useUploadLocation;