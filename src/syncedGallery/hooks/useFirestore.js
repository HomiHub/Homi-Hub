// import { useState, useEffect} from 'react';
// import { firestore, storage } from '../../components/firebase';
// import { collection, query, onSnapshot } from "firebase/firestore";
// import { ref as sRef} from 'firebase/storage';


// const useFirestore = (collections) => {
//   const [docs, setDocs] = useState([]);

//   useEffect(() => {
//     // const collectionRef = sRef(storage, collections);
//     // const collectionRef = collection(firestore, collections)
//     const collectionRef = collection(storage, collections)
//     const q = query(collectionRef);
    
//     const unsubscribe = onSnapshot(q, (snap) => {
//         let documents = [];
//         snap.forEach(doc => {
//             documents.push({...doc.data(), id: doc.location.path});
//         });
//         setDocs(documents);
//     });

//     return() => unsubscribe();
//     // unsub();

//   }, [collections]);

//   return { docs };
// }

// export default useFirestore;

import { useState, useEffect } from "react";
import { firestore } from '../../components/firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const useFirestore = (collections) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const collectionRef = collection(firestore, collections);
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
            const unsubscribe = onSnapshot(q, (snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({ ...doc.data(), id: doc.id });
                });
                setDocs(documents);
            });
        
        return () => unsubscribe();

    }, [collections]);

    return { docs };
}

export default useFirestore;