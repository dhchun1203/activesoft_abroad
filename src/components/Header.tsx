import { useState, useEffect, useMemo, useCallback, memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode } from '../contexts/DarkModeContext';
import LanguageModal from './LanguageModal';
import { throttle } from '../utils/throttle';
import '../styles/Header.css';

// 상수는 컴포넌트 외부로 이동
const MENU_ITEMS = [
  { id: 'hero', key: 'home' },
  { id: 'products', key: 'products' },
  { id: 'features', key: 'features' },
  { id: 'contact', key: 'contact' },
] as const;

const SECTIONS = ['hero', 'products', 'features', 'contact'] as const;

const Header: FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // 활성 섹션을 결정하는 함수 (재사용 가능하도록 분리)
  const determineActiveSection = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollBottom = scrollTop + windowHeight;
    const isNearBottom = scrollBottom >= documentHeight - 50; // 최하단 50px 이내

    let current = 'hero';
    
    // 최하단에 가까우면 Contact 섹션 활성화
    if (isNearBottom) {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        current = 'contact';
      }
    } else {
      // 일반적인 섹션 감지 로직
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTIONS[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          // 섹션이 뷰포트 상단 150px 이내에 있거나, 섹션의 일부가 뷰포트에 보이면 활성화
          if (rect.top <= 150 && rect.bottom > 0) {
            current = SECTIONS[i];
            break;
          }
        }
      }
    }
    
    return current;
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
      // 스크롤 중이 아닐 때만 active 섹션 업데이트
      if (!isScrolling) {
        setActiveSection(determineActiveSection());
      }
    }, 100); // 100ms throttle 적용

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 체크
    return () => window.removeEventListener('scroll', handleScroll);
  }, [determineActiveSection, isScrolling]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // 클릭한 섹션을 즉시 활성화
      setActiveSection(sectionId);
      // 스크롤 시작 플래그 설정
      setIsScrolling(true);
      // 사이드 메뉴 닫기
      setIsSideMenuOpen(false);
      
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // 스크롤 완료 감지: 스크롤이 멈춘 후 정확한 섹션 감지
      let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
      let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;
      
      const checkScrollEnd = () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollDiff = Math.abs(currentScrollTop - lastScrollTop);
        
        // 스크롤이 멈췄는지 확인 (1px 이내 변화)
        if (scrollDiff < 1) {
          // 타이머가 이미 설정되어 있으면 취소
          if (scrollEndTimer) {
            clearTimeout(scrollEndTimer);
          }
          
          // 스크롤이 멈춘 후 200ms 대기 후 정확한 섹션 감지
          scrollEndTimer = setTimeout(() => {
            setIsScrolling(false); // 스크롤 완료 플래그 해제
            const activeSection = determineActiveSection();
            setActiveSection(activeSection);
          }, 200);
        } else {
          // 스크롤이 계속 진행 중이면 타이머 취소하고 계속 체크
          if (scrollEndTimer) {
            clearTimeout(scrollEndTimer);
            scrollEndTimer = null;
          }
          lastScrollTop = currentScrollTop;
          requestAnimationFrame(checkScrollEnd);
        }
      };
      
      // 스크롤 애니메이션 시작 후 체크 시작
      setTimeout(checkScrollEnd, 100);
    }
  }, [determineActiveSection]);

  const handleLogoClick = useCallback(() => {
    scrollToSection('hero');
  }, [scrollToSection]);

  const handleLanguageModalOpen = useCallback(() => {
    setIsLanguageModalOpen(true);
  }, []);

  const handleLanguageModalClose = useCallback(() => {
    setIsLanguageModalOpen(false);
  }, []);

  const handleSideMenuToggle = useCallback(() => {
    setIsSideMenuOpen((prev) => !prev);
  }, []);

  const handleSideMenuClose = useCallback(() => {
    setIsSideMenuOpen(false);
  }, []);

  const globeIconSrc = useMemo(
    () => `${import.meta.env.BASE_URL}images/icons8-지구-24.png`,
    []
  );

  // 사이드 메뉴 열림 시 배경 스크롤 방지
  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideMenuOpen]);

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            ActiveSoft
          </div>
          <nav className="nav">
            <ul className="nav-menu">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                    aria-label={t(`nav.${item.key}`)}
                  >
                    {t(`nav.${item.key}`)}
                  </button>
                </li>
              ))}
            </ul>
            <div className="nav-controls">
              <button
                className="hamburger-button"
                onClick={handleSideMenuToggle}
                aria-label={t('menu')}
                aria-expanded={isSideMenuOpen}
              >
                <span className={`hamburger-icon ${isSideMenuOpen ? 'open' : ''}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <div className="nav-controls-desktop">
                <div className="dark-mode-toggle-container" title={t('darkMode')}>
                  <label className="dark-mode-toggle-label">
                    <input
                      type="checkbox"
                      className="dark-mode-toggle-input"
                      checked={isDarkMode}
                      onChange={toggleDarkMode}
                      aria-label={t('darkMode')}
                    />
                    <span className="dark-mode-toggle-slider">
                      <span className="dark-mode-toggle-icon dark-icon">
                        🌙
                      </span>
                      <span className="dark-mode-toggle-icon light-icon">
                        ☀️
                      </span>
                    </span>
                    <span className="dark-mode-text">{t('darkMode')}</span>
                  </label>
                </div>
                <div className="language-selector">
                  <button
                    className="language-icon-button"
                    onClick={handleLanguageModalOpen}
                    aria-label={t('language')}
                    title={t('language')}
                  >
                    <img
                      src={globeIconSrc}
                      alt={t('language')}
                      className="globe-icon"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* 사이드 메뉴 */}
      <div className={`side-menu-overlay ${isSideMenuOpen ? 'open' : ''}`} onClick={handleSideMenuClose}></div>
      <div className={`side-menu ${isSideMenuOpen ? 'open' : ''}`}>
        <div className="side-menu-header">
          <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            ActiveSoft
          </div>
          <button
            className="side-menu-close"
            onClick={handleSideMenuClose}
            aria-label={t('close')}
          >
            ×
          </button>
        </div>
        <nav className="side-menu-nav">
          <ul className="side-menu-list">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  className={`side-menu-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  aria-label={t(`nav.${item.key}`)}
                >
                  {t(`nav.${item.key}`)}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="side-menu-controls">
          <div className="dark-mode-toggle-container" title={t('darkMode')}>
            <label className="dark-mode-toggle-label">
              <input
                type="checkbox"
                className="dark-mode-toggle-input"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                aria-label={t('darkMode')}
              />
              <span className="dark-mode-toggle-slider">
                <span className="dark-mode-toggle-icon dark-icon">
                  🌙
                </span>
                <span className="dark-mode-toggle-icon light-icon">
                  ☀️
                </span>
              </span>
              <span className="dark-mode-text">{t('darkMode')}</span>
            </label>
          </div>
          <div className="language-selector">
            <button
              className="language-icon-button"
              onClick={handleLanguageModalOpen}
              aria-label={t('language')}
              title={t('language')}
            >
              <img
                src={globeIconSrc}
                alt={t('language')}
                className="globe-icon"
                loading="lazy"
              />
            </button>
          </div>
        </div>
      </div>
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={handleLanguageModalClose}
      />
    </>
  );
};

const MemoizedHeader = memo(Header);
MemoizedHeader.displayName = 'Header';

export default MemoizedHeader;

