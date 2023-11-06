

import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './ImageGallery.css';


import image1 from '../../assets/image-1.webp';
import image2 from '../../assets/image-2.webp';
import image3 from '../../assets/image-3.webp';
import image4 from '../../assets/image-4.webp';
import image5 from '../../assets/image-5.webp';
import image6 from '../../assets/image-6.webp';
import image7 from '../../assets/image-7.webp';
import image8 from '../../assets/image-8.webp';
import image9 from '../../assets/image-9.webp';
import image10 from '../../assets/image-10.jpeg';
import image11 from '../../assets/image-11.jpeg';

const ImageGallery = () => {
  const [images, setImages] = useState([
    { id: uuid(), src: image1 },
    { id: uuid(), src: image2 },
    { id: uuid(), src: image3 },
    { id: uuid(), src: image4 },
    { id: uuid(), src: image5 },
    { id: uuid(), src: image6 },
    { id: uuid(), src: image7 },
    { id: uuid(), src: image8 },
    { id: uuid(), src: image9 },
    { id: uuid(), src: image10 },
    { id: uuid(), src: image11 },

  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(images.length > 0 ? images[0].id : null);

  const handleReorder = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...images];
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setImages(reorderedImages);
  };

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  const deleteImages = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
    if (updatedImages.length > 0) {
      setFeaturedImage(updatedImages[0].id);
    } else {
      setFeaturedImage(null);
    }
  };

  return (
    <div className="gallery">

      <div className='selected-images-info'>
        <div>
          {selectedImages.length > 0 ? (
            <div>
              <div className="selected-images-count">
                <span className='checkbox-like'></span> {selectedImages.length} {selectedImages.length === 1 ? 'File' : 'Files'} Selected
              </div>
            </div>
          ) : <p className='gallery-text'>Gallery</p>}
        </div>
        <div>
          {selectedImages.length > 0 ? (
            <div className="delete-button">
              <p onClick={deleteImages}>Delete {selectedImages.length === 1 ? 'File' : 'Files'}</p>
            </div>
          ) : null}
        </div>
      </div>
      <div className="horizantal"></div>

      <DragDropContext onDragEnd={handleReorder}>

        <Droppable droppableId="image-gallery" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="image-grid">
              {images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`image ${selectedImages.includes(image.id) ? 'selected' : ''} ${image.id === featuredImage ? 'featured' : ''
                        }`}
                    >
                      <div className="image-overlay">
                        <div className="controls">
                          <input
                            type="checkbox"
                            label="Select"
                            checked={selectedImages.includes(image.id)}
                            onChange={() => toggleImageSelection(image.id)}
                          />
                        </div>
                      </div>
                      <div className="image-content">
                        <img variant="top" src={image.src} alt={`Image ${index + 1}`} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              <div className="addImage"></div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div>
        {images.length === 0 ? (
          <div className="no-image-message">There is no image.</div>
        ) : null}
      </div>
    </div>
  );
};


export default ImageGallery;
