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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
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

  // 탭 컨테이너 스크롤을 좌측 처음으로 초기화
  useEffect(() => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollLeft = 0;
    }
  }, [activeTab]);

  // 비디오 지연 로딩 - 뷰포트에 들어올 때만 로드
  useEffect(() => {
    if (!videoContainerRef.current || currentMediaItem?.type !== 'video') {
      setShouldLoadVideo(false);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // 뷰포트 50px 전에 미리 로드
        threshold: 0.1,
      }
    );

    observer.observe(videoContainerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [currentMediaItem, activeTab, selectedMedia]);

  // 모바일 감지
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

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
                <div 
                  ref={videoContainerRef}
                  className={`main-image-container ${currentMediaItem.type === 'video' ? 'video-container' : ''}`}
                >
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
                    shouldLoadVideo ? (
                      <video
                        ref={videoRef}
                        src={currentMediaItem.src}
                        className="main-image"
                        controls
                        autoPlay={!isMobile}
                        loop
                        muted
                        playsInline
                        preload={isMobile ? 'metadata' : 'auto'}
                        key={`${activeTab}-${selectedMedia}`}
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="video-placeholder">
                        <div className="video-loading-spinner"></div>
                        <p>{t('products.loading') || 'Loading video...'}</p>
                      </div>
                    )
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

