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
  	  <p>To view the full, interactive site, <br/><span>use an updated browser on a desktop computer.</span></p>
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
  	  <div id="get-ready">Get Ready for a New Way To Learn</div>
  	  <div id="request-info">
        <div id="form-top"></div>
		<p><em>We'll be in contact with you soon. <br/>Thanks for your interest in Bellevue University's Flexxive&#8480; Learning BBA.</em></p>
		<form name="" method="get" action="" id="requestForm">
		<p>
		  <label for="FirstName" class="infield">First Name</label>
		  <input type="text" name="n1" id="FirstName" class="required" />
		</p>
		 <p>
		  <label for="LastName" class="infield">Last Name</label>
		  <input type="text" name="n2" id="LastName" class="required" />
		</p>
		 <p>
		  <label for="Email" class="infield">Email</label>
		  <input type="text" name="n3" id="Email" class="required email" />
		</p>
		 <p>
		  <label for="Phone" class="infield">Phone</label>
		  <input type="text" name="n4" id="Phone" class="required" />
		</p>
		 <p>
		  <label for="Zip" class="infield">Zip Code</label>
		  <input type="text" name="n5" id="Zip" class="required" />
		</p>
		<select class="selectOptions" name="">
		  <option value="Select Degree">Select Degree</option>
		  <option value="Bachelor of Business Administration">Bachelor of Business Admin</option>
		</select>
		<input class="submit" type="submit" value="Submit" />
		</form>
        <div id="form-bot"></div>
      </div>
  	<div id="contact">
        <div id="contact-top"></div>
        <p class="text1">You can speak to one of our Admissions Advisors:</p>
        <p class="text2"><span>MON - THUR</span>
        8:00 a.m. to 8:00 p.m. (CST)</p>
        <p class="text2"><span>FRI</span>
        8:00 a.m. to 5:00 p.m. (CST)</p>
        <p class="text3"><span>TOLL FREE:</span> 1-800-756-7920</p>
        <p class="text3"><span>LOCAL:</span> (402) 293-2000</p>
        <div id="connect">
          <p>Connect and stay up to date with new info, programs, and innovative educational resources.</p>
          <a id="bu-fb" href="http://www.facebook.com/BellevueUniversity" title="Bellevue University on Facebook">/BellevueUniversity</a>
          <a id="bu-twitter" href="https://twitter.com/bu_innovate" title="Bellevue University on Twitter">@BU_Innovate</a>
        </div>
        <div id="contact-bot"></div>
      </div>
  	</div>
  </div>
  <div id="share">
  	<div class="center">
  	  Share Links FB + Twitter
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