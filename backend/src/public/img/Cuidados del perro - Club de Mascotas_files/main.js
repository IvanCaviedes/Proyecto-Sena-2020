/* require js - configuration of modules, dependencies and file paths */
require.config({
    baseUrl: (function() {
        var path = '/static';
        var isTeamSite = document.URL.substring(0, 16) == "https://teamsite";
        if (isTeamSite) {
            var tsPath = document.URL.match('default\/main\/(.*\/(?:STAGING|(?:WORKAREA|EDITION)\/[^\/]*))');
            if (tsPath && tsPath[1]) {
                path = '/iw-mount/default/main/' + tsPath[1] + path;
            }
        }
        return path;
    })(),
    paths: {
        'bootstrap'   : 'js/bootstrap.min',
        'breakpoints' : '//s2.bayer.com/breakpoints/1.0/breakpoints',
        'colorbox'    : '//s3.bayer.com/colorbox/1.4.33/jquery.colorbox-min',
        'confirmation': "//s1.bayer.com/confirm.jquery/1.0.0/confirm.jquery.min",
        'domReady!'   : '//s1.bayer.com/domready/2.0.1/domReady',
        'domReady'    : '//s2.bayer.com/domready/2.0.1/domReady',
        'flexslider'  : '//s3.bayer.com/flexslider/2.6.3/jquery.flexslider-min',
        'flowplayer'  : '//s1.bayer.com/flowplayer/6.0.5/flowplayer.min',
        'holder'      : '//s2.bayer.com/holder/2.0/holder',
        'jquery'      : '//s3.bayer.com/jquery/1.12.4/jquery.min',
        'jqueryUi'    : '//s1.bayer.com/jqueryui/1.11.4/jquery-ui.min',
        'swfobject'   : '//s2.bayer.com/swfobject/2.2/swfobject',
        'dropdown'    : '//s3.bayer.com/bootstrap-hover-dropdown/2.0.0/twitter-bootstrap-hover-dropdown.min',
      	'modal'       : 'js/jquery.simplemodal.1.4.4.min',
        'defaults'    : 'js/defaults',
        'functions'   : 'js/functions',
        'socialmedia' : 'components/socialMedia/jquery.socialmedia',
        'validate'    : 'js/jquery.validate',
     	'custom'	  : 'js/custom',
      	'clamp'		  : 'js/clamp',
      	'chosen'	   : 'js/chosen/chosen.jquery.min',
      	'maskedinput'  : 'js/jquery.maskedinput.min'
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"],
            exports: "bootstrap"
        },
        "dropdown": {
            deps: ["jquery"],
            exports: "dropdown"
        },
        "flexslider": {
            deps: ["jquery"],
            exports: "flexslider"
        },
        "colorbox": {
            deps: ["jquery",],
            exports: "colorbox"
        },
        "flowplayer": {
            deps: ["jquery"],
            exports: "flowplayer"
        },
        "socialmedia":  {
            deps: ["jquery"],
            exports: "$.fn.socialMedia"
        },
        "breakpoints":  {
            deps: ["jquery"]
        },
        "defaults":  {
            deps: ["jquery"],
            exports: "defaults"
        },
        "jqueryUi":  {
            deps: ["jquery"],
            exports: "jqueryUi"
        },
      	"clamp":{
        	deps: ["jquery"],
          	exports: "clamp"
        },
        "confirmation": {
            deps: ["jquery", "domReady!"],
            exports: "$.fn.Confirmation"
        },
        "chosen":{
        	deps: ["jquery"],
          	exports: "chosen"
        }
    }
});

/* css paths for modules */
var cssPaths = {
    flexsliderCss : "/static/components/flexslider/flexslider.css",
    colorboxCss   : "//s3.bayer.com/colorbox/1.4.33/colorbox.css",
    flowplayerCss : "//s1.bayer.com/flowplayer/6.0.5/skin/minimalist.css",
    jqueryUi      : "//s2.bayer.com/jqueryui/1.11.4/jquery-ui.min.css",
    socialMediaCss: "/static/components/socialMedia/sm_layout.css",
    chosenCss: "/static/js/chosen/chosen.min.css"
};

/* loads at the beginning */
require(["domReady!", "jquery", "modal", "bootstrap", "dropdown", "holder", "breakpoints", "jqueryUi", "functions", "defaults",  "clamp","chosen"], function() {
    fixIcons();
    breakpointsBehavior();
  	choseninit();
});