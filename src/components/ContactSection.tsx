import { useState, useCallback, memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import '../styles/ContactSection.css';

// 상수는 컴포넌트 외부로 이동
const LANG_MAP: { [key: string]: string } = {
  'en': 'en',
  'zh': 'zh',
  'ja': 'ja',
} as const;

const EMAIL_TO = 'support@activesoft.co.kr';

const ContactSection: FC = () => {
  const { t, i18n } = useTranslation();
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation({ triggerOnce: true });
  const { elementRef: formWrapperRef, isVisible: formVisible } = useScrollAnimation({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const translateToKorean = useCallback(async (text: string, sourceLang: string): Promise<string> => {
    if (sourceLang === 'ko') return text;
    
    try {
      const sourceCode = LANG_MAP[sourceLang] || 'en';
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceCode}|ko`
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.responseData?.translatedText) {
          return data.responseData.translatedText;
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
    
    return text;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentLang = i18n.language || 'en';
    const isKorean = currentLang === 'ko';
    const subject = encodeURIComponent(`[문의사항] ${formData.name}님의 문의`);
    
    let body = `이름: ${formData.name}\n이메일: ${formData.email}\n\n`;
    
    if (!isKorean && formData.message.trim()) {
      body += `[원문 - ${currentLang.toUpperCase()}]\n${formData.message}\n\n`;
      try {
        const translatedMessage = await translateToKorean(formData.message, currentLang);
        body += `[한국어 번역]\n${translatedMessage}`;
      } catch (error) {
        body += `메시지:\n${formData.message}`;
      }
    } else {
      body += `메시지:\n${formData.message}`;
    }
    
    const mailtoLink = `mailto:${EMAIL_TO}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      alert(t('contact.successMessage') || '이메일 클라이언트가 열렸습니다. 전송 버튼을 눌러주세요.');
      setFormData({ name: '', email: '', message: '' });
    }, 100);
  }, [formData, i18n.language, translateToKorean, t]);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div ref={titleRef} className={`scroll-fade-up ${titleVisible ? 'visible' : ''}`}>
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
        
        <div ref={formWrapperRef} className={`scroll-fade-up ${formVisible ? 'visible' : ''}`}>
          <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{t('contact.name')}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact.namePlaceholder')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">{t('contact.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact.emailPlaceholder')}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">{t('contact.message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t('contact.messagePlaceholder')}
              rows={5}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">
            {t('contact.submit')}
          </button>
        </form>
        </div>
      </div>
    </section>
  );
};

const MemoizedContactSection = memo(ContactSection);
MemoizedContactSection.displayName = 'ContactSection';

export default MemoizedContactSection;

