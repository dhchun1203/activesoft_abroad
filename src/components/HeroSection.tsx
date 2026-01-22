import { memo, FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/HeroSection.css';

const HeroSection: FC = () => {
  const { t } = useTranslation();

  const handleLearnMoreClick = useCallback(() => {
    const element = document.getElementById('features');
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
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
        <button className="hero-cta" onClick={handleLearnMoreClick}>
          {t('hero.cta')}
        </button>
      </div>
    </section>
  );
};

const MemoizedHeroSection = memo(HeroSection);
MemoizedHeroSection.displayName = 'HeroSection';

export default MemoizedHeroSection;

