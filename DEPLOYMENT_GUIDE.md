# FTP 서버 배포 가이드

이 가이드는 ActiveSoft 웹사이트를 FTP 서버에 배포하는 방법을 설명합니다.

## 1. 프로젝트 빌드

### 1.1 프로덕션 빌드 실행

터미널에서 다음 명령어를 실행합니다:

```bash
npm run build
```

이 명령어는 `dist` 폴더에 최적화된 프로덕션 파일들을 생성합니다.

### 1.2 빌드 결과 확인

빌드가 완료되면 `dist` 폴더에 다음 파일들이 생성됩니다:

```
dist/
├── index.html          # 메인 HTML 파일
├── assets/
│   ├── index-[hash].js    # JavaScript 번들
│   ├── index-[hash].css   # CSS 번들
│   └── ...                # 기타 에셋 파일들
└── images/            # 이미지 파일들 (public/images/에 있는 경우)
```

## 2. FTP 클라이언트 선택

다음 중 하나의 FTP 클라이언트를 사용할 수 있습니다:

### 옵션 1: FileZilla (무료, 추천)
- 다운로드: https://filezilla-project.org/
- Windows, Mac, Linux 지원
- 사용하기 쉬운 GUI 인터페이스

### 옵션 2: WinSCP (Windows 전용)
- 다운로드: https://winscp.net/
- Windows에 최적화

### 옵션 3: VS Code 확장 프로그램
- **FTP-Sync** 또는 **SFTP** 확장 프로그램 사용
- 코드 에디터에서 직접 업로드 가능

### 옵션 4: 명령줄 도구
- `lftp` (Linux/Mac)
- `ftp` (기본 제공)

## 3. FTP 서버 연결 정보 준비

서버 관리자에게 다음 정보를 요청하세요:

- **호스트 주소 (Host)**: 예) ftp.example.com 또는 IP 주소
- **포트 (Port)**: 일반적으로 21 (FTP) 또는 22 (SFTP)
- **사용자명 (Username)**: FTP 계정 사용자명
- **비밀번호 (Password)**: FTP 계정 비밀번호
- **루트 디렉토리 (Root Directory)**: 웹사이트 파일을 업로드할 경로
  - 예) `/public_html/` 또는 `/www/` 또는 `/htdocs/`

## 4. FileZilla를 사용한 업로드 방법

### 4.1 FTP 서버 연결

1. FileZilla를 실행합니다
2. 상단의 연결 정보 입력란에 다음을 입력:
   - **호스트**: FTP 서버 주소
   - **사용자명**: FTP 사용자명
   - **비밀번호**: FTP 비밀번호
   - **포트**: 21 (또는 서버에서 지정한 포트)
3. **빠른 연결** 버튼 클릭

### 4.2 파일 업로드

1. **로컬 사이트** (왼쪽 패널):
   - 프로젝트의 `dist` 폴더로 이동

2. **원격 사이트** (오른쪽 패널):
   - 웹사이트 루트 디렉토리로 이동 (예: `/public_html/`)

3. **dist 폴더의 모든 파일과 폴더 선택**:
   - `index.html`
   - `assets/` 폴더 전체
   - `images/` 폴더 (있는 경우)
   - 기타 모든 파일

4. **드래그 앤 드롭** 또는 **우클릭 → 업로드**

### 4.3 업로드 확인

원격 사이트 패널에서 다음 파일들이 보이는지 확인:
- `index.html`
- `assets/` 폴더
- 기타 필요한 파일들

## 5. VS Code 확장 프로그램 사용 방법

### 5.1 SFTP 확장 프로그램 설치

1. VS Code에서 확장 프로그램 탭 열기 (Ctrl+Shift+X)
2. "SFTP" 검색
3. "SFTP" by Natizyskunk 설치

### 5.2 설정 파일 생성

프로젝트 루트에 `.vscode/sftp.json` 파일 생성:

```json
{
  "name": "Production Server",
  "host": "ftp.example.com",
  "protocol": "ftp",
  "port": 21,
  "username": "your-username",
  "password": "your-password",
  "remotePath": "/public_html/",
  "uploadOnSave": false,
  "ignore": [
    "**/.git/**",
    "**/node_modules/**",
    "**/.vscode/**",
    "**/src/**",
    "**/public/**",
    "*.md",
    "*.json",
    "*.ts",
    "*.tsx"
  ],
  "watcher": {
    "files": "dist/**",
    "autoUpload": false,
    "autoDelete": false
  }
}
```

### 5.3 업로드 실행

1. `dist` 폴더를 우클릭
2. **SFTP: Upload Folder** 선택
3. 또는 명령 팔레트 (Ctrl+Shift+P)에서 "SFTP: Upload" 실행

