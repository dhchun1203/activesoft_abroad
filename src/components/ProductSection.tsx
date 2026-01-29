import { useState, useCallback, memo, FC, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ImageModal from './ImageModal';
import '../styles/ProductSection.css';

// 상수는 컴포넌트 외부로 이동
const PRODUCT_CATEGORIES = [
  'projectManagement',
  'webEditorIntegration',
  'javascriptLibraryIntegration',
  'reportGeneration',
  'googleChartsIntegration',
  'fileUploadDownload',
  'captcha'
] as const;

type MediaType = 'image' | 'video';

interface MediaItem {
  type: MediaType;
  src: string;
}

const PRODUCT_MEDIA: Record<string, MediaItem[]> = {
  projectManagement: [
    {
      type: 'video',
      src: import.meta.env.BASE_URL + 'videos/1.mp4',
    },
  ],
  webEditorIntegration: [
    {
      type: 'video',
      src: import.meta.env.BASE_URL + 'videos/2.mp4',
    },
  ],
  javascriptLibraryIntegration: [
    {
      type: 'image',
      src: import.meta.env.BASE_URL + 'images/3.png',
    },
  ],
  reportGeneration: [
    {
      type: 'video',
      src: import.meta.env.BASE_URL + 'videos/4.mp4',
    },
  ],
  googleChartsIntegration: [
    {
      type: 'image',
      src: 'https://via.placeholder.com/800x500/3498DB/FFFFFF?text=Google+Charts+Integration',
    },
    {
      type: 'image',
      src: 'https://via.placeholder.com/800x500/3498DB/FFFFFF?text=Google+Charts+Integration+2',
    },
  ],
  fileUploadDownload: [
    {
      type: 'video',
      src: import.meta.env.BASE_URL + 'videos/5.mp4',
    },
    {
      type: 'video',
      src: import.meta.env.BASE_URL + 'videos/6.mp4',
    },
  ],
  captcha: [
    {
      type: 'video',
      src: import.meta.env.BASE_URL + 'videos/7.mp4',
    },
  ],
};


const ProductSection: FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>(PRODUCT_CATEGORIES[0]);
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ triggerOnce: true });
  const { elementRef: galleryRef, isVisible: galleryVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });

  const currentMedia = PRODUCT_MEDIA[activeTab] || [];
  const currentMediaItem = currentMedia[selectedMedia];
  const hasMultipleMedia = currentMedia.length > 1;

  // 비디오 전체화면 이벤트 처리
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFullscreenChange = () => {
      // 전체화면 상태 변경 시 필요한 처리
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [currentMediaItem]);

  // 탭 컨테이너 스크롤을 활성 탭이 보이도록 조정 (모바일에서만)
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      // 데스크톱에서는 스크롤을 처음으로
      tabsContainerRef.current.scrollLeft = 0;
      return;
    }

    // 모바일에서는 활성 탭이 보이도록 스크롤 조정
    const activeTabElement = tabsContainerRef.current.querySelector('.product-tab.active') as HTMLElement;
    if (activeTabElement) {
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();
      const scrollLeft = tabsContainerRef.current.scrollLeft;
      
      // 탭이 컨테이너 왼쪽 밖에 있으면
      if (tabRect.left < containerRect.left) {
        const targetScroll = scrollLeft + (tabRect.left - containerRect.left) - 16; // 16px 여백
        tabsContainerRef.current.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: 'smooth'
        });
      }
      // 탭이 컨테이너 오른쪽 밖에 있으면
      else if (tabRect.right > containerRect.right) {
        const targetScroll = scrollLeft + (tabRect.right - containerRect.right) + 16; // 16px 여백
        tabsContainerRef.current.scrollTo({
          left: targetScroll,
          behavior: 'smooth'
        });
      }
    }
  }, [activeTab]);

  const handleTabChange = useCallback((category: string) => {
    setActiveTab(category);
    setSelectedMedia(0); // 탭 변경 시 첫 번째 미디어로 리셋
  }, []);

  const handlePreviousMedia = useCallback(() => {
    setSelectedMedia((prev) => (prev > 0 ? prev - 1 : currentMedia.length - 1));
  }, [currentMedia.length]);

  const handleNextMedia = useCallback(() => {
    setSelectedMedia((prev) => (prev < currentMedia.length - 1 ? prev + 1 : 0));
  }, [currentMedia.length]);

  const handleMediaSelect = useCallback((index: number) => {
    setSelectedMedia(index);
  }, []);

  const handleMainImageClick = useCallback(() => {
    if (currentMediaItem && currentMediaItem.type === 'image') {
      setIsImageModalOpen(true);
    }
  }, [currentMediaItem]);

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
        
        <div className="product-tabs-container" ref={tabsContainerRef}>
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
          <div className="product-gallery-content" key={activeTab}>
            <div className="product-description">
              <h3 className="product-description-title">
                {t(`products.descriptions.${activeTab}.title`)}
              </h3>
              <p className="product-description-text">
                {t(`products.descriptions.${activeTab}.description`)}
              </p>
            </div>
            {currentMediaItem && (
              <div className="media-wrapper">
                <div className={`main-image-container ${currentMediaItem.type === 'video' ? 'video-container' : ''}`}>
                  {hasMultipleMedia && (
                    <button
                      className="media-nav-button media-nav-prev"
                      onClick={handlePreviousMedia}
                      aria-label="Previous media"
                    >
                      ‹
                    </button>
                  )}
                  {currentMediaItem.type === 'video' ? (
                    <video
                      ref={videoRef}
                      src={currentMediaItem.src}
                      className="main-image"
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      key={selectedMedia}
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={currentMediaItem.src}
                      alt={`${t(`products.categories.${activeTab}`)} ${selectedMedia + 1}`}
                      className="main-image"
                      loading="eager"
                      onClick={handleMainImageClick}
                      style={{ cursor: 'pointer' }}
                      key={selectedMedia}
                    />
                  )}
                  {hasMultipleMedia && (
                    <button
                      className="media-nav-button media-nav-next"
                      onClick={handleNextMedia}
                      aria-label="Next media"
                    >
                      ›
                    </button>
                  )}
                </div>
                {hasMultipleMedia && (
                  <div className="media-thumbnails">
                    {currentMedia.map((media, index) => (
                      <button
                        key={index}
                        className={`media-thumbnail ${selectedMedia === index ? 'active' : ''}`}
                        onClick={() => handleMediaSelect(index)}
                        aria-label={`Select media ${index + 1}`}
                      >
                        {media.type === 'video' ? (
                          <video
                            src={media.src}
                            muted
                            playsInline
                            onMouseEnter={(e) => {
                              if (selectedMedia !== index) {
                                e.currentTarget.play();
                              }
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.pause();
                              e.currentTarget.currentTime = 0;
                            }}
                          />
                        ) : (
                          <img
                            src={media.src}
                            alt={`Thumbnail ${index + 1}`}
                            loading="lazy"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {currentMediaItem && currentMediaItem.type === 'image' && (
        <ImageModal
          isOpen={isImageModalOpen}
          imageSrc={currentMediaItem.src}
          imageAlt={`${t(`products.categories.${activeTab}`)} ${selectedMedia + 1}`}
          onClose={handleImageModalClose}
        />
      )}
    </section>
  );
};

const MemoizedProductSection = memo(ProductSection);
MemoizedProductSection.displayName = 'ProductSection';

export default MemoizedProductSection;

