<?php
include("helpers.php");

$scene = $singleScene = $_GET["scene"];

if (empty($scene)) {
  $scenes = array("flexible", "mobile", "cogs", "social", "walking");
} else {
  $scenes = array($scene);
}

?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <?php if (is_dev_mode()): ?>
    <link rel="stylesheet" href="/css/shared.css" />
    <link rel="stylesheet" href="/css/preface.css" />
    <?php foreach ($scenes as $scene) { ?>
      <link rel="stylesheet" href="/css/<?php echo $scene; ?>.css" />
    <?php } ?>
  <?php else: ?>
    <link rel="stylesheet" href="all.css" />
  <?php endif; ?>
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
<body>

  <?php
  include("tests/preface/preface.php");

  foreach ($scenes as $scene) {
    include("tests/$scene/$scene.php");
    include("share_bar.php");
  }
  ?>

  <?php if (is_dev_mode()): ?>
    <script src="/js/vendor/jquery.js"></script>
    <script src="/js/vendor/jquery.cycle.all.js"></script>
    <script src="/js/vendor/jquery.rotate.js"></script>
    <script src="/js/vendor/jquery.backgroundpos.min.js"></script>
    <script src="/js/vendor/jquery.zclip.min.js"></script>
    <script src="/js/m.js"></script>
    <script src="/js/share_bar.js"></script>
    <script src="/js/scene.js"></script>
    <script src="/js/preface.js"></script>

    <?php foreach ($scenes as $scene) { ?>
      <script src="/js/<?php echo $scene; ?>.js"></script>
    <?php } ?>
    <script src="/js/share.js"></script>
  <?php else: ?>
    <script src="all.js"></script>
  <?php endif; ?>
</body>
</html>
