const localtunnel = require('localtunnel');
const { startServer } = require('./server');

 codex/translate-site-content-to-korean-rwtk72
const PORT = Number(process.env.PORT) || 5173;

const PORT = Number(process.env.PORT) || 4173;
 main

let server;

async function openTunnel() {
  server = startServer({
    port: PORT,
    onReady(addressInfo) {
      const port = addressInfo && addressInfo.port ? addressInfo.port : PORT;
      console.log(`로컬 미리보기 서버가 http://localhost:${port} 에서 실행 중입니다.`);
    },
  });

  await new Promise((resolve) => {
    if (server.listening) {
      resolve();
      return;
    }

    server.once('listening', resolve);
  });

  const tunnel = await localtunnel({
    port: PORT,
    allowInvalidCert: true,
  });

  console.log('');
  console.log('외부에서도 접속 가능한 미리보기 링크가 준비되었습니다.');
  console.log(`👉 ${tunnel.url}`);
  console.log('이 링크는 터미널을 종료하거나 Ctrl+C 를 누르면 자동으로 만료됩니다.');

  const shutdown = () => {
    console.log('\n가상 사이트 미리보기를 종료합니다...');
    tunnel.close();
    server.close(() => {
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

openTunnel().catch((error) => {
  console.error('공유 링크를 생성하는 도중 문제가 발생했습니다.');
  console.error(error);

  if (server && server.listening) {
    server.close(() => {
      process.exit(1);
    });
    return;
  }

  process.exit(1);
});
