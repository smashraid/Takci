(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);

(function ($) {
    var $mainNav = $('#menu').children('ul'), optionsList = '<option value="" selected>Navigate...</option>';

    // Regular nav
    $mainNav.on('mouseenter', 'li', function () {
        var $this = $(this), $subMenu = $this.children('ul');
        if ($subMenu.length) $this.addClass('hover');
        $subMenu.hide().stop(true, true).fadeIn(200);
    }).on('mouseleave', 'li', function () {
        $(this).removeClass('hover').children('ul').stop(true, true).fadeOut(50);
    });
    // Responsive nav
    $mainNav.find('li').each(function () {
        var $this = $(this),
					$anchor = $this.children('a'),
					depth = $this.parents('ul').length - 1,
					indent = '';
        if (depth) {
            while (depth > 0) {
                indent += '--';
                depth--;
            }
        }
        optionsList += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
    }).end().after('<select class="responsive-nav">' + optionsList + '</select>');
    $('.responsive-nav').on('change', function () {
        window.location = $(this).val();
    });



    if ($('#section').length) {
        var $mainNav1 = $('#sidebar'),
				optionsList1 = '<option value="" selected>Choose your menu...</option>';
        // Responsive nav
        $mainNav1.find('#section li').each(function () {
            var $this = $(this),
						$anchor = $this.children('a'),
						depth = $this.parents('ul').length - 1,
						indent = '';
            if (depth) {
                while (depth > 0) {
                    indent += '--';
                    depth--;
                }
            }
            optionsList1 += '<option value="' + $anchor.attr('href') + '">' + indent + ' ' + $anchor.text() + '</option>';
        }).end().after('<select class="responsive-nav">' + optionsList1 + '</select>');
        $('.responsive-nav').on('change', function () {
            window.location = $(this).val();
        });
    }
})(jQuery);

