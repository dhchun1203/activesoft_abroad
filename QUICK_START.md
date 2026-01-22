# 빠른 배포 가이드

## 🚀 3단계로 FTP 배포하기

### 1단계: 프로젝트 빌드

```bash
npm run build
```

빌드가 완료되면 `dist` 폴더가 생성됩니다.

### 2단계: FTP 클라이언트로 업로드

#### FileZilla 사용 (가장 쉬운 방법)

1. **FileZilla 다운로드**: https://filezilla-project.org/
2. **FTP 서버 연결**:
   - 호스트: FTP 서버 주소
   - 사용자명: FTP 계정 사용자명
   - 비밀번호: FTP 계정 비밀번호
   - 포트: 21
3. **파일 업로드**:
   - 왼쪽: 프로젝트의 `dist` 폴더
   - 오른쪽: 서버의 웹 루트 디렉토리 (예: `/public_html/`)
   - `dist` 폴더의 **모든 파일과 폴더**를 드래그 앤 드롭

### 3단계: 확인

브라우저에서 웹사이트 URL로 접속하여 확인하세요!

---

## 📝 자동 배포 스크립트 사용 (선택사항)

### 설치

```bash
npm install --save-dev basic-ftp
```

### 설정

`deploy-ftp.js` 파일을 열어서 FTP 정보를 수정하거나, 환경 변수 사용:

**Windows:**
```cmd
set FTP_HOST=ftp.example.com
set FTP_USER=your-username
set FTP_PASSWORD=your-password
set FTP_REMOTE_PATH=/public_html/
```

**Linux/Mac:**
```bash
export FTP_HOST=ftp.example.com
export FTP_USER=your-username
export FTP_PASSWORD=your-password
export FTP_REMOTE_PATH=/public_html/
```

### 실행

```bash
npm run deploy
```

또는

```bash
npm run build
node deploy-ftp.js
```

---

## ⚠️ 주의사항

1. **빌드 먼저**: 배포 전에 반드시 `npm run build` 실행
2. **백업**: 기존 파일 백업 권장
3. **파일 권한**: 업로드 후 파일 권한 확인 (일반적으로 644)

---

## 🔧 문제 해결

**빌드 오류?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**FTP 연결 안 됨?**
- 포트 번호 확인 (21 또는 22)
- 방화벽 설정 확인
- 서버 관리자에게 문의

**페이지가 안 보여요?**
- `index.html` 파일이 루트에 있는지 확인
- `assets` 폴더가 업로드되었는지 확인

---

더 자세한 내용은 `DEPLOYMENT_GUIDE.md` 파일을 참고하세요.
