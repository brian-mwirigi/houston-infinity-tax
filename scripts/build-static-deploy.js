const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'deploy');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function page(name) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  return html.includes('hits-static') ? html : html.replace('<html', '<html data-hits-static="1"');
}

const mailer = `<?php
declare(strict_types=1);
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  header('Location: /contact-us/');
  exit;
}
require __DIR__ . '/wp-load.php';

$honeypot = isset($_POST['company']) ? trim((string) wp_unslash($_POST['company'])) : '';
$form = isset($_POST['form']) ? (string) wp_unslash($_POST['form']) : '';
$backs = array(
  'downloads' => '/downloads/',
  'appointment' => '/appointments/index.html',
);
$back = isset($backs[$form]) ? $backs[$form] : '/contact-us/';
if ($honeypot !== '') {
  wp_safe_redirect(home_url($back . '?sent=1'));
  exit;
}

$field = static function (string $key): string {
  $value = isset($_POST[$key]) ? wp_unslash($_POST[$key]) : '';
  $value = is_string($value) ? trim($value) : '';
  return str_replace(array("\\r", "\\n"), ' ', $value);
};

$attachments = array();
if ($form === 'downloads' && !empty($_FILES)) {
  $allowed = array('doc', 'docx', 'pdf', 'odt');
  foreach ($_FILES as $file) {
    if (!isset($file['error'], $file['tmp_name'], $file['name'], $file['size'])) {
      continue;
    }
    if ($file['error'] === UPLOAD_ERR_NO_FILE || $file['error'] !== UPLOAD_ERR_OK) {
      continue;
    }
    if ($file['size'] > 8 * 1024 * 1024 || !is_uploaded_file($file['tmp_name'])) {
      continue;
    }
    $ext = strtolower(pathinfo((string) $file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $allowed, true)) {
      continue;
    }
    $target = trailingslashit(get_temp_dir()) . 'hits-' . wp_generate_password(8, false) . '.' . $ext;
    if (move_uploaded_file($file['tmp_name'], $target)) {
      $attachments[] = $target;
    }
  }
}

if ($form === 'appointment') {
  $to = 'support@houstoninfinitytaxservices.com';
  $subject = 'APPOINTMENT REQUEST';
  $lines = array(
    'Name: ' . $field('your-name'),
    'Email: ' . $field('your-email'),
    'Phone: ' . $field('your-phone'),
    'Preferred day: ' . $field('preferred-day'),
    'Preferred time: ' . $field('preferred-time'),
    'Type of Service: ' . $field('sevicetype'),
    '',
    $field('your-message'),
  );
} elseif ($form === 'downloads') {
  $to = 'info@houstoninfinitytaxservices.com';
  $subject = 'DOWNLOADS SUBMISSION - online form';
  $lines = array(
    'Name: ' . $field('your-name'),
    'Email: ' . $field('your-email'),
    'Type of Service: ' . $field('sevicetype'),
    'Employment: ' . $field('your-employment'),
    'Annual Income: ' . $field('annual-income'),
  );
} else {
  $to = 'support@houstoninfinitytaxservices.com';
  $subject = 'ONLINE FEEDBACK FORM';
  $lines = array(
    'Name: ' . $field('your-name'),
    'Email: ' . $field('your-email'),
    'Phone: ' . $field('your-phone'),
    'Website: ' . $field('your-website'),
    '',
    $field('your-message'),
  );
}

$headers = array('Content-Type: text/plain; charset=UTF-8');
$email = $field('your-email');
if (is_email($email)) {
  $headers[] = 'Reply-To: ' . $email;
}
$ok = wp_mail($to, $subject, implode("\\n", $lines), $headers, $attachments);
foreach ($attachments as $path) {
  if (is_file($path)) {
    unlink($path);
  }
}
wp_safe_redirect(home_url($back . ($ok ? '?sent=1' : '?sent=0')));
exit;
`;

const files = {
  'hits-mail.php': mailer,
  'index.html': page('concept-two.html'),
  'about-us/index.html': page('about.html'),
  'services/index.html': page('services.html'),
  'downloads/index.html': page('downloads.html'),
  'testimonial/index.html': page('testimonials.html'),
  'contact-us/index.html': page('contact.html'),
  'blog/index.html': page('blog.html'),
  'appointments/index.html': page('appointments.html'),
  'concept-two.css': fs.readFileSync(path.join(root, 'concept-two.css')),
  'concept-two.js': fs.readFileSync(path.join(root, 'concept-two.js')),
};

const b64dir = path.join(out, 'b64');
fs.mkdirSync(b64dir, { recursive: true });
for (const [rel, content] of Object.entries(files)) {
  const body = Buffer.isBuffer(content) ? content : Buffer.from(content);
  const dest = path.join(out, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, body);
  const gz = zlib.gzipSync(body, { level: 9 });
  const b64 = gz.toString('base64');
  const key = rel.replace(/[\\/]/g, '__');
  fs.writeFileSync(path.join(b64dir, key + '.b64'), b64);
  console.log(rel, body.length, b64.length);
}