$(document).ready(function () {

    if ($.browser.msie) {
        if ($.browser.version == 7.0 || $.browser.version == 8.0) {
            $('body *').each(function () {
                if ($(this).is(':last-child')) {
                    $(this).addClass('last-child');
                }
            });
        }
    }

    $('.viewdesktop').click(function (e) {
        e.preventDefault();
        $('body').removeClass('responsive');
        $('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=0.5, maximum-scale=1');
    });

    $(".st_sharethis").click(function (e) {
        e.preventDefault();
    });

    if ($('#oppp')) {
        //$('#oppp').buttonSelect();
    }

    if ($('#oppp') && $('#pasta-date') && $('#catering-date')) {
        $('#most-date, #pasta-date, #catering-date').datepicker({
            format: 'mm-dd-yyyy'
        });
    }

    $('.scroll').each(
        function () {
            $(this).jScrollPane(
                {
                    showArrows: $(this).is('.arrow')
                }
            );
            var api = $(this).data('jsp');
            var throttleTimeout;
            $(window).bind(
                'resize',
                function () {
                    if ($.browser.msie) {
                        if (!throttleTimeout) {
                            throttleTimeout = setTimeout(
                                function () {
                                    api.reinitialise();
                                    throttleTimeout = null;
                                },
                                50
                            );
                        }
                    } else {
                        api.reinitialise();
                    }
                }
            );
        }
    );


    /* ---------------------------------------------------------------------- */
    /*	Tooltip
    /* ---------------------------------------------------------------------- */

    if ($('a[rel=tooltip]')) {
        $('a[rel=tooltip]').tooltip();
        $('a[rel=tooltip]').click(function (e) {
            e.preventDefault();
        });
    }

    //    if ($("#accordion > li").length) {
    //        $("#accordion > li").mouseover(function () {
    //            if (false == $(this).next().is(':visible')) {
    //                $('#accordion > ul').stop().slideUp(600);
    //            }
    //            $(this).next().stop().slideToggle(600);
    //        });
    //        $('#accordion > ul.active').show();
    //    }




    /* ---------------------------------------------------------------------- */
    /*  Rollover Menu Efect
    /* ---------------------------------------------------------------------- */

    $("#ocultar").click(function () {
        $("#hidden").hide();
    });
    $("#mostrar").hover(function () {
        $("#hidden").show().css('display', 'block');
    });
    $("#hidden").mouseleave(function () {
        $(this).hide();
    });
    $(".locations").mouseenter(function () {
        $(this).find("ul").show();
    });

    /* ---------------------------------------------------------------------- */
    /*	Menu Sidebar Scroll
    /* ---------------------------------------------------------------------- */


    if ($('#fixed').length) {
        $('#fixed').scrollToFixed({
            limit: function () {
                var limit = $('footer').offset().top - $('#fixed').outerHeight(true);
                return limit;
            }
        });
    }

    /* ---------------------------------------------------------------------- */
    /*  Slider Home Page
    /* ---------------------------------------------------------------------- */

    if ($('#gallery ul').length || $('#platos ul').length || $('#newlive ul').length) {
        $.fn.cycle.transitions.carinos = function ($cont, $slides, opts) {
            var w = $cont.css('overflow', 'hidden').width();
            var h = $cont.height();
            opts.before.push(function (curr, next, opts, fwd) {
                $.fn.cycle.commonReset(curr, next, opts, true, true, true);
                if (opts.rev)
                    fwd = !fwd;
                if (opts.nextSlide == 0)
                    fwd = false;
                opts.animOut.left = fwd ? -w : w;
                opts.animOut.top = fwd ? h : -h;

            });
            opts.animIn.left = 0;
            opts.animIn.top = 0;
            opts.cssBefore.top = 0;
            opts.cssBefore.left = 0;
            $('#newlive ul, #platos ul').cycle(opts.nextSlide);
        };

        $('#gallery ul').cycle({
            fx: 'carinos',
            timeout: 5000,
            speed: 1000,
            pager: '#nav ul',
            containerResize: false,
            slideResize: false,
            fit: 1,
            pagerAnchorBuilder: function (i) {
                return '<li class="child-' + i + '"><a href="">' + i + '</a></li>'
            },
            next: '#next',
            prev: '#prev'
        });

        $('#platos ul').cycle({
            fx: 'scrollVert',
            timeout: 0,
            speed: 1000,
            cleartype: true,
            cleartypeNoBg: true
        }).cycle('pause');

        $('#newlive ul').cycle({
            fx: 'scrollHorz',
            timeout: 0,
            speed: 1000,
            cleartype: true,
            cleartypeNoBg: true,
            fit: 1,
            width: 400,
            height: 35
        }).cycle('pause');

    }

    /* ---------------------------------------------------------------------- */
    /*  Pop Up Location
    /* ---------------------------------------------------------------------- */

    var cookiePopUp = $.cookie('isshown');
    var disablePopup = (typeof $.QueryString["isShow"]) !== 'undefined';
    if ((cookiePopUp == "true" || cookiePopUp == null) && !disablePopup) {
        $.fancybox({
            content: $("#popup"),
            closeClick: false,
            openEffect: 'none',
            padding: 0,
            closeEffect: 'none',
            helpers: {
                overlay: {
                    closeClick: false
                }
            },
            beforeShow: function () {
                if ($('#gallery ul').length || $('#platos ul').length || $('#newlive ul').length) {
                    $('#gallery ul').cycle('pause');
                }
            },
            afterClose: function () {
                $.cookie('isshown', false, { expires: 1 });
                parent.$.fancybox.close();
                if ($('#gallery ul').length || $('#platos ul').length || $('#newlive ul').length) {
                    $('#gallery ul').cycle('resume');
                }

            }
        });
    }

    /* ---------------------------------------------------------------------- */
    /*	#popup
    /* ---------------------------------------------------------------------- */
    var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
    var isshowniPhone = $.cookie('isshowniPhone');
    if ($('#addthis').length && isiPhone && (window.location.href.indexOf('menu', 0) != -1 || window.location.href.indexOf('location', 0) != -1) && isshowniPhone == null) {
        $('#addthis').show();
        $('#addthis').scrollToFixed({
            bottom: 0,
            limit: $('#addthis').offset().top
        });
        $('#closeadd').click(function (e) {
            $.cookie('isshowniPhone', false, { expires: 1 });
            e.preventDefault();
            e.stopPropagation();
            $('#addthis').hide();
        });
    }


    /* ---------------------------------------------------------------------- */
    /*  Efect Inputs
    /* ---------------------------------------------------------------------- */

    if (!$.support.placeholder) {
        var active = document.activeElement;
        $(':text').focus(function () {
            if ($(this).attr('placeholder') !== '' && $(this).val() == $(this).attr('placeholder')) {
                $(this).val('').removeClass('hasPlaceholder');
            }
        }).blur(function () {
            if ($(this).attr('placeholder') !== '' && ($(this).val() === '' || $(this).val() == $(this).attr('placeholder'))) {
                $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
            }
        });
        $(':text').blur();
        $(active).focus();
        $('form').submit(function () {
            //$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
        });
    }

    /* ---------------------------------------------------------------------- */
    /*  Social Media - Location Detail
    /* ---------------------------------------------------------------------- */

    var icons = $('#socialMedia li');
    $.each(icons, function (index, value) {
        var result = $(value).find('a').attr('href');
        if (typeof (result) != "undefined") {
            $(this).find('a').show();
        }
    });

    if ($('#map_canvas').length > 0) {
        $.get('/Location/Maps', { locationType: 0 }, function (data) {
            $('#map_canvas').googleMap(data);
        });
    }
    if ($('#map_canvas_all').length > 0) {
        $.get('/Location/Maps', { locationType: 2 }, function (data) {
            $('#map_canvas_all').googleMap(data);
        });
    }
    if ($('#map_canvas_detail').length > 0) {
        $.get('/Location/Maps', { locationType: 3 }, function (data) {
            $('#map_canvas_detail').googleMap(data[0]);
        });
    }
    if ($('#map_canvas_pastapoints').length > 0) {
        $.get('/PastaPoints/Maps', { locationType: 0 }, function (data) {
            $('#map_canvas_pastapoints').googleMap(data);
        });
    }
    if ($('#map_canvas_pastapoints_all').length > 0) {
        $.get('/PastaPoints/Maps', { locationType: 2 }, function (data) {
            $('#map_canvas_pastapoints_all').googleMap(data);
        });
    }
    if ($('#map_canvas_pastapoints_detail').length > 0) {
        $.get('/PastaPoints/Maps', { locationType: 3 }, function (data) {
            $('#map_canvas_pastapoints_detail').googleMap(data);
        });
    }

    if ($('.contentLink').length > 0) {
        var username = $('input[name="username"]').val();
        var menuItems = $('.contentLink').children();
        console.log(username);
        console.log(menuItems);
        if (username != "") {
            $(menuItems[0]).hide();
            $(menuItems[1]).hide();
            $(menuItems[3]).hide();
            $(menuItems[5]).show();
        } else {
            $(menuItems[0]).show();
            $(menuItems[1]).show();
            $(menuItems[3]).show();
            $(menuItems[5]).hide();
        }
    }
});



