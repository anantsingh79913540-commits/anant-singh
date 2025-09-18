import React, { useState, useEffect } from 'react';

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  // 0: fade, 1: slide, 2: zoom
  const [transitionType, setTransitionType] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        setPreviousIndex(prevIndex);
        const nextIndex = (prevIndex + 1) % images.length;
        // Cycle through 3 transition types: 0 for fade, 1 for slide, 2 for zoom
        setTransitionType(nextIndex % 3);
        return nextIndex;
      });
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full h-full max-w-lg max-h-[80vh] shadow-2xl shadow-pink-500/10 rounded-lg overflow-hidden">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isPrevious = index === previousIndex;

          let classes = 'absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-in-out';

          if (isActive) {
            classes += ' opacity-100 z-10'; // Active slide is on top
            switch (transitionType) {
              case 1: // slide in from right
                classes += ' translate-x-0';
                break;
              case 2: // zoom in
                classes += ' scale-100';
                break;
              // case 0 (fade) has no transform
            }
          } else if (isPrevious) {
            classes += ' opacity-0';
             switch (transitionType) {
              case 1: // slide out to left
                classes += ' -translate-x-full';
                break;
              case 2: // zoom out (by scaling up)
                classes += ' scale-125';
                break;
              // case 0 (fade) has no transform
            }
          } else {
            classes += ' opacity-0';
            // Set initial state for other slides to prepare for their entrance.
            switch (transitionType) {
              case 1: // ready to slide in from right
                classes += ' translate-x-full';
                break;
              case 2: // ready to zoom in
                classes += ' scale-75';
                break;
              // case 0 (fade) has no transform
            }
          }

          return (
            <img
              key={image}
              src={image}
              alt={`Slideshow image ${index + 1}`}
              className={classes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Slideshow;
