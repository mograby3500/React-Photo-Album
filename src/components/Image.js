import React from 'react';
import { useParams } from 'react-router-dom';

const Image = ({ urlDict, authorDict }) => {
    let params = useParams();
    const imageId = params.imageId;

    return (
        <div className='image-display'>
            <div className='image-section'>
                <img height="90%" src={urlDict[imageId]} />
            </div>

            <div className='author-section'>
                <p>Author: {authorDict[imageId]}</p>
            </div>

        </div>
    );
};

export default Image;