/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
FUNCTIONS
----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
(function ($) {
    $.fn.onlyNumbers = function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.which || e.keyCode;
                if (!e.shiftKey && !e.altKey && !e.ctrlKey && key != 0 &&
                    key >= 48 && key <= 57 || // numbers
                    key >= 96 && key <= 105 || // Numeric keypad
                //key == 190 || //period
                //key == 188 || //comma
                //key == 109 || //minus
                //key == 110 || //. on keypad
                //key == 32 || //Space Bar
                    key == 8 || //Backspace
                //key == 9 || //Tab
                    key == 13 || //Enter
                    key == 35 || //Home
                    key == 36 || //End
                    key == 37 || //Left Arrow
                    key == 39 || //Right Arrow
                    key == 46 || //Del
                    key == 45 //Ins
                )
                    return true;
                return false;
            });
        });
    };

    $.fn.customValidation = function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.which || e.keyCode;
                if (!e.altKey && !e.ctrlKey && key != 0 &&
                    key >= 65 && key <= 90 || // letters
                    key >= 48 && key <= 57 || // numbers
                    key >= 96 && key <= 105 || // Numeric keypad
                //key == 190 || //period
                    key == 188 || //comma
                //key == 109 || //minus
                //key == 110 || //. on keypad
                    key == 32 || //Space Bar
                    key == 8 || //Backspace
                //key == 9 || //Tab
                    key == 13 || //Enter
                    key == 35 || //Home
                    key == 36 || //End
                    key == 37 || //Left Arrow
                    key == 39 || //Right Arrow
                    key == 46 || //Del
                    key == 45 //Ins
                )
                    return true;

                return false;
            });
        });
    };

    $.fn.googleMap = function (locs) { //google.maps.event.trigger(markers[i], 'click');
        var locations = [];
        if ($.isArray(locs)) {
            locations = locs;
        } else {
            locations.push(locs);
        }

        if (locations.length > 0) {
            var markers = [];
            var infoWindows = [];
            var activeInfoWindows = null;
            var activeMarker = null;
            var boxText = document.createElement("div");

            var infoboxOptions = {
                content: boxText,
                disableAutoPan: false,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-60, -130),
                zIndex: null,
                boxStyle: {
                    background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                    width: "280px"
                },
                closeBoxMargin: "0",
                closeBoxURL: '/asset/img/close.png',
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };
            boxText.style.cssText = "";

            var options = {
                zoom: 6,
                center: new google.maps.LatLng(locations[0].Location.Latitude, locations[0].Location.Longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($(this)[0], options);
            var bounds = new google.maps.LatLngBounds();
            //bounds.extend(new google.maps.LatLng(latitude, longitude));

            //locations.unshift(currentLocation);

            for (var i = 0; i < locations.length; i++) {
                var path = (locations[i].Location.LocationID == locations[0].Location.LocationID) ? "/asset/img/current.png" : "/asset/img/closest.png";
                var icon = new google.maps.MarkerImage(path, null, null, new google.maps.Point(12, 32));
                var marker = new google.maps.Marker({
                    title: locations[i].Location.LocationName,
                    position: new google.maps.LatLng(locations[i].Location.Latitude, locations[i].Location.Longitude),
                    map: map,
                    icon: icon,
                    animation: google.maps.Animation.DROP,
                    address: locations[i].Location.Address1,
                    phone: locations[i].Location.Phone1,
                    detail: locations[i].Location.LocationUrl,
                    direction: 'https://maps.google.com/maps?daddr=' + locations[i].Location.Latitude + ',' + locations[i].Location.Longitude + '&saddr=&f=l&hl=en&sll=30,-96&sspn=0.10228,0.216465&ie=UTF8&z=9&om=1'
                });
                markers.push(marker);
                bounds.extend(marker.position);
                activeInfoWindows = new InfoBox(infoboxOptions);

                google.maps.event.addListener(marker, 'click', function () {
                    //boxText.innerHTML = "<div class='mapoverlay'><h5><a href=''>" + this.title + "</a></h5><p>" + this.address + "<br />" + this.phone + "<br /><a href='" + this.direction + "' target='_blank'>get directions</a></p></div>";
                    boxText.innerHTML = "<div class='mapoverlay'><h5><a href=''>" + this.title + "</a></h5><p>" + this.address + "<br />" + this.phone + "<br /><a href='/" + this.detail + "/Location/Detail'>more info</a><span class='orange'> | </span> <a href='" + this.direction + "' target='_blank'>get directions</a></p></div>";
                    if (activeInfoWindows) {
                        activeInfoWindows.close();
                    }
                    activeMarker = this;
                    infoWindows.push(activeInfoWindows);
                    activeInfoWindows.open(map, this);
                    $(markers).each(function (index, element) {
                        element.setVisible(true);
                    });
                    this.setVisible(false);
                });

                google.maps.event.addListener(activeInfoWindows, 'closeclick', function () {
                    activeMarker.setVisible(true);
                });
            }
            map.fitBounds(bounds);
        }
    };
})(jQuery);


