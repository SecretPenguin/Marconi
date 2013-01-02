<?php
include_once(dirname(__FILE__) . "/../helpers.php");
$share_url = root_url() . "/" . $scene;
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
      <div class="social-container">
        <ul class="socialcount" data-url="<?php echo $share_url; ?>">
          <li class="facebook">
            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $share_url; ?>" title="Share on Facebook">
              <span class="count">Like</span>
            </a>
          </li>

          <li class="twitter">
            <a href="https://twitter.com/intent/tweet?text=TODO need some copy here" title="Share on Twitter">
              <span class="count">Tweet</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="share-site">
      <div class="social-container">
        <ul class="socialcount" data-url="<?php echo root_url(); ?>">
          <li class="facebook">
            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo root_url(); ?>" title="Share on Facebook">
              <span class="count">Like</span>
            </a>
          </li>

          <li class="twitter">
            <a href="https://twitter.com/intent/tweet?text=TODO need some copy here" title="Share on Twitter">
              <span class="count">Tweet</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
