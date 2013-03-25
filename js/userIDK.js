$(document).ready(function() {
    var path = window.location.pathname;
    var filename = path.match(/.*\/([^/]+)\.([^?]+)/i)[1];  //Use this in the case that you don't want your query string to be part of your filename (which you probably don't).

    // inicializiraj posamezne strani
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


    // inicializiraj div-e z vsebino
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


    // inicializiraj tooltip
    $("div.fontresize a").tooltip();
    $("div.selectlanguage a").tooltip();

    // click handler za linke na desni strani
    $("ul li.title a, ul li.subtitle a, h1.o_nas_link_ime a").click(function() {
        // zamenjaj prikazani div
        $("div.content").hide();
        targetid = $(this).attr('href');
        $(targetid).show();

        // zamenjaj sliko v headerju
        img = $("header img");
        if (targetid=="#zahodna_sahara") { // projekti.html
            img.hide();
        }
        else {
            img.show();
            if (targetid=="#uvod") { // projekti.html
                img.attr("src", "imgs/zivalice na gugalnici.png");
                img.css({
                    width: '14.3em',
                    height: '4.19em',
                    bottom: '0em'
                });
            }
            else if (targetid.indexOf("#vec_zensk") != -1 || targetid.indexOf("#seznam_organizacij") != -1) { // projekti.html
                img.attr("src", "imgs/muca in pticki.png");
                img.css({
                    width: '17.48em',
                    height: '5.28em',
                    bottom: '-0.7em'
                });
            }
            else if (targetid.indexOf("#paket_") != -1) { // storitve.html
                img.attr("src", "imgs/paketi mravlice.png");
                img.css({
                    width: '21.57em',
                    height: '4.27em',
                    bottom: '-0.1em',
                    right: '8.4%'
                });
                $("div.sredina div#paketi_zgoraj").show();
                $("div.sredina div#paketi_opomba").show();
            }
        }
    });
});