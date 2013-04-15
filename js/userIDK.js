$(document)
    .on('click', 'a[href*="#"]', function(event) {
//            event.preventDefault();
//            var linkLocation = this.href;
//            $(".content-scrollable").fadeOut(1000, function() {
//                window.location = linkLocation;
//            });
            if ( this.hash ) {
                $.bbq.pushState( '#/' + this.hash.slice(1) );
                return false;
            }
    })
    .ready(function() {
//        alert("ready");
//        $(".content-scrollable").css('display', 'none');
//        $(".content-scrollable").fadeIn(500);

//        $('a [href*="#"]').click(function(event) {
//            if (this.className != "no_fade_out" ) {
//                event.preventDefault();
//                var linkLocation = this.href;
//                $(".content-scrollable").fadeOut(500, function() {
//                    window.location = linkLocation;
//                });
//            }
//            if ( this.hash ) {
//                $.bbq.pushState( '#/' + this.hash.slice(1) );
//                return false;
//            }
//        });

        var path = window.location.pathname;
        var filename = path.match(/.*\/([^/]+)\.([^?]+)/i)[1];  //Use this in the case that you don't want your query string to be part of your filename (which you probably don't).

        var columnized = false;
        $(window).bind('hashchange', function(event) {
            var tgt = location.hash.replace(/^#\/?/,'');
            if ( tgt != "" ) {
                // there is hash in address --> scroll to it
                var element = document.getElementById(tgt);
                if (element.className == "content" ) {
//                    alert("1");
//                    $(".content-scrollable").css('display', 'none');
//                    $(".content-scrollable").fadeIn(500);
                    $("div.content").hide();
                    $("#" + tgt).show();
                    $(".content-scrollable").animate({scrollTop:$('#' + tgt).offset().top-90}, 500);
                }
                else if (element.className.indexOf("subcontent") != -1) {
//                    alert("2");
                    $("div.content").hide();
                    var parent_content = $("#" + tgt).attr('data-parent-content');
                    $("#" + parent_content).show();
                    $(".content-scrollable").animate({scrollTop:$('#' + tgt).offset().top-90}, 500);
                }
                else {
//                    alert("3");
                    $(".content-scrollable").animate({scrollTop:$('#' + tgt).offset().top-90}, 500);
                }


                img = $("header img");
                img.show();
                if (element.id =="zahodna_sahara") { // projekti.html
                    img.hide();
                    // startaj slideshow
                    setInterval( "slideSwitch()", 5000 );
                    // zapri podnaslove od vec_zensk
                    $(".subtitle").slideUp();
                }
                else if (element.id == "vec_zensk") {
                    $(".subtitle").slideDown();
                    img.attr("src", "imgs/muca in pticki.png");
                    img.css({
                        width: '17.48em',
                        height: '5.28em',
                        bottom: '-0.7em'
                    });
                    if (!columnized) {
                        $("#vec_zensk div.twocolumns").columnize({columns:2});
                        columnized = true;
                    }
                }
                else if (element.id == "seznam_organizacij") {
                    img.attr("src", "imgs/muca in pticki.png");
                    img.css({
                        width: '17.48em',
                        height: '5.28em',
                        bottom: '-0.7em'
                    });
                    // zapri podnaslove od vec_zensk
                    $(".subtitle").slideUp();
//                    $(".content_scrollable").scrollTo(0,0);
                    $(".content-scrollable").animate({scrollTop:$('#' + tgt).offset().top-100}, 500);
                }
                else if (element.id.indexOf("paket_") != -1) { // storitve.html
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
//                    $(".content-scrollable").css('height', '162px');
                }
                else if (element.id == "opomba_tooltip_storitve") {
                    return false;
                }
            }
            else {
//                alert("4");
//                $(".content-scrollable").css('display', 'none');
//                $(".content-scrollable").fadeIn(500);

                // no hash in address --> init page
                $("div.content").hide();
                img = $("header img");
                ////////////////////////////////////
                // inicializiraj posamezne strani //
                ////////////////////////////////////
                if (filename == "domov") {
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
                }
                else if (filename == "o_nas") {
                    img.css({
                        width: '4.9em',
                        height: '3.85em',
                        bottom: '-0.5em'
                    });
                    // prikazi div z vsebino
                    $("div#o_nas").show();
                    // skrij print img
                    $("div.print img").css('visibility', 'hidden');
                }
                else if (filename == "projekti") {
                    // zamenjaj sliko v headerju
                    img.attr("src", "imgs/zivalice na gugalnici.png");
                    img.css({
                        width: '14.3em',
                        height: '4.19em',
                        bottom: '0em'
                    });
                    // prikazi div z vsebino
                    $("div#uvod").show();
                    // prikazi print img
                    $("div.print img").css('visibility', 'visible');
                    // skrij subtitle
                    $(".subtitle").hide();
                }
                else if (filename == "storitve") {
                    // zamenjaj sliko v headerju
                    img.attr("src", "imgs/kaca polz.png");
                    img.css({
                        width: '5.24em',
                        height: '4.48em',
                        bottom: '-2.8em',
                        right: '15%'
                    });
                    // prikazi div z vsebino
                    $("div#storitve").show();
                    $("div.sredina div.opomba").hide();
                    // skrij print img
                    $("div.print img").css('visibility', 'hidden');
                    // skrij sidepane
                    $("div.sidepane aside").css('visibility', 'hidden');

                }
                else if (filename == "povezave") {
                    img.css({
                        width: '9.1em',
                        height: '7.2em',
                        bottom: '0em'
                    });
                    // prikazi div z vsebino
                    $("div#povezave").show();
                    // skrij print img
                    $("div.print img").css('visibility', 'hidden');
                    // skrij sidepane
                    $("div.sidepane aside").css('visibility', 'hidden');
                }
                else if (filename == "kontakt") {
                    //////////////////
                    // kontakt.html //
                    //////////////////
                    img.css({
                        width: '7.2em',
                        height: '2.38em',
                        bottom: '0.5em'
                    });
                    // skrij print img
                    $("div.print img").css('visibility', 'hidden');

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
                }
            }
        });

        $(window).trigger('hashchange');


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


        ///////////////////////////
        // inicializiraj tooltip //
        ///////////////////////////
        $("div.fontresize a").tooltip();
        $("div.selectlanguage a").tooltip();
        $(".opomba_tooltip").tooltip();
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