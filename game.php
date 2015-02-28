<?php
?>
<html>
	<header>
		<script src="scripts/scripts.js"></script>
	</header/>
	<body onload="onLoadComplete()">
		<div id="fbLike" style="display:none" class="fb-like" data-send="true" data-width="450"  data-show-faces="false" data-share="false">
		</div>
		<h1 id="fb-welcome"></h1>
		<div>
			 <input type="button" value="Init application" onclick="initApp({app_id:'404839423029580',scope:'user_friends, email'});">
			 <input type="button" value="getLoginStatus" onclick="getLoginStatus({app_id:'404839423029580',scope:'user_friends, email'});">
			 <input type="button" value="ViewLike" onclick="viewLike({liked:0});">
			 <input type="button" value="Share" onclick="onFacebookUiCall({method:'feed',name:'hello',caption:'hello1',desc:'hello2',pic:'https://gentle-oasis-6157.herokuapp.com/assets/image/BG.jpg'})">
		</div>
	</body>
</html>