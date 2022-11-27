import React, { useState } from 'react';
import { storage } from "../../components/firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../components/auth";
import ProgressBar from './ProgressBar';

const UploadForm = () => {
    const[file, setFile] = useState(null);
    const[error, setError] = useState(null);
    // const [url, setUrl] = useState(null);

    const types = ['image/png', 'image/jpeg', 'image/jpg'];  // only types of files users can upload

    const authUser = useAuth().user;    // user aunthetication, only auth user can upload
    
    const changeHandler = (e) => {
        if (authUser !== null) {
            // console.log('changed');
            let selected = e.target.files[0];   // selecting first file
            // console.log(selected);

            if (selected && types.includes(selected.type)) { // if a file is selected
                setFile(selected);
                setError('');

                // const imageRef = ref(storage, `syncedGallery/"${selected.name}`);
                
                // uploadBytes(imageRef, selected).then(() => {
                //     console.log("image uploaded");
                //     getDownloadURL(imageRef).then((url) =>
                //         setUrl(url)
                //     );
                // }) 
                
            } else {
                setFile(null);
                // setUrl(null);
                setError('Please select an image file (png, jpeg, or jpg)');
            }
        } else {
            setFile(null);
            // setUrl(null);
            setError('Please register or sign in');
            return null;
        }
    }
    

    return (
        <form>
            <label>
                <input type="file" onChange={changeHandler} />
                <span>+</span>
            </label>
            
            <div className="UPoutput">
                { error && <div className="SGerror"> { error }</div> }
                { file && <div> { file.name } </div> }
                { file && <ProgressBar file={file} setFile={setFile} /> }
            </div>
        </form>
    )
}

export default UploadForm;