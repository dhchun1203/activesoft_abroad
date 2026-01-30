# ActiveSoft 소개 페이지

ActiveSoft 회사 소개를 위한 싱글 페이지 애플리케이션입니다. 제품 탭 기반의 미디어(이미지/비디오) 소개, 다국어, 다크모드, 반응형 UI를 포함합니다. Contact 폼은 메일 클라이언트 연동 방식으로 동작하며, 안내 UI를 제공합니다.

## 기능

- 다국어 지원 (한국어, 영어, 중국어, 일본어)
- 다크모드 지원
- 반응형 디자인
- 현대적인 UI/UX
- 제품 소개 탭(7개) 및 미디어 갤러리
  - 이미지/비디오 혼합 지원
  - 썸네일 네비게이션
  - JavaScript Library Integration: 이미지 슬라이드(오른쪽→왼쪽, 4초 간격)
- Contact 폼: 메일 클라이언트 연동 안내 및 번역 지원

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

## 배포

- `npm run build` 결과물(`dist/`)을 Tomcat `webapps/ROOT`로 업로드하여 서비스합니다.
- `vite.config.ts`의 `base` 값으로 정적 리소스 경로가 결정됩니다.
