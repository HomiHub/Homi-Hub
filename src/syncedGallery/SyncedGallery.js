import React from 'react';
import ImageGrid from './comps/ImageGrid';
import Title from "./comps/Title";
import Modal from './comps/Modal';
import UploadForm from './comps/UploadForm';
import './SyncedGallery.css';

function SyncedGallery() {
    return (
        <div className="SyncedGallery">
            <Title/>
            <UploadForm />
            <ImageGrid />
        </div>
    );
}

export default SyncedGallery;