import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageUploader({setImg}) {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 15 * 1024 * 1024) {
            setError('Image size exceeds 15MB');
            setImage(null);
            setImg(null)
        } else {
            setError('');
            setImage(file);
            setImg(file)
        }
    };

  const handleRemoveImage = () => {
        setImg(null)
        setImage(null);
        setError('');
  };

  return (
    <div className="flex_col">
        <div className="centerx mb-3">
            <label className="btn_secondarys">
                <span>
                    <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/25/plus-math.png" alt="plus-math"/>
                </span>
                <span className='centery'>Upload a photo</span>
            <input
                type="file"
                accept="image/*"
                className="d-none"
                onChange={handleImageUpload}
            />
            </label>
        </div>
        {error && <div className="alert centerx alert-danger">{error}</div>}
        {image ? (
            <div className='centerx'>
                <img onClick={handleRemoveImage} className='rotate_45 ' src='/Images/Cancel (1).png' alt="Remove"/>
                <i className='text-muted centerx'>{image.name}</i>
            </div>
        )
        :(
            <div className='center'>
                <i className='text-muted center'>Upload supported file (Max 15MB)</i>
            </div>
        )
        }
    </div>
  );
}

export default ImageUploader;
