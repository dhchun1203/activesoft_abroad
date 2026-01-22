import { useState, useCallback, memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ImageModal from './ImageModal';
import '../styles/ProductSection.css';

// 상수는 컴포넌트 외부로 이동
const PRODUCT_CATEGORIES = ['category1', 'category2', 'category3', 'category4', 'category5'] as const;

const PRODUCT_IMAGES: Record<string, string[]> = {
  category1: [
    import.meta.env.BASE_URL + 'images/productivity-infographic.png',
    import.meta.env.BASE_URL + 'images/architecture-diagram.png',
  ],
  category2: [
    'https://via.placeholder.com/800x500/FF6B6B/FFFFFF?text=Category+2+Image+1',
    'https://via.placeholder.com/800x500/FF6B6B/FFFFFF?text=Category+2+Image+2',
  ],
  category3: [
    'https://via.placeholder.com/800x500/FFD93D/000000?text=Category+3+Image+1',
    'https://via.placeholder.com/800x500/FFD93D/000000?text=Category+3+Image+2',
  ],
  category4: [
    'https://via.placeholder.com/800x500/9B59B6/FFFFFF?text=Category+4+Image+1',
    'https://via.placeholder.com/800x500/9B59B6/FFFFFF?text=Category+4+Image+2',
  ],
  category5: [
    'https://via.placeholder.com/800x500/3498DB/FFFFFF?text=Category+5+Image+1',
    'https://via.placeholder.com/800x500/3498DB/FFFFFF?text=Category+5+Image+2',
  ],
};


const ProductSection: FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>(PRODUCT_CATEGORIES[0]);
  const [selectedImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ triggerOnce: true });
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  const currentImages = PRODUCT_IMAGES[activeTab] || [];

  const handleTabChange = useCallback((category: string) => {
    setActiveTab(category);
  }, []);

  const handleMainImageClick = useCallback(() => {
    if (currentImages.length > 0) {
      setIsImageModalOpen(true);
    }
  }, [currentImages]);

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
        
        <div className="product-tabs-container">
          <div className="product-tabs">
            {PRODUCT_CATEGORIES.map((category) => (
              <button
                key={category}
                className={`product-tab ${activeTab === category ? 'active' : ''}`}
                onClick={() => handleTabChange(category)}
              >
                {t(`products.categories.${category}`)}
              </button>
            ))}
          </div>
        </div>
        
        <div ref={galleryRef} className={`product-gallery scroll-fade-up ${galleryVisible ? 'visible' : ''}`}>
          {currentImages.length > 0 && (
            <div className="product-gallery-content" key={activeTab}>
              <div className="product-description">
                <h3 className="product-description-title">
                  {t(`products.descriptions.${activeTab}.title`)}
                </h3>
                <p className="product-description-text">
                  {t(`products.descriptions.${activeTab}.description`)}
                </p>
              </div>
              <div className="main-image-container">
                <img
                  src={currentImages[selectedImage]}
                  alt={`${t(`products.categories.${activeTab}`)} ${selectedImage + 1}`}
                  className="main-image"
                  loading="eager"
                  onClick={handleMainImageClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {currentImages.length > 0 && (
        <ImageModal
          isOpen={isImageModalOpen}
          imageSrc={currentImages[selectedImage]}
          imageAlt={`${t(`products.categories.${activeTab}`)} ${selectedImage + 1}`}
          onClose={handleImageModalClose}
        />
      )}
    </section>
  );
};

const MemoizedProductSection = memo(ProductSection);
MemoizedProductSection.displayName = 'ProductSection';

export default MemoizedProductSection;

