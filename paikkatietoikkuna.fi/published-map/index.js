/**
 * @class Oskari.paikkatietoikkuna.Main
 *
 * Launcher class for a paikkatietoikkuna.fi map window
 */
Oskari.clazz.define('Oskari.paikkatietoikkuna.Published', function() {

  this.args = null;
  this.styleBndl = null;
}, {

  /**
   * @method processArgs
   *
   * applies page args to this instance
   */
  processArgs : function(args) {
    this.args = args;
    this.styleBndl = args.style;
  },
  /**
   * @method start
   *
   * starts the application with bundle definitions declared
   * in property appSetup.startupSequence
   */
  start : function() {

    var me = this;

    var appSetup = this.appSetup;
    var appConfig = this.appConfig;
    var app = Oskari.app;

    /* me.applyStyle(appSetup,'ui'); */

    app.setApplicationSetup(appSetup);
    app.setConfiguration(appConfig);
    app.startApplication(function(startupInfos) {
      me.instance = startupInfos.bundlesInstanceInfos['mapfull'].bundleInstance;
    });
  },
  /**
   * @static
   * @property appConfig
   */
  appConfig : {
    // bundle id
    'mapfull' : {
      // properties that will be made available before bundle start()
      // 'key' : 'value'
      // can be accessed in mapfull.start() like: alert('This should return
      // "value" :' + this.key);
    }
  },

  /**
   * @static
   * @property appSetup.startupSequence
   */
  appSetup : {

    startupSequence : [
      // openlayers
      {
        callback : function() {
          // FIXME: this isn't the right place to initiate this
          // seems EPSG3067.js might be loaded before proj4js-compressed.js which causes problems
          Proj4js.getScriptLocation = function() {
            // FIXME: hardcoding
            return "/Oskari/libraries/proj4js-1.0.1/defs";
          };
          Proj4js.defs = {
            "EPSG:3067" : "+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs",
            "EPSG:4326" : "+title=WGS 84 +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"
          };
        },
        // style selection may be done with CSS Links also - just for demo
        title : 'OpenLayers',
        fi : 'OpenLayers',
        sv : '?',
        en : 'OpenLayers',
        bundlename : 'openlayers-default-theme',
        bundleinstancename : 'openlayers-default-theme',
        metadata : {
          "Import-Bundle" : {
            "openlayers-single-full" : {
              bundlePath : '/Oskari/packages/openlayers/bundle/'
            },
            "openlayers-default-theme" : {
              bundlePath : '/Oskari/packages/openlayers/bundle/'
            }
          },
          "Require-Bundle-Instance" : []
        },
        instanceProps : {}
      },

      // main app
      {
        title : 'Map',
        fi : 'Map',
        sv : '?',
        en : 'Map',
        bundlename : 'mapfull',
        bundleinstancename : 'mapfull',
        metadata : {
          "Import-Bundle" : {
            "core-base" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "core-map" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "sandbox-base" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "sandbox-map" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "event-base" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "event-map" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "event-map-layer" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "request-base" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "request-map" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "request-map-layer" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "service-base" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "service-map" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "service-map-full" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "common" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "domain" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "runtime" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            // kovakoodattu konffi
            /*	"layers" : {
                bundlePath : '/Oskari/proof-of-concepts/oskari/bundle/'
                },*/
            "mapmodule-plugin" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "mapwmts" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            },
            "mapfull" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            }
            // paketointi scriptin luontia avustava bundle
            /*
              USAGE: setup callback in the last bundle in sequence:
              callback : function() {
              Oskari.clazz.create('Oskari.tools.Yui').showYuiBuildCmd();
              },
              ,
              "yui" : {
              bundlePath : '/Oskari/packages/tools/bundle/'
              }
            */
          },
          "Require-Bundle-Instance" : []

        },
        instanceProps : {}
      },
      {
        title : 'Info Box',
        fi : 'infobox',
        sv : '?',
        en : '?',
        bundlename : 'infobox',
        bundleinstancename : 'infobox',
        metadata : {
          "Import-Bundle" : {
            "infobox" : {
              bundlePath : '/Oskari/packages/framework/bundle/'
            }
          },
          "Require-Bundle-Instance" : []
        },
        instanceProps : {}
      }]
  }
});


 

/**
 * Start when dom ready
 */
jQuery(document).ready(function() {

  function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
	}


  var args = {
    oskariLoaderMode : 'yui',
    style : 'style1'
  };
  // TODO: setup url & language
  var ajaxUrl = "/web/fi/kartta?p_p_id=Portti2Map_WAR_portti2mapportlet&p_p_lifecycle=1&p_p_state=exclusive&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&_Portti2Map_WAR_portti2mapportlet_fi.mml.baseportlet.CMD=ajax.jsp&";
  
  ajaxUrl += 'zoomLevel=' + getURLParameter('zoomLevel') +'&';
  ajaxUrl += 'coord=' + getURLParameter('coord') +'&';
  ajaxUrl += '&mapLayers=' + getURLParameter('mapLayers') +'&';
  
  Oskari.setLang('fi');

  Oskari.setLoaderMode('dev');
  Oskari.setPreloaded(false);

  if(args.oskariLoaderAsync && args.oskariLoaderAsync == 'on') {
    Oskari.setSupportBundleAsync(true);
  }

  var main = Oskari.clazz.create('Oskari.paikkatietoikkuna.Published');
  main.processArgs(args);

  jQuery.ajax({
    type : 'GET',
    dataType : 'json',
    beforeSend: function(x) {
      if(x && x.overrideMimeType) {
	x.overrideMimeType("application/j-son;charset=UTF-8");
      }
    },

    url : ajaxUrl + 'action_route=GetAppSetup&viewId=' + viewId,
    success : function(appSetup) {
      if (appSetup.startupSequence && appSetup.configuration) {
	main.appSetup.startupSequence = appSetup.startupSequence;
	main.appConfig = appSetup.configuration;
	if (width > 0 && height > 0) {
	  main.appConfig.mapfull.conf.size = 
	    { 
	      width : width, 
	      height : height 
	    };
	}
	//alert(JSON.stringify(main.appConfig, null, 4));
	main.start();
      } else { 
	//alert(JSON.stringify(appSetup, null, 4));
      }
    },
    error : function() {
      alert('GetMapConfiguration failed.');
    }
  });

      /*
        // Deprecated, obsolete
	jQuery.ajax({
	type : 'GET',
	dataType : 'json',
	url : ajaxUrl + 'action_route=GetMapConfiguration',
	success : function(pMapConfiguration) {
	main.appConfig = pMapConfiguration;
	main.start();
      */


});