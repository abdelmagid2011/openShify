//create js element in header
var app_id='';
//'404839423029580'	
onLoadComplete=function(){
	(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	//viewLike(null);
};

initApp=function(request){
	app_id=request.app_id;
	FB.init({
	  appId      : request.app_id,
	  xfbml      : true,
	  version    : 'v2.2'
	});
	window.fbAsyncInit = function() {
		FB.init({
		  appId      : request.app_id,
		  xfbml      : true,
		  version    : 'v2.2'
		});
	};
	FB.getLoginStatus(function(response) {
	  // Check login status on load, and if the user is
	  // already logged in, go directly to the welcome message.
	  if (response.status == 'connected') {
		//TODO call back with fbuid and name
	  } else {
		// Otherwise, show Login dialog first.
		FB.login(function(response) {
		//TODO call back with fbuid and name
		}, {scope: request.scope});
	  }
	});
	
};

onLogin=function(response) {
  if (response.status == 'connected') {
	FB.api('/me?fields=first_name', function(data) {
	  var welcomeBlock = document.getElementById('fb-welcome');
	  welcomeBlock.innerHTML = 'Hello, ' + data.first_name + '!';
	});
  }
};
getLoginStatus=function(request){
FB.getLoginStatus(function(response) {
  // Check login status on load, and if the user is
  // already logged in, go directly to the welcome message.
  if (response.status == 'connected') {
	onLogin(response);
  } else {
	// Otherwise, show Login dialog first.
	FB.login(function(response) {
	  onLogin(response);
	}, {scope: request.scope});
  }
});
};

//log our data to console
logMe=function(val){
	//console.log(val);
	alert(val);
};

//swf object load the game
loadGame=function(){
	var params = {};
	params.quality = "high";
	params.bgcolor = "#000000";
	params.wmode='opaque';
	params.allowscriptaccess = "always";
	params.allowFullScreen = "true";
	params.allowFullScreenInteractive = "true";
	params.menu = false;
	var attributes = {};
	attributes.name = "flashContent";
	attributes.align = "middle";
	swfobject.embedSWF("flashSwf.swf", "flashContent", null,null,"10.2", params,params, params, attributes); 	
};	

viewLike=function (request){
	//logMe("liked liked");
	var fbLike = window.document.getElementById("fbLike");
	//create fblike div
	fbLike.style=null;
	if(request!=null){
		if(request.liked==1){
			fbLike.style="pointerEvents:'none';";
		}else{
			FB.Event.subscribe('edge.create',function(response){
					viewLike({liked:1});
					flashContentCallback(response);
				}
			);
		}
	}
};
//reload the page
reloadPage=function(){
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		top.window.location.href="//apps.facebook.com/"+app_id+"/?start_session=true";
		self.parent.location.reload();
	}
	else
	{// code for IE6, IE5
		window.top.location.href="//apps.facebook.com/"+app_id+"/?start_session=true";
		self.parent.location.reload();
	}
};
onFacebookUiCall=function(obj){
    if(obj.method=='feed'){
    	    FB.ui({method:obj.method,
				   name:obj.name,
				   link:"http://apps.facebook.com/"+app_id+"/?ref=timeline",
				   picture:obj.pic,
				   caption:obj.caption,
				   description:obj.desc
				   },function(response){
						flashContentCallback(response);
				   }
			);
    }else{
    	lastObj=obj;
	    FB.ui({
               method:obj.method,
               message:obj.message,
               to:obj.frindsId
			   },function(response){
					flashContentCallback(response);
				}
			);
    }
}
flashContentCallback=function(response){
	//window.document.flashContent.callback(response);
     console.log(JSON.stringify(response));
};
