<?php
include_once(dirname(__FILE__) . "/../helpers.php");

$scenes = array("preface", "flexible", "mobile", "cogs", "social", "walking", "enroll");
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <?php if (is_dev_mode()): ?>
    <?php foreach(file("css_manifest.txt") as $css_src): ?>
      <link rel="stylesheet" href="<?php echo chop($css_src); ?>"></link>
    <?php endforeach; ?>
  <?php else: ?>
    <link rel="stylesheet" href="/css/<?php echo production_file('main', 'css') ?>" />
  <?php endif; ?>
  <!--[if lt IE 9]>
    <script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <!--[if lte IE 7]>
    <style type="text/css">
      #warning { display: block; }
    </style>
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
    <div id="bearHug">Please make your browser this big. }----(o_o)----{</div>
    <a href="#" title="View Alternate Version of Site">or view the alternate version &raquo;</a>
  </div>

  <?php if (is_dev_mode()): ?>
    <?php foreach(file("js_manifest.txt") as $js_src): ?>
      <script src="<?php echo chop($js_src); ?>"></script>
    <?php endforeach; ?>
  <?php else: ?>
  <script src="/js/<?php echo production_file('main', 'js') ?>"></script>
  <?php endif; ?>
</body>
</html>
