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
</head>
<body>

  <?php if (is_dev_mode()): ?>
    <?php foreach(file("js_manifest.txt") as $js_src): ?>
      <script src="<?php echo chop($js_src); ?>"></script>
    <?php endforeach; ?>
  <?php else: ?>
    <script src="/js/<?php echo production_file('mobile', 'js') ?>"></script>
  <?php endif; ?>
</body>
</html>
