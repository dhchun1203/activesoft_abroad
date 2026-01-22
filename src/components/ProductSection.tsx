import { useState, useCallback, memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ImageModal from './ImageModal';
import '../styles/ProductSection.css';

// 상수는 컴포넌트 외부로 이동
const PRODUCT_IMAGES = [
  import.meta.env.BASE_URL + 'images/productivity-infographic.png',
  import.meta.env.BASE_URL + 'images/architecture-diagram.png',
  'https://via.placeholder.com/800x500/FF6B6B/FFFFFF?text=Product+Image+3',
  'https://via.placeholder.com/800x500/FFD93D/000000?text=Product+Image+4',
  'https://via.placeholder.com/800x500/9B59B6/FFFFFF?text=Product+Image+5',
] as const;

const ProductSection: FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ triggerOnce: true });
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  const handleImageSelect = useCallback((index: number) => {
    setSelectedImage(index);
  }, []);

  const handleMainImageClick = useCallback(() => {
    setIsImageModalOpen(true);
  }, []);

  const handleImageModalClose = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);

  return (
    <section id="products" className="product-section">
      <div className="product-container">
        <div ref={titleRef} className={`scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('products.title')}</h2>
          <p className="section-subtitle">{t('products.subtitle')}</p>
        </div>
        
        <div ref={galleryRef} className={`product-gallery scroll-fade-up ${galleryVisible ? 'visible' : ''}`}>
          <div className="main-image-container">
            <img
              src={PRODUCT_IMAGES[selectedImage]}
              alt={`Product ${selectedImage + 1}`}
              className="main-image"
              loading="eager"
              onClick={handleMainImageClick}
              style={{ cursor: 'pointer' }}
            />
          </div>
          
          <div className="thumbnail-list">
            {PRODUCT_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`thumbnail-item ${selectedImage === index ? 'active' : ''}`}
                onClick={() => handleImageSelect(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="thumbnail-image"
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ImageModal
        isOpen={isImageModalOpen}
        imageSrc={PRODUCT_IMAGES[selectedImage]}
        imageAlt={`Product ${selectedImage + 1}`}
        onClose={handleImageModalClose}
      />
    </section>
  );
};

const MemoizedProductSection = memo(ProductSection);
MemoizedProductSection.displayName = 'ProductSection';

export default MemoizedProductSection;

