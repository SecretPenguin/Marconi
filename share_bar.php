<?php
include_once("helpers.php");
$share_url = root_url() . "/#" . $scene;
?>
<div id="share-<?php echo $scene; ?>" class="share">
  <div class="left-bg"></div>
  <div class="right-bg"></div>
  <div class="texture"></div>
  <div class="shadow"></div>
  <div class="share-content">
    <div class="share-section">
      <div class="permalink">
        <input type="text" disabled="disabled" value="<?php echo $share_url; ?>"/>
        <a class="share-copy-button" href="#">Copy</a>
        <p class="copy-confirm">Copied!</p>
      </div>
      <div class="facebook">facebook</div>
      <div class="twitter">twitter</div>
    </div>
    <div class="share-site">
      <div class="facebook">facebook</div>
      <div class="twitter">twitter</div>
    </div>
  </div>
</div>