$('#suscriptionForm button[name="submitSuscription"]').click(function (e) {
    var email = $('#suscriptionForm input[name="Email"]').val();
    var reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!reg.test(email)) {
        //$('#suscriptionForm').submit();
        e.preventDefault();
        $("#dialog-message").dialog({
            modal: true,
            resizable: false,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }

        });
    }
});

$('#suscriptionFormMobile input[name="submitSuscription"]').click(function (e) {
    var email = $('#suscriptionFormMobile input[name="Email"]').val();
    var reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!reg.test(email)) {
        //$('#suscriptionForm').submit();
        e.preventDefault();
        $("#dialog-message").dialog({
            modal: true,
            resizable: false,
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }

        });
    }
});

$('#formSearchHeader input[name="zipCode"]').customValidation();
$('#formSearch input[name="zipCode"]').customValidation();
$('#formSearchPopUp input[name="zipCode"]').customValidation();
$('#formSearchMobile input[name="zipCode"]').customValidation();
$('#formSearchAll input[name="zipCode"]').customValidation();

$('#formSearchHeader input[name="searchLocationHeader"]').click(function (e) {
    var zip = $.trim($('#formSearchHeader input[name="zipCode"]').val());
    var reg = /^[,A-Za-z\d\s]+$/;
    if (!reg.test(zip) || zip.toLowerCase().indexOf("zip", 0) != -1 || zip == "") {
        e.preventDefault();
    }
});

