# ActiveSoft 소개 페이지

ActiveSoft 회사 소개를 위한 싱글 페이지 애플리케이션입니다.

## 기능

- 다국어 지원 (한국어, 영어, 중국어, 일본어)
- 다크모드 지원
- 반응형 디자인
- 현대적인 UI/UX

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProductSection.tsx
│   ├── FeaturesSection.tsx
│   └── ContactSection.tsx
├── contexts/            # React Context
│   └── DarkModeContext.tsx
├── i18n/               # 다국어 설정
│   ├── config.ts
│   └── locales/
│       ├── ko.json
│       ├── en.json
│       ├── zh.json
│       └── ja.json
├── styles/             # CSS 스타일
│   ├── index.css
│   ├── App.css
│   ├── Header.css
│   ├── HeroSection.css
│   ├── ProductSection.css
│   ├── FeaturesSection.css
│   └── ContactSection.css
├── App.tsx
└── main.tsx
```

## 기술 스택

- React 18
- TypeScript
- Vite
- react-i18next (다국어)
- CSS (다크모드 지원)
