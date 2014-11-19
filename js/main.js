//Utils
window.log = function(msg) {
	if( typeof console == 'object' && _.isFunction(console.log)) {
		console.log(msg);
	}
};
window.err = function(msg) {
	if( typeof console == 'object' && _.isFunction(console.error)) {
		console.error(msg);
	}
};
//Param can be an array, object or string
window.preloadImage = function(param) {
	switch(typeof param) {
		case 'string':
			window._preloadImage(param);break;
		case 'object':
			_.each(param, window._preloadImage);break;
		default:
			log(this+': preloadImage error, typeof '+(typeof param)+' not allowed');
	}
};
window._preloadImage = function(url) {
	if(_.isString(url)) {
		var img = new Image();
		img.src = url;
	} else log(this+': _preloadImage error, typeof '+(typeof url)+' is not a string');
};

//Routing
/*window.Routing = Backbone.Router.extend({
	default_lang: 'es',
	routes: {
		"": "init",
		"lang/:lang": "initTranslate"
	},
	init: function() {
		this.navigate("lang/" + this.default_lang, {trigger: true});
	},
	initTranslate: function(lang) {
		window.lang = lang || this.default_lang;
		Backbone.trigger('translate',lang);
		//window.buttonsView.do_translate(lang);
	},
	goTo: function(page) {
		log('goTo:'+page);
		var lang = window.lang || this.default_lang;
		var url = page+'.html#lang/'+lang;
		window.location.href = url;
//		window.location.assign();
//		var url = window.location.protocol + '//' + window.location.host;
//		url += page+'#'+window.lang;
//		window.location.href = url;
	}
});*/

//Prevent Lazy-Load images
/*window.loadImages = function() {
	//scroll
	var imgs = ['images/BOTO_scrolla3.png','images/BOTO_scrollb3.png'];
	//lang es
	imgs = imgs.concat(['images/BOTO_esp1.png','images/BOTO_esp2.png','images/BOTO_esp3.png']);
	//lang en
	imgs = imgs.concat(['images/BOTO_eng1.png','images/BOTO_eng2.png','images/BOTO_eng3.png']);
	//lang ca
	imgs = imgs.concat(['images/BOTO_cat1.png','images/BOTO_cat2.png','images/BOTO_cat3.png']);
	//info
	imgs = imgs.concat(['images/BOTO_info1.png','images/BOTO_info2.png','images/BOTO_info3.png']);
	//mail
	imgs = imgs.concat(['images/BOTO_mail1.3.png','images/BOTO_mail2.png','images/BOTO_mail3.png']);

	return preloadImage(imgs);
}*/

//dw_scroll
window.id_scroll = 'lyr1';
function init_dw_Scroll() {
	// arguments: id of scroll area div, id of content div
	window.dw_scrollObjInstance = new dw_scrollObj('wn', window.id_scroll);
	// args: id, axis ('v' or 'h'), eType (event type for arrows),
	// bScrollbar (include track and dragBar? true or false)
	dw_scrollObjInstance.buildScrollControls('scrollbar', 'h', 'mouseover', true);

	//Lenin: Windows resize & init scroll
	dw_Event.add( window, 'resize', function(){ window.dw_scrollObjInstance.updateDims(); } );
	window.dw_scrollObjInstance.initScrollVals(0);
}

//MAIN
$(document).ready(function() {
	//Carrousel: if code supported, link in the style sheet (optional) and call the init function onload
	if ( $("#"+window.id_scroll).length && typeof dw_scrollObj != 'undefined' && dw_scrollObj.isSupported() ) {
//		dw_Util.writeStyleSheet('css/scrollbar_h.css'); //Petoncio
		dw_Event.add( window, 'load', init_dw_Scroll);
	}
//Menu active
	$("#menuRight > #editorial").click(function() {
		$("#editorial").addClass("activeMenu");
		$("#identity,#promotion,#events,#illustration,#intro").removeClass("activeMenu");
	});

	$("#menuRight > #identity").click(function() {
		$("#identity").addClass("activeMenu");
		$("#editorial,#promotion,#events,#illustration,#intro").removeClass("activeMenu");
	});

	$("#menuRight > #promotion").click(function() {
		$("#promotion").addClass("activeMenu");
		$("#identity,#editorial,#events,#illustration,#intro").removeClass("activeMenu");
	});

	$("#menuRight > #events").click(function() {
		$("#events").addClass("activeMenu");
	$("#identity,#promotion,#editorial,#illustration,#intro").removeClass("activeMenu");
	});
	$("#menuRight > #illustration").click(function() {
		$("#illustration").addClass("activeMenu");
		$("#identity,#promotion,#events,#editorial,#intro").removeClass("activeMenu");
	});
	$("#menuRight > #intro > a").click(function() {
		$("#intro > a").addClass("activeMenu");
		$("#identity,#promotion,#events,#illustration,#editorial").removeClass("activeMenu");
	});



	//About page translations
	$("#idiomes > #catala").click(function() {
		$("#content_espanol,#content_english,#content_french").addClass("hide");
		$("#content_catala").removeClass("hide");
		$("#catala").addClass("active");
		$("#espanol,#french,#english").removeClass("active");
	});
	$("#idiomes > #espanol").click(function() {
		$("#content_catala,#content_english,#content_french").addClass("hide");
		$("#content_espanol").removeClass("hide");
		$("#espanol").addClass("active");
		$("#catala,#french,#english").removeClass("active");
	});
	$("#idiomes > #english").click(function() {
		$("#content_catala,#content_espanol,#content_french").addClass("hide");
		$("#content_english").removeClass("hide");
		$("#english").addClass("active");
		$("#espanol,#french,#catala").removeClass("active");
	});
	$("#idiomes > #french").click(function() {
		$("#content_catala,#content_espanol,#content_english").addClass("hide");
		$("#content_french").removeClass("hide");
		$("#french").addClass("active");
		$("#espanol,#english,#catala").removeClass("active");
	});

	//Footer
	$("#footer_icons").children(':not(#footer_info)').hover(
		//In hover
		function() {
			var $childrens = $("#footer_icons #footer_info").children();
			$childrens.addClass('hide');
			var actual_position = $(this).attr('id').substr(7);
			$childrens.filter("#"+actual_position).removeClass('hide');
		},
		//Out hover
		function() {
			$("#footer_icons #footer_info").children().addClass('hide');
			if($("#footer_icons #footer_about").hasClass('active')) {
				$("#footer_icons #footer_info #about").removeClass('hide');
			}

		}
	);

/*	Code from bookandlook
	window.routing = new window.Routing();
//	window.views = new window.Views();
	window.buttonsView = new window.ButtonsView();
	window.logosView = new window.LogosView();

	loadImages();

	Backbone.history.start(); //{pushState: true}*/

});

/**
 * Google Analytics
 * @ToDo: posar a _setAccount un compte de google analytics real
 **/
//var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
//(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
//g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
//s.parentNode.insertBefore(g,s)}(document,'script'));
