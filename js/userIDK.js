$(document).ready(function() {
    var path = window.location.pathname;
    var filename = path.match(/.*\/([^/]+)\.([^?]+)/i)[1];  //Use this in the case that you don't want your query string to be part of your filename (which you probably don't).

    //////////////////////////////////////////
    //  prilagajanje scrollable containerja //
    //////////////////////////////////////////
    if (filename == "domov") {
        $(".container").css('padding-top', '0px');
        $(".container").css('padding-bottom', '173px');
    }
    else if (filename == "storitve") {
        $(".container").css('padding-top', '85px');
        $(".container").css('padding-bottom', '173px');
    }
    else if (filename == "kontakt") {
        $(".container").css('padding-top', '85px');
        $(".container").css('padding-bottom', '103px');
    }
    else {
        // tole so default vrednosti
        $(".container").css('padding-top', '85px');
        $(".container").css('padding-bottom', '173px');
    }

    ////////////////////////////////////
    // inicializiraj posamezne strani //
    ////////////////////////////////////
    if (filename == "o_nas") {
        img = $("header img");
        img.css({
            width: '4.9em',
            height: '3.85em',
            bottom: '-0.5em'
        });
        // skrij print img
        $("div.print img").css('visibility', 'hidden');
    }
    else if (filename == "projekti") {
        // zamenjaj sliko v headerju
        img = $("header img");
        img.attr("src", "imgs/zivalice na gugalnici.png");
        img.css({
            width: '14.3em',
            height: '4.19em',
            bottom: '0em'
        });
        // prikazi print img
        $("div.print img").css('visibility', 'visible');
    }
    else if (filename == "storitve") {
        // zamenjaj sliko v headerju
        img = $("header img");
        img.attr("src", "imgs/kaca polz.png");
        img.css({
            width: '5.24em',
            height: '4.48em',
            bottom: '-2.8em',
            right: '15%'
        });
        // skrij print img
        $("div.print img").css('visibility', 'hidden');
        // skrij sidepane
        $("div.sidepane aside").css('visibility', 'hidden');

    }
    else if (filename == "povezave") {
        img = $("header img");
        img.css({
            width: '9.1em',
            height: '7.2em',
            bottom: '0em'
        });
        // skrij print img
        $("div.print img").css('visibility', 'hidden');
        // skrij sidepane
        $("div.sidepane aside").css('visibility', 'hidden');
    }
    else if (filename == "kontakt") {
        img = $("header img");
        img.css({
            width: '7.2em',
            height: '2.38em',
            bottom: '0.5em'
        });
        // skrij print img
        $("div.print img").css('visibility', 'hidden');
    }

    ///////////////////////////////////
    // inicializiraj div-e z vsebino //
    ///////////////////////////////////
    $("div.content").hide();
    if (filename == "o_nas") {
        $("div#o_nas").show()
    }
    else if (filename == "projekti") {
        $("div#uvod").show();
    }
    else if (filename == "storitve") {
        $("div#storitve").show();
        $("div.sredina div.opomba").hide();
    }
    else if (filename == "povezave") {
        $("div#povezave").show();
    }

    ///////////////////////////
    // inicializiraj tooltip //
    ///////////////////////////
    $("div.fontresize a").tooltip();
    $("div.selectlanguage a").tooltip();
    $(".opomba_tooltip").tooltip();

    ////////////////////////////////////////////
    // click handler za linke na desni strani //
    ////////////////////////////////////////////
    $("ul li.title a, ul li.subtitle a, h1.o_nas_link_ime a, a.link_tekst_js").click(function() {
        // zamenjaj prikazani div
        $("div.content").hide();
        targetid = $(this).attr('href');
        $(targetid).show();

        // zamenjaj sliko v headerju
        img = $("header img");
        if (targetid=="#zahodna_sahara") { // projekti.html
            img.hide();
            // startaj slideshow
            //$(".slideshow").cycle();
            setInterval( "slideSwitch()", 5000 );
        }
        else {
            img.show();
            if (targetid.indexOf("#vec_zensk") != -1 || targetid.indexOf("#seznam_organizacij") != -1) { // projekti.html
                img.attr("src", "imgs/muca in pticki.png");
                img.css({
                    width: '17.48em',
                    height: '5.28em',
                    bottom: '-0.7em'
                });
                return false;
            }
            else if (targetid.indexOf("#paket_") != -1) { // storitve.html
                img.attr("src", "imgs/paketi mravlice.png");
                img.css({
                    width: '21.57em',
                    height: '4.27em',
                    bottom: '-0.1em',
                    right: '8.4%'
                });
                $("div#paketi_zgoraj").show();
                $("div#paketi_opomba").show();
                // prikazi sidepane
                $("div.sidepane aside").css('visibility', 'visible');
                // scroll-aj samo pakete - zgornja in spodnja opomba naj bosta pri miru
                $(".content-scrollable").css('height', '59%');
//                $(".content-scrollable").css('width', '87%');
                return false;
            }
        }
    });

    //////////////////
    // kontakt.html //
    //////////////////
    var request;
    $("#contactform").submit(function(event) {
        $("span.formoutput").text("");

        if (request) {
            request.abort();
        }
        event.preventDefault();

        var $form = $(this);
        var $inputs = $form.find("input,select,button,textarea");
        var serializedData = $form.serialize();

        $inputs.prop("disabled", true);

        var request = $.ajax({
            url: "php/kontakt_poslji_mail.php",
            type: "post",
            data: serializedData
        });

        request.done(function (response, textStatus, jqXHR) {
            // Zbrisi polja
            $("#kontakt_sporocilo span.help-inline").text("");
            $("#kontakt_email span.help-inline").text("");
            // Zbrisi barve
            $("#kontakt_sporocilo").removeClass("error");
            $("#kontakt_email").removeClass("error");
            if (response == "\r\n") {
                // Uspesno poslano
                $("span.formoutput").addClass("success");
                if ($("#kontakt_email input").val() == "") {
                    $("span.formoutput").text("Hvala za sporočilo.");
                }
                else {
                    $("span.formoutput").text("Hvala za sporočilo.  Odgovorili vam bomo takoj, ko bomo lahko.");
                }


                $("#kontakt_sporocilo textarea").val("");
                $("#kontakt_email input").val("");
            }
            else {
                // Prislo je do napake v php skripti
                // response je string vseh error-jev, vsak v svoji vrstici
                response = response.replace('\r\n', ''); // na zacetku string je \r\n
                var errors = response.split('\n');  // ce je vec napak, jih razbij v vrstice
                var buff = '';
                $.each(errors, function(index, error) {
                    if (error != '') {
                        buff = error.split('|'); // primer vrstice: "kontakt_sporocilo|Neveljaven e-naslov."
                        $("#" + buff[0] + " span.help-inline").text(buff[1]);
                        $("#" + buff[0]).addClass("error");
                    }
                });
            }
        });
        request.fail(function (jqXHR, textStatus, errorThrown) {
            // Prislo je do napake pri klicu php skripte
            $("span.formoutput").text(errorThrown);
        });
        request.always(function() {
            $inputs.prop("disabled", false);
        });
    });

    ////////////////
    // domov.html //
    ////////////////
    $("div.slideable").hide();

    $("span.slidedown").click(function(e) {
        var data_target_index = $(this).attr("data-target-index");
        $("#slideable_" + data_target_index).slideToggle();
        $(this).slideToggle();
        $("#slideup_" + data_target_index).addClass("slidelink");
        return false;
    });

    $("span.slideup").click(function(e) {
        var data_target_index = $(this).attr("data-target-index");
        $("#slideable_" + data_target_index).slideToggle();
        $("#slidedown_" + data_target_index).slideToggle();
        $(this).removeClass("slidelink");
        return false;
    });
});


function slideSwitch() {
    var $active = $('#slideshow IMG.active');

    if ( $active.length == 0 ) $active = $('#slideshow IMG:last');

    var $next =  $active.next().length ? $active.next()
        : $('#slideshow IMG:first');

    $active.addClass('last-active');

    $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function() {
            $active.removeClass('active last-active');
        });
}