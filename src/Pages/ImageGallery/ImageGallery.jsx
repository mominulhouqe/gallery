// import React, { useState } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import './ImageGallery.css';
// import image1 from '../../assets/image-1.webp';
// import image2 from '../../assets/image-2.webp';
// import image3 from '../../assets/image-3.webp';
// import image4 from '../../assets/image-4.webp';
// import image5 from '../../assets/image-5.webp';
// import image6 from '../../assets/image-6.webp';
// import image7 from '../../assets/image-7.webp';

// function ImageGallery() {
//     const [images, setImages] = useState([
//         { id: 'image-1', src: image1, isFeature: false },
//         { id: 'image-2', src: image2, isFeature: false },
//         { id: 'image-3', src: image3, isFeature: false },
//         { id: 'image-4', src: image4, isFeature: false },
//         { id: 'image-5', src: image5, isFeature: false },
//         { id: 'image-6', src: image6, isFeature: false },
//         { id: 'image-7', src: image7, isFeature: false },
//     ]);

//     const [selectedImages, setSelectedImages] = useState([]);
//     const [featureImage, setFeatureImage] = useState(images[0]);
//     const [draggedImage, setDraggedImage] = useState(null);

//     const handleImageDragStart = (imageId) => {
//         if (imageId !== 'image-1') {
//             setDraggedImage(imageId);
//         }
//     };

//     const handleImageDragEnd = (result) => {
//         if (!result.destination) {
//             return;
//         }

//         const reorderedImages = Array.from(images);
//         const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
//         reorderedImages.splice(result.destination.index, 0, reorderedImage);

//         setImages(reorderedImages);
//         setDraggedImage(null);
//     };

//     const handleImageSelection = (imageId) => {
//         if (selectedImages.includes(imageId)) {
//             setSelectedImages(selectedImages.filter((id) => id !== imageId));
//         } else {
//             setSelectedImages([...selectedImages, imageId]);
//         }
//     };

//     const handleDeleteImages = () => {
//         const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
//         setImages(updatedImages);
//         setSelectedImages([]);
//     };

//     const handleSetFeatureImage = (imageId) => {
//         const newFeatureImage = images.find((image) => image.id === imageId);
//         setFeatureImage(newFeatureImage);
//     };

//     return (
//         <div>
//             <DragDropContext onDragEnd={handleImageDragEnd}>
//                 <Droppable droppableId="gallery" direction="horizontal" isDropDisabled={false}>
//                     {(provided) => (
//                         <div
//                             {...provided.droppableProps}
//                             ref={provided.innerRef}
//                             className="gallery"
//                         >
//                             {images.map((image, index) => (
//                                 <Draggable
//                                     key={image.id}
//                                     draggableId={image.id.toString()}
//                                     index={index}
//                                     isDragDisabled={image.id === 'image-1'}
//                                 >
//                                     {(provided, snapshot) => (
//                                         <div
//                                             ref={provided.innerRef}
//                                             {...provided.draggableProps}
//                                             {...provided.dragHandleProps}
//                                             onDragStart={() => handleImageDragStart(image.id)}
//                                             className={`gallery-item ${
//                                                 image === featureImage ? 'feature-image' : ''
//                                             } ${selectedImages.includes(image.id) ? 'selected' : ''
//                                             } ${snapshot.isDragging ? 'is-dragging' : ''}`}
//                                         >
//                                             <img src={image.src} alt={`Image ${image.id}`} />
//                                             <div className="reorder-handle">Drag to reorder</div>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedImages.includes(image.id)}
//                                                 onChange={() => handleImageSelection(image.id)}
//                                             />
//                                             <button onClick={() => handleSetFeatureImage(image.id)}>
//                                                 Set as Feature
//                                             </button>
//                                         </div>
//                                     )}
//                                 </Draggable>
//                             ))}
//                             {provided.placeholder}
//                         </div>
//                     )}
//                 </Droppable>
//             </DragDropContext>
//             <button
//                 onClick={handleDeleteImages}
//                 style={{ display: selectedImages.length === 0 ? 'none' : 'block' }}
//             >
//                 Delete Selected
//             </button>
//             <div>
//                 <p>Selected: {selectedImages.length} images</p>
//                 <p>Total: {images.length} images</p>
//             </div>
//         </div>
//     );
// }

// export default ImageGallery;


// src/components/ImageGallery.js
// src/components/ImageGallery.js


import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import './ImageGallery.css';

import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

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
  const [featuredImage, setFeaturedImage] = useState(images[0].id);

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
  };



  return (
    <div className="gallery">
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
              <div className='addImage'>
                              <h4>hi</h4>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {selectedImages.length > 0 && (
        <div className="delete-button">
          <button onClick={deleteImages}>Delete Selected</button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
