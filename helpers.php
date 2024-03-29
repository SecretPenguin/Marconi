<?php
// returns boolean whether or not app is running in dev mode
function is_dev_mode() {
  $mode = getenv("MARCONI_PRODUCTION");
  return empty($mode);
}

// returns the current server's name, allowing manual override by setting
// MARCONI_SERVER_NAME environment variable
function server_name() {
  $server_name = getenv("MARCONI_SERVER_NAME");

  if (empty($server_name)) {
    $server_name = $_SERVER["SERVER_NAME"];
  }

  return $server_name;
}

// abstract out the root url so it can be easily embedded in static pages
function root_url() {
  return "http://" . server_name();
}

// used from mobile site to get main domain's url for sharing
function main_root_url() {
  $domain = parse_url(root_url(), PHP_URL_HOST);

  preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $matches);
  return "http://" . $matches["domain"];
}

function production_file($site, $type) {
  $files = glob("build/$site/$type/*.$type");
  return basename($files[0]);
}
?>
