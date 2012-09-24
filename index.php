<?php
function is_dev_mode() {
  $dev_hosts = array("marconi.dev");
  return in_array($_SERVER["SERVER_NAME"], $dev_hosts);
}
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <?php if (is_dev_mode()): ?>
  <link rel="stylesheet" href="/css/shared.css" />
  <link rel="stylesheet" href="/css/flexible.css" />
  <link rel="stylesheet" href="/css/mobile.css" />
  <link rel="stylesheet" href="/css/integrated.css" />
  <link rel="stylesheet" href="/css/relevant.css" />
  <?php else: ?>
  <link rel="stylesheet" href="all.css" />
  <?php endif; ?>
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>

  <div class="space"></div>
  <?php // include("tests/flexible/flexible.php"); ?>
  <?php include("tests/mobile/mobile.php"); ?>
  <?php include("tests/integrated/integrated.php"); ?>
  <?php include("tests/relevant/relevant.php"); ?>

  <?php if (is_dev_mode()): ?>
  <script src="/js/vendor/jquery.js"></script>
  <script src="/js/vendor/jquery.cycle.all.js"></script>
  <script src="/js/vendor/jquery.maximage.js"></script>
  <script src="/js/vendor/jquery.rotate.js"></script>
  <script src="/js/vendor/jquery.backgroundpos.min.js"></script>
  <script src="/js/m.js"></script>
  <script src="/js/scene.js"></script>
  <script src="/js/flexible.js"></script>
  <script src="/js/mobile.js"></script>
  <script src="/js/integrated.js"></script>
  <script src="/js/relevant.js"></script>
  <?php else: ?>
  <script src="all.js"></script>
  <?php endif; ?>
</body>
</html>
