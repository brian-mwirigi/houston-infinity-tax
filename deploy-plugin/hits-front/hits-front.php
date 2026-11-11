<?php
/**
 * Plugin Name: Hits Front
 * Description: Sends leftover WordPress pages to the new static site.
 */
add_action('template_redirect', function () {
  if (is_admin() || wp_doing_ajax() || wp_doing_cron()) {
    return;
  }
  $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
  $path = is_string($path) ? rtrim($path, '/') : '';
  if ($path === '/appointments') {
    wp_safe_redirect(home_url('/appointments/index.html'), 301);
    exit;
  }
  wp_safe_redirect(home_url('/'), 301);
  exit;
});
