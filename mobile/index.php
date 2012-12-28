<?php include(dirname(__FILE__) . "/../helpers.php"); ?>

<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <?php if (is_dev_mode()): ?>
  <?php else: ?>
    <link rel="stylesheet" href="/css/<?php echo production_file('mobile', 'css') ?>" />
  <?php endif; ?>
</head>
<body>

  <?php if (is_dev_mode()): ?>
  <?php else: ?>
    <script src="/js/<?php echo production_file('mobile', 'js') ?>"></script>
  <?php endif; ?>
</body>
</html>
