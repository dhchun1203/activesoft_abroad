# 코딩 표준 및 네이밍 규칙

이 문서는 ActiveSoft 프로젝트의 코딩 표준과 네이밍 규칙을 정의합니다. 모든 개발자는 이 규칙을 따라 코드를 작성해야 합니다.

## 목차

1. [일반 원칙](#일반-원칙)
2. [파일 및 폴더 네이밍](#파일-및-폴더-네이밍)
3. [변수 및 상수 네이밍](#변수-및-상수-네이밍)
4. [함수 및 메서드 네이밍](#함수-및-메서드-네이밍)
5. [컴포넌트 네이밍](#컴포넌트-네이밍)
6. [CSS 클래스 네이밍](#css-클래스-네이밍)
7. [타입 및 인터페이스 네이밍](#타입-및-인터페이스-네이밍)
8. [주석 작성 규칙](#주석-작성-규칙)
9. [코드 구조 규칙](#코드-구조-규칙)
10. [성능 최적화 규칙](#성능-최적화-규칙)

---

## 일반 원칙

### 1. 일관성 유지
- 프로젝트 전체에서 동일한 네이밍 규칙을 일관되게 적용합니다.
- 기존 코드와의 일관성을 유지합니다.

### 2. 명확성 우선
- 변수명과 함수명은 그 목적을 명확하게 표현해야 합니다.
- 약어 사용을 최소화하고, 필요시 주석으로 설명합니다.

### 3. 한국어 주석
- 모든 주석은 한국어로 작성합니다.
- 코드 자체는 영어로 작성하되, 주석으로 한국어 설명을 제공합니다.

---

## 파일 및 폴더 네이밍

### 파일 네이밍

#### React 컴포넌트 파일
- **규칙**: `PascalCase.tsx`
- **예시**: 
  - `Header.tsx`
  - `ProductSection.tsx`
  - `LanguageModal.tsx`

#### 유틸리티 파일
- **규칙**: `camelCase.ts`
- **예시**:
  - `throttle.ts`
  - `utils.ts`

#### 훅 파일
- **규칙**: `use` 접두사 + `PascalCase.ts`
- **예시**:
  - `useScrollAnimation.ts`
  - `useDarkMode.ts`

#### 스타일 파일
- **규칙**: 컴포넌트명과 동일한 `PascalCase.css`
- **예시**:
  - `Header.css`
  - `ProductSection.css`

#### 설정 파일
- **규칙**: `camelCase.ts` 또는 `kebab-case.ts`
- **예시**:
  - `vite.config.ts`
  - `tsconfig.json`

### 폴더 네이밍

- **규칙**: `camelCase` 또는 `kebab-case`
- **예시**:
  - `src/components/`
  - `src/utils/`
  - `src/hooks/`
  - `src/styles/`

---

## 변수 및 상수 네이밍

### 일반 변수
- **규칙**: `camelCase`
- **예시**:
  ```typescript
  const userName = 'John';
  const isLoggedIn = true;
  const itemCount = 10;
  ```

### Boolean 변수
- **규칙**: `is`, `has`, `should`, `can` 등의 접두사 사용
- **예시**:
  ```typescript
  const isDarkMode = true;
  const hasPermission = false;
  const shouldRender = true;
  const canEdit = false;
  ```

### 배열 변수
- **규칙**: 복수형 `camelCase` 또는 명확한 복수 의미
- **예시**:
  ```typescript
  const menuItems = [];
  const productList = [];
  const users = [];
  ```

### Ref 변수
- **규칙**: `camelCase` + `Ref` 접미사
- **예시**:
  ```typescript
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollPositionRef = useRef<number>(0);
  ```

### 상수 (컴포넌트 외부)
- **규칙**: `UPPER_SNAKE_CASE`
- **예시**:
  ```typescript
  const MENU_ITEMS = [
    { id: 'home', key: 'home' },
    { id: 'products', key: 'products' },
  ] as const;

  const PRODUCT_IMAGES = [
    '/images/image1.png',
    '/images/image2.png',
  ] as const;

  const EMAIL_TO = 'support@activesoft.co.kr';
  const MAX_RETRY_COUNT = 3;
  ```

### 컴포넌트 내부 상수 (useMemo로 메모이제이션된 값)
- **규칙**: `camelCase` (일반 변수와 동일)
- **예시**:
  ```typescript
  const globeIconSrc = useMemo(
    () => `${import.meta.env.BASE_URL}images/icon.png`,
    []
  );
  ```

---

## 함수 및 메서드 네이밍

### 이벤트 핸들러 함수
- **규칙**: `handle` 접두사 + `PascalCase`
- **예시**:
  ```typescript
  const handleClick = () => {};
  const handleSubmit = (e: React.FormEvent) => {};
  const handleImageSelect = (index: number) => {};
  const handleLanguageModalOpen = () => {};
  const handleLanguageModalClose = () => {};
  ```

### 일반 함수
- **규칙**: 동사로 시작하는 `camelCase`
- **예시**:
  ```typescript
  const scrollToSection = (sectionId: string) => {};
  const changeLanguage = (langCode: string) => {};
  const translateToKorean = (text: string) => {};
  const updateScrollProgress = () => {};
  ```

### 비동기 함수
- **규칙**: 동사로 시작하는 `camelCase` (이벤트 핸들러는 `handle` 접두사 사용)
- **예시**:
  ```typescript
  const fetchUserData = async () => {};
  const handleSubmit = async (e: React.FormEvent) => {};
  ```

### 유틸리티 함수
- **규칙**: 동사로 시작하는 `camelCase` 또는 명사형 `camelCase`
- **예시**:
  ```typescript
  export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ) => {};
  ```

---

## 컴포넌트 네이밍

### 컴포넌트 선언
- **규칙**: `PascalCase` + `FC` 타입
- **예시**:
  ```typescript
  const Header: FC = () => {
    // ...
  };
  
  const ProductSection: FC = () => {
    // ...
  };
  
  interface LanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const LanguageModal: FC<LanguageModalProps> = ({ isOpen, onClose }) => {
    // ...
  };
  ```

### 메모이제이션된 컴포넌트
- **규칙**: `Memoized` 접두사 + 원본 컴포넌트명
- **예시**:
  ```typescript
  const MemoizedHeader = memo(Header);
  MemoizedHeader.displayName = 'Header';
  
  export default MemoizedHeader;
  ```

### 컴포넌트 displayName
- **규칙**: 원본 컴포넌트명과 동일한 `PascalCase`
- **예시**:
  ```typescript
  MemoizedHeader.displayName = 'Header';
  MemoizedProductSection.displayName = 'ProductSection';
  ```

---

## CSS 클래스 네이밍

### 기본 규칙
- **규칙**: `kebab-case`
- **예시**:
  ```css
  .header-container {}
  .nav-menu {}
  .language-modal-overlay {}
  .scroll-progress-bar {}
  ```

### BEM 스타일 (선택적)
- **규칙**: Block__Element--Modifier 형식 사용 가능
- **예시**:
  ```css
  .header {}
  .header__container {}
  .header__nav {}
  .header__nav--scrolled {}
  ```

### 현재 프로젝트 스타일
- **규칙**: 컴포넌트명-요소명 형식의 `kebab-case`
- **예시**:
  ```css
  .header {}
  .header-container {}
  .header.scrolled {}
  .language-modal {}
  .language-modal-overlay {}
  .language-modal-header {}
  .language-modal-title {}
  ```

---

## 타입 및 인터페이스 네이밍

### 인터페이스
- **규칙**: `PascalCase` + `Props` 또는 명확한 의미
- **예시**:
  ```typescript
  interface LanguageModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  interface ScrollAnimatedSectionProps {
    children: ReactNode;
    className?: string;
    animationType?: 'fadeUp' | 'fadeIn';
  }
  
  interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
  }
  ```

### 타입 별칭 (Type Alias)
- **규칙**: `PascalCase`
- **예시**:
  ```typescript
  type UseScrollAnimationOptions = {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  };
  ```

---

## 주석 작성 규칙

### 일반 원칙
- 모든 주석은 **한국어**로 작성합니다.
- 코드의 의도와 목적을 명확하게 설명합니다.
- 복잡한 로직에는 상세한 설명을 추가합니다.

### 주석 스타일

#### 단일 라인 주석
```typescript
// 상수는 컴포넌트 외부로 이동
const MENU_ITEMS = [];

// 스크롤 위치에 따라 활성 섹션 결정
let current = 'hero';

// 100ms throttle 적용
}, 100);
```

#### 블록 주석 (복잡한 로직)
```typescript
/**
 * 모달 위치를 동적으로 조정합니다.
 * 뷰포트 경계를 벗어나지 않도록 합니다.
 */
if (needsAdjustment && modalRef.current && isOpen) {
  // ...
}
```

#### 함수 주석
```typescript
/**
 * 스크롤 이벤트를 throttle하여 성능을 최적화합니다.
 * @param callback - 실행할 콜백 함수
 * @param limit - throttle 시간(ms)
 */
const handleScroll = throttle(() => {
  // ...
}, 100);
```

### 주석 작성 가이드라인

1. **의미 있는 주석 작성**: 코드만 봐도 알 수 있는 내용은 주석으로 작성하지 않습니다.
   ```typescript
   // ❌ 나쁜 예
   const count = 0; // count를 0으로 설정
  
   // ✅ 좋은 예
   const count = 0; // 초기 카운트 값
   ```

2. **TODO 주석**: 향후 개선 사항은 TODO로 표시합니다.
   ```typescript
   // TODO: 에러 처리 로직 추가 필요
   // TODO: 성능 최적화 필요
   ```

3. **복잡한 로직 설명**: 복잡한 알고리즘이나 비즈니스 로직은 상세히 설명합니다.
   ```typescript
   // 스크롤 위치에 따라 활성 섹션 결정
   // 하단부터 역순으로 체크하여 가장 위에 있는 섹션을 활성화
   for (let i = SECTIONS.length - 1; i >= 0; i--) {
     // ...
   }
   ```

---

## 코드 구조 규칙

### 1. Import 순서
```typescript
// 1. React 및 React 관련 라이브러리
import { useState, useEffect, useCallback, memo, FC } from 'react';
import { createPortal } from 'react-dom';

// 2. 서드파티 라이브러리
import { useTranslation } from 'react-i18next';

// 3. 프로젝트 내부 모듈 (상대 경로)
import { useDarkMode } from '../contexts/DarkModeContext';
import { throttle } from '../utils/throttle';
import LanguageModal from './LanguageModal';

// 4. 스타일 파일
import '../styles/Header.css';
```

### 2. 컴포넌트 구조
```typescript
// 1. 상수 정의 (컴포넌트 외부)
const MENU_ITEMS = [] as const;

// 2. 인터페이스/타입 정의
interface ComponentProps {
  // ...
}

// 3. 컴포넌트 선언
const Component: FC<ComponentProps> = ({ prop1, prop2 }) => {
  // 3-1. Hooks
  const [state, setState] = useState();
  const { data } = useCustomHook();
  
  // 3-2. useMemo, useCallback
  const memoizedValue = useMemo(() => {}, []);
  const handleClick = useCallback(() => {}, []);
  
  // 3-3. useEffect
  useEffect(() => {
    // ...
  }, []);
  
  // 3-4. Early return
  if (!isVisible) return null;
  
  // 3-5. JSX 반환
  return (
    // ...
  );
};

// 4. 메모이제이션 및 export
const MemoizedComponent = memo(Component);
MemoizedComponent.displayName = 'Component';
export default MemoizedComponent;
```

### 3. 상수 위치
- **컴포넌트 외부 상수**: 컴포넌트 외부에 `UPPER_SNAKE_CASE`로 정의
- **컴포넌트 내부 상수**: `useMemo`로 메모이제이션된 값은 컴포넌트 내부에 `camelCase`로 정의

```typescript
// ✅ 컴포넌트 외부 - UPPER_SNAKE_CASE
const MENU_ITEMS = [] as const;
const PRODUCT_IMAGES = [] as const;

const Component: FC = () => {
  // ✅ 컴포넌트 내부 - useMemo로 메모이제이션
  const globeIconSrc = useMemo(
    () => `${import.meta.env.BASE_URL}images/icon.png`,
    []
  );
  
  return <img src={globeIconSrc} />;
};
```

---

## 성능 최적화 규칙

### 1. React.memo 사용
- 모든 주요 컴포넌트에 `React.memo` 적용
- Props가 변경되지 않으면 리렌더링 방지

```typescript
const Component: FC = () => {
  // ...
};

const MemoizedComponent = memo(Component);
MemoizedComponent.displayName = 'Component';
export default MemoizedComponent;
```

### 2. useCallback 사용
- 이벤트 핸들러와 함수를 메모이제이션
- 의존성 배열을 정확히 지정

```typescript
const handleClick = useCallback(() => {
  // ...
}, [dependency1, dependency2]);
```

### 3. useMemo 사용
- 계산 비용이 큰 값 메모이제이션
- 의존성 배열을 정확히 지정

```typescript
const expensiveValue = useMemo(() => {
  // 복잡한 계산
  return result;
}, [dependency1, dependency2]);
```

### 4. 상수 최적화
- 컴포넌트 외부로 상수 이동하여 재생성 방지

```typescript
// ✅ 좋은 예 - 컴포넌트 외부
const MENU_ITEMS = [] as const;

const Component: FC = () => {
  return MENU_ITEMS.map(/* ... */);
};

// ❌ 나쁜 예 - 컴포넌트 내부 (매 렌더링마다 재생성)
const Component: FC = () => {
  const menuItems = []; // 재생성됨
  return menuItems.map(/* ... */);
};
```

### 5. 이미지 로딩 최적화
- 중요한 이미지는 `loading="eager"`
- 나머지는 `loading="lazy"`

```typescript
// 메인 이미지 - 즉시 로드
<img src={image} loading="eager" />

// 썸네일 - 지연 로드
<img src={image} loading="lazy" />
```

---

## 예제: 완전한 컴포넌트 구조

```typescript
import { useState, useEffect, useCallback, memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Component.css';

// 상수는 컴포넌트 외부로 이동
const MENU_ITEMS = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
] as const;

interface ComponentProps {
  title: string;
  onClose: () => void;
}

const Component: FC<ComponentProps> = ({ title, onClose }) => {
  // Hooks
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  // useCallback
  const handleClick = useCallback(() => {
    setIsVisible(true);
  }, []);
  
  // useEffect
  useEffect(() => {
    // 초기화 로직
  }, []);
  
  // Early return
  if (!isVisible) return null;
  
  // JSX 반환
  return (
    <div className="component">
      <h1>{title}</h1>
      {MENU_ITEMS.map((item) => (
        <button key={item.id} onClick={handleClick}>
          {t(`menu.${item.key}`)}
        </button>
      ))}
    </div>
  );
};

const MemoizedComponent = memo(Component);
MemoizedComponent.displayName = 'Component';

export default MemoizedComponent;
```

---

## 체크리스트

코드 작성 시 다음 사항을 확인하세요:

- [ ] 파일명이 규칙에 맞는가? (컴포넌트: PascalCase.tsx)
- [ ] 변수명이 camelCase인가?
- [ ] Boolean 변수에 is/has/should 접두사를 사용했는가?
- [ ] 상수는 컴포넌트 외부에 UPPER_SNAKE_CASE로 정의했는가?
- [ ] 이벤트 핸들러는 handle 접두사를 사용했는가?
- [ ] 컴포넌트는 PascalCase로 명명했는가?
- [ ] CSS 클래스는 kebab-case로 명명했는가?
- [ ] 주석은 한국어로 작성했는가?
- [ ] React.memo, useCallback, useMemo를 적절히 사용했는가?
- [ ] Import 순서가 규칙에 맞는가?

---

## 참고 자료

- [React 공식 문서](https://react.dev/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Airbnb JavaScript 스타일 가이드](https://github.com/airbnb/javascript)

---

**마지막 업데이트**: 2024년

**작성자**: ActiveSoft 개발팀
