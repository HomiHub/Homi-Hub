import { getDownloadURL, ref } from "firebase/storage";
import { list } from "firebase/storage";
import { useEffect, useState } from "react"
import { storage } from "../components/firebase";

function useGetPpFromDb () {
    const imageRef = ref(storage, "/profilePictures");
    const imagesUserUrl = new Map();
    const [imagesUserUrlMap, setimagesUserUrlMap] = useState(null);
    useEffect(() => {
        list(imageRef, { maxResults:100}).then((images) => {
            images.items.map((item) => {
                const key = item._location.path_.slice(17);
                getDownloadURL(item).then((url) => {
                    const value = url;
                    imagesUserUrl.set(key, value);
                })
            });
        });
        setimagesUserUrlMap(imagesUserUrl);
    }, []);

    return imagesUserUrlMap;
}

export default useGetPpFromDb;