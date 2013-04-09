//     JQuery Text resize + Cookie recall
//     Ben Hayes, January 2010 | info@jackfruitdesign.com
//     Based initially on a script from http://www.shopdev.co.uk/blog/text-resizing-with-jquery/
//     This script gives a simplified binary option: normal or large text

//      Script modified by Jure Bergant, March 2013
//      Now resizing by steps, limited by MIN and MAX

$(document).ready(function() {

    // declare a few constants:
    var MIN = 8; //small font size in pixels
    var DEFAULT_FONT = 16;
    var DEFAULT_LINEHEIGHT = 20;
    var MAX = 36; //larger size in pixels
    var COOKIE_NAME = "Simple-Fontresizer"; //Maybe give this the name of your site.
    var UNITS = "px";

    //make it default
    var fontsize = DEFAULT_FONT;
    var lineheight = DEFAULT_LINEHEIGHT;

    // Only show text resizing links if JS is enabled
    $(".fontresize").show();

    // if cookie exists set font size to saved value, otherwise create cookie
    if($.cookie(COOKIE_NAME + "_fontsize")) {
        fontsize = $.cookie(COOKIE_NAME + "_fontsize");
        //set initial font size for this page view:
        $("body").css("font-size", fontsize + UNITS);

    } else {
        $.cookie(COOKIE_NAME + "_fontsize", fontsize);
    }
    if($.cookie(COOKIE_NAME + "_lineheight")) {
        lineheight = $.cookie(COOKIE_NAME + "_lineheight");
        //set initial font size for this page view:
        $("body").css("line-height", lineheight + UNITS);

    } else {
        $.cookie(COOKIE_NAME + "_lineheight", lineheight);
    }

    // large font-size link:
    $("#large").bind("click", function() {
        if(fontsize < MAX) {
            fontsize = parseInt(fontsize) + 1;
            lineheight = parseInt(lineheight) + 1;
            $("body").css("font-size", fontsize + UNITS);
            $("body").css("line-height", lineheight + UNITS);
            $.cookie(COOKIE_NAME + "_fontsize", fontsize);
            $.cookie(COOKIE_NAME + "_lineheight", lineheight);
        }
        return false;
    });

    // default font-size link:
    $("#default").bind("click", function() {
        fontsize = DEFAULT_FONT;
        lineheight = DEFAULT_LINEHEIGHT;
        $("body").css("font-size", fontsize + UNITS);
        $("body").css("line-height", lineheight + UNITS);
        $.cookie(COOKIE_NAME + "_fontsize", fontsize);
        $.cookie(COOKIE_NAME + "_lineheight", lineheight);
        return false;
    });

    // small font-size link:
    $("#small").bind("click", function() {
        if(fontsize > MIN) {
            fontsize = parseInt(fontsize) - 1;
            lineheight = parseInt(lineheight) + 1;
            $("body").css("font-size", fontsize + UNITS);
            $("body").css("line-height", lineheight + UNITS);
            $.cookie(COOKIE_NAME + "_fontsize", fontsize);
            $.cookie(COOKIE_NAME + "_lineheight", lineheight);
        }
        return false;
    });
});
