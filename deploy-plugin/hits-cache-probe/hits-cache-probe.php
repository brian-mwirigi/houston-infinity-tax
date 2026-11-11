<?php
/**
 * Plugin Name: Hits Cache Probe
 * Description: Temporary static file writer. Remove after deploy.
 */
add_action('wp_ajax_hits_put_file', function () {
  if (!current_user_can('manage_options')) {
    wp_die('forbidden', '', array('response' => 403));
  }
  check_ajax_referer('wp_rest');
  $rel = isset($_POST['rel']) ? str_replace('\\', '/', (string) wp_unslash($_POST['rel'])) : '';
  if (!preg_match('#^(index\.html|concept-two\.(css|js)|hits-mail\.php|wp-content/mu-plugins/hits-front\.php|(about-us|services|downloads|testimonial|contact-us|blog|appointments)/index\.html)$#', $rel)) {
    wp_die('bad path', '', array('response' => 400));
  }
  $bin = base64_decode((string) wp_unslash($_POST['data'] ?? ''), true);
  if ($bin === false) {
    wp_die('bad data', '', array('response' => 400));
  }
  if (substr($bin, 0, 2) === "\x1f\x8b") {
    $bin = gzdecode($bin);
    if ($bin === false) {
      wp_die('bad gzip', '', array('response' => 400));
    }
  }
  $dest = ABSPATH . $rel;
  if (!wp_mkdir_p(dirname($dest))) {
    wp_die('mkdir', '', array('response' => 500));
  }
  $written = file_put_contents($dest, $bin);
  if ($written === false) {
    wp_die('write', '', array('response' => 500));
  }
  echo 'ok ' . $written . ' ' . md5($bin);
  exit;
});
add_action('wp_ajax_hits_patch_htaccess', function () {
  if (!current_user_can('manage_options')) {
    wp_die('forbidden', '', array('response' => 403));
  }
  check_ajax_referer('wp_rest');
  $path = ABSPATH . '.htaccess';
  $current = is_file($path) ? (string) file_get_contents($path) : '';
  $block = "# BEGIN Hits Static\n<IfModule mod_rewrite.c>\nRewriteEngine On\nRewriteRule ^$ /index.html [L]\nRewriteRule ^about-us/?$ /about-us/index.html [L]\nRewriteRule ^services/?$ /services/index.html [L]\nRewriteRule ^downloads/?$ /downloads/index.html [L]\nRewriteRule ^testimonial/?$ /testimonial/index.html [L]\nRewriteRule ^contact-us/?$ /contact-us/index.html [L]\nRewriteRule ^blog/?$ /blog/index.html [L]\nRewriteRule ^appointments/?$ /appointments/index.html [L]\n</IfModule>\n# END Hits Static\n";
  if (strpos($current, '# BEGIN Hits Static') !== false) {
    $current = preg_replace('/# BEGIN Hits Static.*?# END Hits Static\n?/s', $block, $current);
  } else {
    $current = $block . $current;
  }
  $written = file_put_contents($path, $current);
  if ($written === false) {
    wp_die('htaccess', '', array('response' => 500));
  }
  echo 'ok htaccess ' . $written;
  exit;
});
add_action('wp_ajax_hits_purge', function () {
  if (!current_user_can('manage_options')) {
    wp_die('forbidden', '', array('response' => 403));
  }
  check_ajax_referer('wp_rest');
  $targets = array('/home/houston1/cache', '/var/cache/ea-nginx', '/var/cache/nginx');
  $lines = array();
  $wipe = function ($dir) use (&$wipe, &$lines) {
    if (!file_exists($dir)) {
      $lines[] = $dir . ' missing';
      return;
    }
    if (!is_writable($dir)) {
      $lines[] = $dir . ' locked';
      return;
    }
    $removed = 0;
    $items = scandir($dir);
    if ($items === false) {
      $lines[] = $dir . ' unreadable';
      return;
    }
    foreach ($items as $item) {
      if ($item === '.' || $item === '..') {
        continue;
      }
      $path = $dir . '/' . $item;
      if (is_dir($path)) {
        $wipe($path);
        @rmdir($path);
      } elseif (@unlink($path)) {
        $removed++;
      }
    }
    $lines[] = $dir . ' removed ' . $removed;
  };
  foreach ($targets as $dir) {
    $wipe($dir);
  }
  if (function_exists('opcache_reset')) {
    $lines[] = 'opcache=' . (opcache_reset() ? 'reset' : 'no');
  }
  if (function_exists('proc_open')) {
    $pipes = array();
    $proc = proc_open('/usr/local/cpanel/bin/uapi NginxCaching clear_cache', array(1 => array('pipe', 'w'), 2 => array('pipe', 'w')), $pipes);
    if (is_resource($proc)) {
      fclose($pipes[1]);
      fclose($pipes[2]);
      $lines[] = 'nginx=' . proc_close($proc);
    }
  }
  echo implode("\n", $lines);
  exit;
});
