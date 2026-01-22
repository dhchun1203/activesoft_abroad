import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/App.css';

const Footer: FC = () => {
  const { t } = useTranslation();

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <div className="footer-brand">
            <h3 className="footer-logo">ActiveSoft</h3>
            <p className="footer-description">{t('footer.description')}</p>
          </div>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">{t('footer.quickLinks')}</h4>
          <ul className="footer-links">
            <li>
              <a href="#hero" onClick={(e) => handleLinkClick(e, 'hero')}>
                <span className="footer-link-icon">→</span>
                {t('nav.home')}
              </a>
            </li>
            <li>
              <a href="#products" onClick={(e) => handleLinkClick(e, 'products')}>
                <span className="footer-link-icon">→</span>
                {t('nav.products')}
              </a>
            </li>
            <li>
              <a href="#features" onClick={(e) => handleLinkClick(e, 'features')}>
                <span className="footer-link-icon">→</span>
                {t('nav.features')}
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>
                <span className="footer-link-icon">→</span>
                {t('nav.contact')}
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="footer-title">{t('footer.contact')}</h4>
          <ul className="footer-contact">
            <li>
              <span className="footer-contact-icon">✉</span>
              <a href="mailto:support@activesoft.co.kr">support@activesoft.co.kr</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p>&copy; 2026 ActiveSoft. All rights reserved.</p>
      </div>
    </footer>
  );
};

const MemoizedFooter = memo(Footer);
MemoizedFooter.displayName = 'Footer';

export default MemoizedFooter;
