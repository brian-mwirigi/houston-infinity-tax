const fs = require('fs');
function sumOf(text) {
  let sum = 0;
  for (let i = 0; i < text.length; i++) sum = (sum + text.charCodeAt(i) * (i + 1)) % 1000000007;
  return sum;
}
for (const name of ['services', 'downloads', 'testimonials', 'contact']) {
  const text = fs.readFileSync('mpa/gz/' + name + '.b64', 'utf8').replace(/\s+/g, '');
  console.log(name, text.length, sumOf(text), text.slice(0, 8), text.slice(-8));
}
