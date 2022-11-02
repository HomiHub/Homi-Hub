import { getAuth } from "firebase/auth";
import { get, ref, update } from "firebase/database";
import { useState } from "react";
import { useAuth } from "../components/auth";
import { db } from "../components/firebase";
import useGeolocation from "./useGeolocation";

//Upload location to the first family only for now
function  useUploadLocation() {
    const authUser = useAuth().user;
    const currentLocation = useGeolocation().coordinates;
    const [userFamilies, setUserFamilies] = useState();
    let tempFams;
    if(authUser !== null) {
        console.log("here ", authUser.uid);
        const currentUserUid = authUser.uid;
        const userRef = ref(db, `users/${currentUserUid}`);
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
    return null;

}

export default useUploadLocation;