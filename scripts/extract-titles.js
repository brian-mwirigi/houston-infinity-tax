const fs = require('fs');
const html = fs.readFileSync(process.env.TEMP + '/hits-original/services.html', 'utf8');
const titles = [...html.matchAll(/<h3 class="title">([\s\S]*?)<\/h3>/g)].map((m) =>
  m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
);
console.log(titles.join('\n'));
