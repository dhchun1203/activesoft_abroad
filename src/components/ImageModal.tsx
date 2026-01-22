import { useEffect, useRef, useCallback, memo, FC, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import '../styles/ImageModal.css';

interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, imageSrc, imageAlt, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // 스크롤 방지
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleModalClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  if (!isOpen) return null;

  const modalContent = (
    <>
      <div className="image-modal-overlay" onClick={handleOverlayClick} />
      <div className="image-modal" ref={modalRef} onClick={handleModalClick}>
        <button
          className="image-modal-close"
          onClick={onClose}
          aria-label="닫기"
          title="닫기"
        >
          ×
        </button>
        <div className="image-modal-content">
          <img
            ref={imageRef}
            src={imageSrc}
            alt={imageAlt}
            className="image-modal-image"
            loading="eager"
          />
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

const MemoizedImageModal = memo(ImageModal);
MemoizedImageModal.displayName = 'ImageModal';

export default MemoizedImageModal;
