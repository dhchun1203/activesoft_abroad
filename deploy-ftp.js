/**
 * FTP 배포 스크립트
 * 
 * 사용법:
 * 1. npm install --save-dev basic-ftp
 * 2. 이 파일의 FTP 정보를 수정
 * 3. npm run deploy 또는 node deploy-ftp.js 실행
 */

const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');

// FTP 서버 설정 (환경 변수 또는 직접 입력)
const FTP_CONFIG = {
  host: process.env.FTP_HOST || 'ftp.example.com',
  user: process.env.FTP_USER || 'your-username',
  password: process.env.FTP_PASSWORD || 'your-password',
  secure: process.env.FTP_SECURE === 'true', // true면 FTPS 사용
  port: parseInt(process.env.FTP_PORT || '21'),
  remotePath: process.env.FTP_REMOTE_PATH || '/public_html/'
};

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true; // 상세 로그 출력

  try {
    console.log('🔌 FTP 서버에 연결 중...');
    await client.access({
      host: FTP_CONFIG.host,
      user: FTP_CONFIG.user,
      password: FTP_CONFIG.password,
      secure: FTP_CONFIG.secure,
      port: FTP_CONFIG.port
    });

    console.log('✅ 연결 성공!');
    console.log(`📁 원격 경로: ${FTP_CONFIG.remotePath}`);

    // 원격 디렉토리로 이동
    await client.ensureDir(FTP_CONFIG.remotePath);
    await client.cd(FTP_CONFIG.remotePath);

    // dist 폴더 확인
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      console.error('❌ dist 폴더를 찾을 수 없습니다. 먼저 npm run build를 실행하세요.');
      process.exit(1);
    }

    console.log('📤 파일 업로드 중...');
    
    // dist 폴더의 모든 파일 업로드
    await client.uploadFromDir(distPath);

    console.log('✅ 배포 완료!');
    console.log(`🌐 웹사이트 URL: http://${FTP_CONFIG.host.replace('ftp.', '')}`);

  } catch (error) {
    console.error('❌ 배포 실패:', error.message);
    if (error.code) {
      console.error('에러 코드:', error.code);
    }
    process.exit(1);
  } finally {
    client.close();
  }
}

// 환경 변수 확인
if (!process.env.FTP_HOST && FTP_CONFIG.host === 'ftp.example.com') {
  console.log('⚠️  FTP 설정이 필요합니다.');
  console.log('');
  console.log('방법 1: 환경 변수 사용');
  console.log('  Windows:');
  console.log('    set FTP_HOST=ftp.example.com');
  console.log('    set FTP_USER=username');
  console.log('    set FTP_PASSWORD=password');
  console.log('    set FTP_REMOTE_PATH=/public_html/');
  console.log('    node deploy-ftp.js');
  console.log('');
  console.log('  Linux/Mac:');
  console.log('    export FTP_HOST=ftp.example.com');
  console.log('    export FTP_USER=username');
  console.log('    export FTP_PASSWORD=password');
  console.log('    export FTP_REMOTE_PATH=/public_html/');
  console.log('    node deploy-ftp.js');
  console.log('');
  console.log('방법 2: 이 파일의 FTP_CONFIG 객체 직접 수정');
  console.log('');
  process.exit(1);
}

deploy();