$('#formSearch button[name="searchLocation"]').click(function (e) {
    var zip = $.trim($('#formSearch input[name="zipCode"]').val());
    var reg = /^[,A-Za-z\d\s]+$/;
    if (!reg.test(zip) || zip.toLowerCase().indexOf("zip", 0) != -1 || zip == "") {
        e.preventDefault();
    }
});

$('#formSearchMobile button[name="searchLocation"]').click(function (e) {
    var zip = $.trim($('#formSearch input[name="zipCode"]').val());
    var reg = /^[,A-Za-z\d\s]+$/;
    if (!reg.test(zip) || zip.toLowerCase().indexOf("zip", 0) != -1 || zip == "") {
        e.preventDefault();
    }
});

$('#formSearchAll button[name="searchLocationAll"]').click(function (e) {
    var zip = $.trim($('#formSearchAll input[name="zipCode"]').val());
    var reg = /^[,A-Za-z\d\s]+$/;
    if (!reg.test(zip) || zip.toLowerCase().indexOf("zip", 0) != -1 || zip == "") {
        e.preventDefault();
    }
});

$('#formSearchPopUp input[name="searchLocationPopUp"]').click(function (e) {
    var zip = $.trim($('#formSearchPopUp input[name="zipCode"]').val());
    var reg = /^[,A-Za-z\d\s]+$/;
    if (!reg.test(zip) || zip.toLowerCase().indexOf("zip", 0) != -1 || zip == "") {
        e.preventDefault();
    }
});

$('#formSearchMobileLocation button[name="searchMobileLocation"]').click(function (e) {
    var zip = $.trim($('#formSearchMobileLocation input[name="zipCode"]').val());
    var reg = /^[,A-Za-z\d\s]+$/;
    if (!reg.test(zip) || zip.toLowerCase().indexOf("zip", 0) != -1 || zip == "") {
        e.preventDefault();
    }
});

jQuery(document).ready(function () {
    if ($('#btnOrderOnline') || $('h3:contains(your location)')) {
        var companyId = $('[data-companyid]').attr('data-companyid');

        if (companyId == '23' || companyId == '26') {
            $('#btnOrderOnline').show();
            $('.right img:first').css('cursor', 'pointer');
        }

        $('#btnOrderOnline,.right img:first').click(function () {

            if (companyId == '23') {

                location.href = 'http://www.carinosonline.com/menu.asp';
            } else if (companyId == '26') {
                location.href = 'http://www.kampcofoods.com/menu.asp';
            }



        });

    } else if ($('')) {

    }

});
