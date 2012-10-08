<?php include("helpers.php"); ?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <?php if (is_dev_mode()): ?>
  <link rel="stylesheet" href="/css/shared.css" />
  <link rel="stylesheet" href="/css/preface.css" />
  <link rel="stylesheet" href="/css/flexible.css" />
  <link rel="stylesheet" href="/css/mobile.css" />
  <link rel="stylesheet" href="/css/integrated.css" />
  <link rel="stylesheet" href="/css/social.css" />
  <link rel="stylesheet" href="/css/relevant.css" />
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
  $scenes = array("flexible", "mobile", "integrated", "social", "relevant");

  foreach ($scenes as $scene) {
    include("tests/$scene/$scene.php");
    include("share.php");
  }
  ?>

  <?php if (is_dev_mode()): ?>
  <script src="/js/vendor/jquery.js"></script>
  <script src="/js/vendor/jquery.cycle.all.js"></script>
  <script src="/js/vendor/jquery.rotate.js"></script>
  <script src="/js/vendor/jquery.backgroundpos.min.js"></script>
  <script src="/js/vendor/jquery.zclip.min.js"></script>
  <script src="/js/m.js"></script>
  <script src="/js/scene.js"></script>
  <script src="/js/preface.js"></script>
  <script src="/js/flexible.js"></script>
  <script src="/js/mobile.js"></script>
  <script src="/js/integrated.js"></script>
  <script src="/js/social.js"></script>
  <script src="/js/relevant.js"></script>
  <script src="/js/share.js"></script>
  <?php else: ?>
  <script src="all.js"></script>
  <?php endif; ?>
</body>
</html>
