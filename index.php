<?php
include("helpers.php");

if (isset($_GET["scene"])) {
  $scenes = array("preface", $_GET["scene"]);
} else {
  $scenes = array("preface", "flexible", "mobile", "cogs", "social", "walking", "enroll");
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
  <div id="corner">
  	<a id="learn-more" href="#" title="Learn More">Learn More</a>
  	<a id="contact-us" href="#enroll" title="Contact Us">Contact Us</a>
  </div>
  <?php
  foreach ($scenes as $scene) {
    include("scenes/$scene.php");
    include("share_bar.php");
  }
  ?>
  <div id="warning">
    Warn user about viewport width and offer a bear hug or alternate version.
  </div>

  <?php if (is_dev_mode()): ?>
  <script src="/js/vendor/jquery.js"></script>
  <script src="/js/vendor/jquery.cycle.all.js"></script>
  <script src="/js/vendor/jquery.rotate.js"></script>
  <script src="/js/vendor/jquery.backgroundpos.js"></script>
  <script src="/js/vendor/jquery.zclip.js"></script>
  <script src="/js/vendor/jquery.preloadcssimages.js"></script>
  <script src="/js/vendor/underscore.js"></script>
  <script src="/js/vendor/jquery.backstretch.js"></script>
  <script src="/js/vendor/jquery.infieldlabel.js"></script>
  <script src="/js/vendor/jquery.validate.js"></script>
  <script src="/js/vendor/jquery.selectbox-0.2.js"></script>
  <script src="/js/vendor/jquery.spritely-0.6.1.js"></script>
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