## 6. 명령줄을 사용한 업로드 (고급)

### 6.1 lftp 사용 (Linux/Mac)

```bash
# lftp 설치 (필요한 경우)
# Ubuntu/Debian: sudo apt-get install lftp
# Mac: brew install lftp

# FTP 연결 및 업로드
lftp -u username,password ftp.example.com <<EOF
cd /public_html/
mirror -R dist/ .
quit
EOF
```

### 6.2 배치 스크립트 생성 (Windows)

`deploy.bat` 파일 생성:

```batch
@echo off
echo Building project...
call npm run build

echo Uploading to FTP server...
lftp -u username,password ftp.example.com <<EOF
cd /public_html/
mirror -R dist/ .
quit
EOF

echo Deployment complete!
pause
```

## 7. 배포 후 확인 사항

### 7.1 웹사이트 접속 확인

브라우저에서 웹사이트 URL로 접속하여 확인:
- 예) `http://yourdomain.com` 또는 `https://yourdomain.com`

### 7.2 확인할 항목

- [ ] 페이지가 정상적으로 로드되는가?
- [ ] CSS 스타일이 적용되는가?
- [ ] JavaScript 기능이 작동하는가?
- [ ] 이미지가 표시되는가?
- [ ] 다크모드 토글이 작동하는가?
- [ ] 반응형 디자인이 제대로 작동하는가?

### 7.3 문제 해결

**문제: 페이지가 하얗게 보임**
- `index.html`의 경로가 올바른지 확인
- 서버의 기본 파일명이 `index.html`인지 확인

**문제: CSS/JS 파일이 로드되지 않음**
- `assets` 폴더가 올바르게 업로드되었는지 확인
- 파일 권한 확인 (일반적으로 644)

**문제: 이미지가 표시되지 않음**
- `images` 폴더가 올바른 위치에 있는지 확인
- 이미지 파일 경로 확인

## 8. 자동 배포 스크립트 (선택사항)

### 8.1 package.json에 배포 스크립트 추가

`package.json`의 `scripts` 섹션에 추가:

```json
{
  "scripts": {
    "deploy": "npm run build && node deploy.js"
  }
}
```

### 8.2 deploy.js 파일 생성

프로젝트 루트에 `deploy.js` 생성 (Node.js FTP 라이브러리 필요):

```bash
npm install --save-dev basic-ftp
```

`deploy.js`:
```javascript
const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

async function deploy() {
  const client = new ftp.Client();
  
  try {
    await client.access({
      host: 'ftp.example.com',
      user: 'your-username',
      password: 'your-password',
      secure: false
    });
    
    console.log('Connected to FTP server');
    
    await client.ensureDir('/public_html/');
    await client.clearWorkingDir();
    
    console.log('Uploading files...');
    await client.uploadFromDir('dist');
    
    console.log('Deployment complete!');
  } catch (error) {
    console.error('Deployment failed:', error);
  } finally {
    client.close();
  }
}

deploy();
```

## 9. 보안 권장사항

1. **비밀번호 보호**
   - FTP 비밀번호를 코드에 하드코딩하지 마세요
   - 환경 변수 사용 권장

2. **HTTPS 사용**
   - 가능하면 SFTP (포트 22) 사용
   - SSL/TLS 암호화된 연결 사용

3. **파일 권한**
   - 디렉토리: 755
   - 파일: 644

## 10. 업데이트 배포

사이트를 업데이트할 때:

1. 로컬에서 변경사항 테스트
2. `npm run build` 실행
3. `dist` 폴더의 변경된 파일만 업로드
4. 또는 전체 `dist` 폴더를 덮어쓰기

## 11. 백업

배포 전에 항상 백업을 받으세요:

1. FTP 클라이언트로 현재 서버 파일 다운로드
2. 또는 서버 관리자에게 백업 요청

## 12. 도메인 및 DNS 설정

FTP 업로드 후:

1. 도메인이 서버를 가리키도록 DNS 설정 확인
2. A 레코드 또는 CNAME 레코드 설정
3. DNS 전파 대기 (최대 48시간)

## 문제 해결

### 빌드 오류
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### FTP 연결 오류
- 방화벽 설정 확인
- 포트 번호 확인
- FTP vs SFTP 확인
- 서버 관리자에게 문의

### 파일 권한 오류
- FTP 클라이언트에서 파일 권한 변경
- 또는 SSH로 접속하여 `chmod` 명령어 사용

## 추가 리소스

- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [FileZilla 사용 가이드](https://wiki.filezilla-project.org/Documentation)
- [VS Code SFTP 확장 프로그램](https://marketplace.visualstudio.com/items?itemName=Natizyskunk.sftp)

---

**문의사항이 있으시면 개발팀에 연락하세요.**
