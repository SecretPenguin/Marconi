<?php include(dirname(__FILE__) . "/../helpers.php"); ?>

<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <?php if (is_dev_mode()): ?>
    <?php foreach(file("css_manifest.txt") as $css_src): ?>
      <link rel="stylesheet" href="<?php echo chop($css_src); ?>"></link>
    <?php endforeach; ?>
  <?php else: ?>
    <link rel="stylesheet" href="/css/<?php echo production_file('mobile', 'css') ?>" />
  <?php endif; ?>
  <meta name="viewport" content="width=device-width">
</head>
<body>
  <div id="warning">
  	<div class="center">
  	  Display alert for user to view full site in a modern browser (if viewing from IE) or on a desktop computer (if viewing from mobile).
  	</div>
  </div>
  <div id="preface">
  	<div class="center">
  	  <img src="images/preface.jpg" alt="Are you ready for a new way to learn?" />
  	</div>
  </div>
  <div id="intro">
  	<div class="center">
  	  <img src="images/intro.jpg" alt="Flexxive - the new learning experience" />
  	</div>
  </div>
  <div id="flexible">
  	<div class="center">
  	  <img src="images/flexible-title.jpg" alt="flexible degree schedule" />
  	  <p class="text1"><em>It's about time.</em></p>
  	  <p class="text2"><em>Start when you want. Breaks when you need.</em></p>
  	  <p class="text3">With the Flexxive Learning BBA, you can also design your own timeline. There are no fixed due dates, you simply have to complete your courses within the six month session.</p>
  	  <img src="images/flexible.jpg" alt="Flexible Timeline" />
  	</div>
  </div>
  <div id="mobile">
  	<div class="center">
  	  <img src="images/mobile.jpg" alt="Courses on the go: Anytime, Anywhere. Work on your degree from your phone, tablet, or desktop." />
  	</div>
  </div>
  <div id="cogs">
  	<div class="center">
  	  <img src="images/cogs.jpg" alt="Courses and concepts that fit together from your 1st class to your last - it just makes sense." />
  	</div>
  </div>
  <div id="social">
  	<div class="center">
  	  <img src="images/social.jpg" alt="A Shared Experience that goes Beyond Learning" />
  	</div>
  </div>
  <div id="walking">
  	<div class="center">
  	  <img src="images/walking.jpg" alt="Develop The Skills that make you Indispensable" />
  	</div>
  </div>
  <div id="enroll">
  	<div class="center">
  	
  	</div>
  </div>
  <div id="share">
  	<div class="center">
  	
  	</div>
  </div>
  <?php if (is_dev_mode()): ?>
    <?php foreach(file("js_manifest.txt") as $js_src): ?>
      <script src="<?php echo chop($js_src); ?>"></script>
    <?php endforeach; ?>
  <?php else: ?>
    <script src="/js/<?php echo production_file('mobile', 'js') ?>"></script>
  <?php endif; ?>
</body>
</html>
