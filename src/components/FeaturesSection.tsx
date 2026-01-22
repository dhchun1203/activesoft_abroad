import { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/FeaturesSection.css';

// 상수는 컴포넌트 외부로 이동
const FEATURES = [
  { key: 'feature1', icon: '💻' },
  { key: 'feature2', icon: '🌐' },
  { key: 'feature3', icon: '♿' },
  { key: 'feature4', icon: '🔄' },
  { key: 'feature5', icon: '📝' },
  { key: 'feature6', icon: '🛠️' },
  { key: 'feature7', icon: '🔗' },
  { key: 'feature8', icon: '🔒' },
  { key: 'feature9', icon: '⚡' },
  { key: 'feature10', icon: '📊' },
  { key: 'feature11', icon: '🐛' },
  { key: 'feature12', icon: '🚀' },
  { key: 'feature13', icon: '📋' },
] as const;

const FeaturesSection: FC = () => {
  const { t } = useTranslation();
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ triggerOnce: true });
  const { elementRef: listRef, isVisible: listVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="features" className="features-section">
      <div className="features-container">
        <div ref={titleRef} className={`scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('features.title')}</h2>
          <p className="section-subtitle">{t('features.subtitle')}</p>
        </div>
        
        <div ref={listRef} className={`features-list scroll-fade-up ${listVisible ? 'visible' : ''}`}>
          {FEATURES.map((feature, index) => (
            <div key={feature.key} className="feature-item" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="feature-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="feature-icon-wrapper">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <div className="feature-content">
                <h3 className="feature-title">{t(`features.${feature.key}.title`)}</h3>
                <p className="feature-description">
                  {t(`features.${feature.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MemoizedFeaturesSection = memo(FeaturesSection);
MemoizedFeaturesSection.displayName = 'FeaturesSection';

export default MemoizedFeaturesSection;

