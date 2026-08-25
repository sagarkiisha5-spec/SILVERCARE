const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  const logoPath = path.join(__dirname, '../public/silvercare-logo.png');
  const footerLogoPath = path.join(__dirname, '../public/silvercare-footer-logo.png');
  
  await download('https://silvercareindia.com/wp-content/uploads/2025/12/logo.png', logoPath);
  console.log('✅ Downloaded logo.png');
  
  await download('https://silvercareindia.com/wp-content/uploads/2025/12/footer-logo.png', footerLogoPath);
  console.log('✅ Downloaded footer-logo.png');
}

run().catch(console.error);
