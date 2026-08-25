const https = require('https');

function fetchPage(url) {
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const matches = data.match(/https:\/\/[^"'\s\)]+\.(png|jpg|jpeg|webp)/gi);
      if (matches) {
        const unique = [...new Set(matches)].filter(u => u.includes('uploads'));
        console.log(`=== Images for ${url} ===`);
        console.log(unique);
      }
    });
  });
}

fetchPage('https://silvercareindia.com/our-team/');
fetchPage('https://silvercareindia.com/about-us/');
fetchPage('https://silvercareindia.com/');
