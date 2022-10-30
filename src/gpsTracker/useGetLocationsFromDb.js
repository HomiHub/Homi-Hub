import { getAuth } from "firebase/auth";
import { get, onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../components/firebase";

const useGetLocationsFromDb = () => {
    const currentUserUid = getAuth().currentUser.uid;
    const userRef = ref(db, `users/${currentUserUid}`);
    const [userFamilies, setUserFamilies] = useState(null);
    const [famLocations, setFamLocations] = useState(null);

    async function updatefamilies() {
        await setUserFamilies(Object.keys(userdata.families)[0]);
        
    }

    function updateFamLocations() {
        setFamLocations(locationdata);
    }

    let userdata;
    let locationdata;
    useEffect(() => {
        get(userRef).then((snapshot) => {
            userdata = snapshot.val();
            updatefamilies();
        });
    },[]);

    useEffect(() => {
        if(userFamilies !== null) {
            const locationsRef = ref(db, `families/${userFamilies}/locations`);
            onValue(locationsRef, (snapshot) => {
                if(snapshot.exists){
                    locationdata = snapshot.val();
                    updateFamLocations();
                } else {
                    console.log("snapshot is empty");
                }
            })
        }
    },[userFamilies])

    return famLocations;

}


export default useGetLocationsFromDb;