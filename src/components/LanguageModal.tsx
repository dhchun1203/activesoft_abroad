import { useEffect, useRef, useState, useCallback, memo, CSSProperties, MouseEvent, FC } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageModal.css';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 상수는 컴포넌트 외부로 이동
const LANGUAGES = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
] as const;

const LanguageModal: FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const { i18n, t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const [modalStyle, setModalStyle] = useState<CSSProperties>({});

  const changeLanguage = useCallback((langCode: string) => {
    i18n.changeLanguage(langCode);
    document.documentElement.lang = langCode;
    onClose();
  }, [i18n, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    let adjustTimer: ReturnType<typeof setTimeout> | null = null;

    if (isOpen) {
      // 현재 스크롤 위치 저장
      scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
      
      // overflow hidden만 사용하여 body 스크롤 방지
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      document.addEventListener('keydown', handleEscape);
      
      // 초기에는 기본 중앙 위치로 스타일 리셋
      setModalStyle({});
      
      // 모달이 렌더링되고 애니메이션이 완료된 후 위치 조정
      // 애니메이션이 완료될 때까지 더 긴 지연 시간 사용
      adjustTimer = setTimeout(() => {
        if (modalRef.current && isOpen) {
          const rect = modalRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          let needsAdjustment = false;
          let newTop = rect.top + rect.height / 2;
          let newTransform = 'translate(-50%, -50%)';
          
          // 모달이 상단에서 잘릴 경우 체크
          if (rect.top < 20) {
            newTop = 20 + rect.height / 2;
            needsAdjustment = true;
          }
          // 모달이 하단에서 잘릴 경우 체크
          else if (rect.bottom > viewportHeight - 20) {
            newTop = Math.max(20 + rect.height / 2, viewportHeight - rect.height / 2 - 20);
            needsAdjustment = true;
          }
          
          // 필요할 때만 조정하고 부드러운 전환 사용
          if (needsAdjustment && modalRef.current && isOpen) {
            modalRef.current.style.transition = 'top 0.15s ease-out, transform 0.15s ease-out';
            setModalStyle({
              top: `${newTop}px`,
              transform: newTransform,
            });
          }
        }
      }, 300); // 애니메이션 완료 대기 (300ms)
    } else {
      // 모달이 닫힐 때 스타일 리셋
      setModalStyle({});
      
      // 모달이 닫힐 때 body 스크롤 복원 보장
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      
      // 타이머가 존재하면 정리
      if (adjustTimer) {
        clearTimeout(adjustTimer);
      }
      
      // cleanup 시 항상 body 스크롤 복원
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
      <div className="language-modal-overlay" onClick={handleOverlayClick} />
      <div 
        className="language-modal" 
        ref={modalRef}
        style={modalStyle}
        onClick={handleModalClick}
      >
        <div className="language-modal-header">
          <h3 className="language-modal-title">{t('language')}</h3>
          <button className="language-modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="language-modal-content">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="language-check">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

const MemoizedLanguageModal = memo(LanguageModal);
MemoizedLanguageModal.displayName = 'LanguageModal';

export default MemoizedLanguageModal;

