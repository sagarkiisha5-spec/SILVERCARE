const https = require('https');

https.get('https://silvercareindia.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const matches = data.match(/https?:\/\/[^"'\s]+\.(?:png|jpg|jpeg|svg|webp)/gi) || [];
    const logoMatches = matches.filter(url => url.toLowerCase().includes('logo'));
    console.log('LOGO MATCHES:', [...new Set(logoMatches)]);
  });
}).on('error', (err) => {
  console.error(err);
});
