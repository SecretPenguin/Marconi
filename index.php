<?php
include("helpers.php");

if (isset($_GET["scene"])) {
  $scenes = array("preface", $_GET["scene"]);
} else {
  $scenes = array("preface", "flexible", "mobile", "cogs", "social", "walking");
}
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <?php if (is_dev_mode()): ?>
    <link rel="stylesheet" href="/css/shared.css" />
    <?php foreach ($scenes as $scene) { ?>
      <link rel="stylesheet" href="/css/<?php echo $scene; ?>.css" />
    <?php } ?>
  <?php else: ?>
    <link rel="stylesheet" href="/css/<?php echo production_file('css') ?>" />
  <?php endif; ?>
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>

  <?php
  foreach ($scenes as $scene) {
    include("scenes/$scene.php");
    include("share_bar.php");
  }
  ?>

  <?php if (is_dev_mode()): ?>
  <script src="/js/vendor/jquery.js"></script>
  <script src="/js/vendor/jquery.cycle.all.js"></script>
  <script src="/js/vendor/jquery.rotate.js"></script>
  <script src="/js/vendor/jquery.backgroundpos.js"></script>
  <script src="/js/vendor/jquery.zclip.js"></script>
  <script src="/js/vendor/underscore.js"></script>
  <script src="/js/m.js"></script>
  <script src="/js/share_bar.js"></script>
  <script src="/js/scene.js"></script>

  <?php foreach ($scenes as $scene) { ?>
  <script src="/js/<?php echo $scene; ?>.js"></script>
  <?php } ?>

  <?php else: ?>
  <script src="/js/<?php echo production_file('js') ?>"></script>
  <?php endif; ?>
</body>
</html>
