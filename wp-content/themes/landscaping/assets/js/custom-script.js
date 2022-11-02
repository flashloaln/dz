(function ($) {
    "use strict";
    $.avia_utilities = $.avia_utilities || {};
    $.avia_utilities.supported = {};
    $.avia_utilities.supports = (function () {
        var div = document.createElement('div'),
            vendors = ['Khtml', 'Ms', 'Moz', 'Webkit', 'O'];
        return function (prop, vendor_overwrite) {
            if (div.style.prop !== undefined) {
                return "";
            }
            if (vendor_overwrite !== undefined) {
                vendors = vendor_overwrite;
            }
            prop = prop.replace(/^[a-z]/, function (val) {
                return val.toUpperCase();
            });

            var len = vendors.length;
            while (len--) {
                if (div.style[vendors[len] + prop] !== undefined) {
                    return "-" + vendors[len].toLowerCase() + "-";
                }
            }
            return false;
        };
    }());

    /* Smartresize */
    (function ($, sr) {
        var debounce = function (func, threshold, execAsap) {
            var timeout;
            return function debounced() {
                var obj = this, args = arguments;

                function delayed() {
                    if (!execAsap)
                        func.apply(obj, args);
                    timeout = null;
                }

                if (timeout)
                    clearTimeout(timeout);
                else if (execAsap)
                    func.apply(obj, args);
                timeout = setTimeout(delayed, threshold || 100);
            }
        }
        // smartresize
        jQuery.fn[sr] = function (fn) {
            return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
        };
    })(jQuery, 'smartresize');
    $(document).ready(function () {
        if($('.top-sidebar').children().length == 0) {
            $('.top-sidebar').css({
                'padding': 0
            });
        }

        if( $('.toolbar-sidebar .container .inner-toolbar').children().length == 0 ) {
            $('.toolbar-sidebar .container').css({
                'padding': 0
            })
        }

        thim_landscaping.init();
    });


    $(window).load(function () {
        if ($('.thim-loading').length > 0) {
            $('.thim-loading').fadeOut(1000, function () {
                $('.thim-loading').remove();
                $('body').removeClass('loading');
            });
        }

        thim_landscaping.parallax();
        thim_landscaping.widget_testimonials();
        thim_landscaping.widget_portfolio();
        thim_landscaping.before_after_box();
        thim_landscaping.magic_line();

    });

    var thim_landscaping = {
        init: function () {
            this.popupShare();
            this.quickview();
            this.back_to_top();
            this.contactform7();
            this.minicart_remove();
            this.searchform();
            this.widget_box();
            this.widget_images_slider();
            this.footer_bottom();
            this.donate_toggle_layout();
            this.menuFixed();
            this.widget_searchbox();
            this.action_toggle();
            this.thim_toggle_div();
            this.widget_client_logo();
            this.widget_team();
            this.widget_counter_box();
            if ($('#main-content').hasClass('thim-line-effect')) { this.effect_line(); }
            this.widget_skillbar();
            this.menuToggle();
            this.thim_button();
        },

        thim_button: function () {
            $('.thim_header_custom_style.thim_header_style5 header.site-header .top-header .top-sidebar .inner-bar .inner-top').css({
                'background-color':  $(this).find('.thim_custom_button').data('button-color')
            });

            $('.thim_custom_button').each(function (index, element) {
                var $id = $(this).data('id');
                var $button_color = $(this).data('button-color');
                var $text_color = $(this).data('text-color');
                var $button_hover_color = $(this).data('button-hover-color');
                var $text_hover_color = $(this).data('text-hover-color');
                $('#' + $id + ' .thim-button').css({
                    'background': $button_color,
                    'color': $text_color,
                    'border-color': $button_color
                });

                var $border_color = $button_color + ' ' + $button_color + ' transparent' + ' ' + $button_color;
                var $border_hover_color = $button_hover_color + ' ' + $button_hover_color + ' transparent' + ' ' + $button_hover_color;
                $('#' + $id + ' .left_button').css({
                    'border-color': $border_color
                });
                $('#' + $id + ' .right_button').css({
                    'border-color': $border_color
                });

                $('#' + $id + ' .thim-button').on('mouseenter', function () {
                    $(this).css({
                        'background': $button_hover_color,
                        'color': $text_hover_color,
                        'border-color': $button_hover_color
                    });
                    $('#' + $id + ' .left_button').css({
                        'border-color': $border_hover_color
                    });
                    $('#' + $id + ' .right_button').css({
                        'border-color': $border_hover_color
                    });
                }).on('mouseleave', function () {
                    $(this).css({
                        'background': $button_color,
                        'color': $text_color,
                        'border-color': $button_color
                    });

                    $('#' + $id + ' .left_button').css({
                        'border-color': $border_color
                    });
                    $('#' + $id + ' .right_button').css({
                        'border-color': $border_color
                    });
                })
            });
        },

        before_after_box: function () {
            $(".thim-before-after-box").twentytwenty();
        },

        /**
         * Magic line header menu
         */
        magic_line: function () {

            if ($(window).width() > 768) {
                var $el, leftPos, newWidth,
                    $mainNav = $("body.thim_header_style2 header.site-header .main-menu >.navbar-nav");

                $mainNav.append("<span id='magic-line'></span>");
                var $magicLine = $("#magic-line");
                var $current = $mainNav.find('.current-menu-item, .current-menu-parent'),
                    $current_a = $current.find('> a');

                if ($current.length <= 0) {
                    return;
                }

                $magicLine
                    .width($current_a.width())
                    .css("left", $current.position().left + parseInt($current_a.css('padding-left')))
                    .data("origLeft", $current.position().left + parseInt($current_a.css('padding-left')))
                    .data("origWidth", $current_a.width());

                $(".main-menu >.navbar-nav >.menu-item").hover(function () {
                    $el = $(this);
                    leftPos = $el.position().left + parseInt($el.find('> a').css('padding-left'));
                    newWidth = $el.find('> a').width();
                    $magicLine.stop().animate({
                        left : leftPos,
                        width: newWidth
                    });
                }, function () {
                    $magicLine.stop().animate({
                        left : $magicLine.data("origLeft"),
                        width: $magicLine.data("origWidth")
                    });
                });
            }

        },

	    widget_skillbar: function () {
		    var $skillbar = $('.thim-widget-skillbar');
		    $skillbar.find('.skill').each(function (key, skill) {
			    var $line = $(skill).find('.line'),
				    value = $line.data('value');
			    $line.animate({
				    'width': value + '%'
			    }, 'slow');
		    });
	    },

        // .thim-line-effect
        effect_line: function () {
            var $line = $('.thim-line-effect'),
                lOffset = $line.offset().top;

            $(window).scroll(function () {
                var current = $(this).scrollTop();
                if (current >= lOffset) {
                    $line.addClass('active');
                } else {
                    $line.removeClass('active');
                }
            });
        },

        widget_portfolio: function () {
            var $portfolios = $('.thim-portfolio');
            $portfolios.each(function (index, portfolio) {

                var $portfolio_items = $(portfolio).find('.portfolio-wrapper'),
                    $portfolio_filter = $(portfolio).find('.filter-wrapper');


                if ($(portfolio).hasClass('style-masonry') || $('body').hasClass('post-type-archive-portfolio')) {

                    $portfolio_items.isotope({
                        itemSelector: '.item',
                        percentPosition: true,
                        masonry: {
                            columnWidth: '.item',
                            fitWidth: true,
                        },
                    });

                    // filter items on button click
                    $portfolio_filter.on('click', 'button', function () {
                        var filterValue = $(this).attr('data-filter');
                        $portfolio_items.isotope({filter: filterValue});

                        $portfolio_filter.find('.is-checked').removeClass('is-checked');
                        $(this).addClass('is-checked');
                    });

                } else if ($(portfolio).hasClass('style-carousel')) {
                    // carousel
                    var rtl_value = false;
                    if ($('body').hasClass('rtl')) {
                        rtl_value = true;
                    }
                    ;
                    var items = $(portfolio).data('items');
                    $portfolio_items.owlCarousel({
                        lazyLoad: true,
                        rtl: rtl_value,
                        nav: true,
                        navText: false,
                        navSpeed: 300,
                        loop: false,
                        responsiveClass: true,
                        responsive: {
                            0: {
                                items: 1
                            },
                            480: {
                                items: 2
                            },
                            768: {
                                items: 3
                            },
                            1024: {
                                items: items
                            }
                        }
                    });

                }

            });
        },

        widget_counter_box: function () {
            $('.counter-box').viewportChecker({
                callbackFunction: function (elem, action) {
                    $('.counter-box .display-percentage').countTo({
                        formatter: function (value, options) {
                            return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '.');
                        }
                    });
                }
            });
        },

        widget_team: function () {
            var rtl_value = false;
            if ($('body').hasClass('rtl')) {
                rtl_value = true;
            }
            ;
            $(".thim-our-team.template-carousel .members").owlCarousel({
                lazyLoad: true,
                rtl: rtl_value,
                nav: true,
                navText: false,
                navSpeed: 300,
                loop: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    1024: {
                        items: 4
                    }
                }
            });
        },

        widget_client_logo: function () {
            var $owlElements = $('.thim-client-logo');
            $owlElements.each(function (index, ele) {
                var option_auto = $(this).data("autoplay"),
                    option_items = $(this).data("items");

                var rtl_value = false;
                if ($('body').hasClass('rtl')) {
                    rtl_value = true;
                }

                $(ele).owlCarousel({
                    rtl: rtl_value,
                    items: option_items,
                    autoplay: option_auto,
                    autoplayHoverPause: true,
                    loop: false,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        320: {
                            items: 2
                        },
                        480: {
                            items: 3
                        },
                        768: {
                            items: 4
                        },
                        1024: {
                            items: 5
                        },
                        1200: {
                            items: option_items
                        }
                    }
                });
            });
        },

        widget_testimonials: function () {
            $('.testimonial-slider').each(function () {
                var elem = $(this),
                    item_visible = parseInt(elem.data('visible')),
                    autoplay = elem.data('autoplay') ? true : false,
                    mousewheel = elem.data('mousewheel') ? true : false;
                var testimonial_slider = $(this).thimContentSlider({
                    items: elem,
                    itemsVisible: item_visible,
                    mouseWheel: mousewheel,
                    autoPlay: autoplay,
                    itemMaxWidth: 75,
                    itemMinWidth: 75,
                    activeItemRatio: 1.18,
                    activeItemPadding: 0,
                    itemPadding: 15,
                    contentPosition: 'top'
                });
                var color = $(this).data('color');
                var avatar = $(this).data('avatar-color');
                $('.thim-content-slider .control-nav').css({'color' : color, 'border-color' : color});
                $('.thim-content-slider .slides-wrapper .scrollable>li .slide-content').css('border', avatar);
                $('.thim-content-slider .slides-wrapper .scrollable>li .slide-content .image_before').css('background', color);
            });

            //  Style 4
            var $owlElements = $('.sc-testimonials.with-carousel');
            $owlElements.each(function (index, ele) {
                var option_items = $(this).data("visible");
                var rtl_value = false;
                if ($('body').hasClass('rtl')) {
                    rtl_value = true;
                }
                ;

                $(ele).owlCarousel({
                    rtl: rtl_value,
                    responsiveClass: true,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        1024: {
                            items: option_items
                        }
                    },
                    margin: 30,
                });
            });
        },

        thim_toggle_div: function () {
            $('.thim-toggle-div').on('click', function (event) {
                event.preventDefault();
                var div_toggle = $(this).data('div');
                var scroll = $(this).data('scroll');

                if (scroll === true) {
                    var scrollH = $(div_toggle).offset().top;
                    $(div_toggle).find('.inner').slideDown();
                    $('html,body').animate({
                        scrollTop: scrollH
                    }, 2500);
                } else {
                    $(div_toggle).find('.inner').slideDown();
                }
            });
        },

        action_toggle: function () {
            $('.thim-link-panel').on('click', '.toggle', function (event) {
                event.preventDefault();
                var close = $(this).data('close'),
                    open = $(this).data('open');
                $('#' + close).slideToggle();
                $('#' + open).slideToggle();
            });
        },

        widget_searchbox: function () {
            $('.thim-search-box').on('click', '.toggle-form', function (e) {
                e.preventDefault();
                $('body').toggleClass('thim-active-search');
                var $search = $(this).parent();
                setTimeout(function () {
                    $search.find('.search-field').focus();
                }, 400);
            });

            $('.thim-search-box .background-toggle').on('click', function (e) {
                e.preventDefault();
                $('body').removeClass('thim-active-search');
            });
        },

        // Toggle layout for archive donate page.
        donate_toggle_layout: function () {
            $('.thim-layout-search').on('click', '.layouts i', function (event) {
                event.preventDefault();
                var layout = $(this).data('layout');
                $('.thim-layout-search .layouts i').removeClass('active');
                $(this).addClass('active');
                $('#donate_main_content').removeClass().addClass(layout);

                var data = {
                    'action': 'thim_session_donate_layout',
                    'layout': layout
                };

                $.ajax({
                    type: "POST",
                    data: data,
                    url: thimpress_donate.ajaxurl,
                    dataType: 'json'
                }).done(function (rs) {

                });

            });
        },


        footer_bottom: function () {
            var $footer_bottom = $('#footer-bottom');
            var $footer = $('footer');
            if ($footer_bottom.length > 0) {
                $footer.css({
                    "margin-bottom": $footer_bottom.height()
                })
            }
        },


        widget_box: function () {


            // Popup video for widget Thim: Box - Style Video
            $('.thim-box .toggle-video').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });

        },

        widget_images_slider: function () {
            $('#thim-images-thumbnail').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                itemWidth: 185,
                itemMargin: 5,
                minItems: 2,
                maxItems: 5,
                directionNav: true,
                prevText: '',
                nextText: '',
                slideshow: false,
                asNavFor: '#thim-images-flex-slider'
            });

            $('#thim-images-flex-slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                directionNav: true,
                prevText: '',
                nextText: '',
                slideshow: false,
                sync: "#thim-images-thumbnail"
            });

            $('#thim-images-flex-slider .flex-direction-nav .flex-prev').on('click', function () {
                $('#thim-images-thumbnail .flex-direction-nav .flex-prev').trigger('owl.prev');
            });

            $('#thim-images-flex-slider .flex-direction-nav .flex-next').on('click', function () {
                $('#thim-images-thumbnail .flex-direction-nav .flex-next').trigger('owl.next');
            });

            var count_flex_slider = $('.thim-images-flex-slider').find('.slides').attr('data-count');
            $('#thim-images-thumbnail .slides li').css({'width': 100 / count_flex_slider + '%'});
        },

        searchform: function () {
            $('.search-form').on('hover', function (event) {
                event.preventDefault();
                $(this).find('.search-field').focus();
            }).on('click', '.toggle-search', function (event) {
                event.preventDefault();
                var $form = $(this).parents('.search-form');
                var $input = $form.find('.search-field');
                if ($input.val() != '') {
                    $form.submit();
                } else {
                    $input.focus();
                }
            });
        },

        // Ajax remove product in mini cart
        minicart_remove: function () {
            $('.widget_shopping_cart').on('click', '.remove', function (e) {
                e.preventDefault();
                var url = $(this).attr('href');
                $('.mini_cart_item').each(function (index, value) {
                    var item_href = $(value).find('a.remove').attr('href');
                    if (url === item_href) {
                        $(value).addClass('removing');
                    }
                });

                var product_id = url.match("remove_item?=(.*)&");
                var data = {
                    'action': 'thim_minicart_remove',
                    'product_id': product_id[1]
                };

                $.ajax({
                    type: "POST",
                    data: data,
                    url: woocommerce_params.ajax_url,
                    dataType: 'json'
                }).done(function (rs) {
                    $('.mini_cart_item.removing').remove();
                    $('.widget_shopping_cart .items-number').html(rs.count);
                    if (rs.count === 0) {
                        $('.widget_shopping_cart_content .cart_list').html('<li class="empty">' + rs.message + '</li>');
                        $('.widget_shopping_cart_content .total,.widget_shopping_cart_content .buttons').remove();
                    } else {
                        $('.widget_shopping_cart_content .total .amount').html(rs.subtotal);
                    }
                });
            });
        },


        contactform7: function () {
            $(".wpcf7-submit").on('click', function () {
                $(this).css("opacity", 0.2);
                $(this).parents('.wpcf7-form').addClass('processing');
                $('input:not([type=submit]), textarea').attr('style', '');
            });

            $(document).on('spam.wpcf7', function () {
                $(".wpcf7-submit").css("opacity", 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $(document).on('invalid.wpcf7', function () {
                $(".wpcf7-submit").css("opacity", 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $(document).on('mailsent.wpcf7', function () {
                $(".wpcf7-submit").css("opacity", 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $(document).on('mailfailed.wpcf7', function () {
                $(".wpcf7-submit").css("opacity", 1);
                $('.wpcf7-form').removeClass('processing');
            });

            $('body').on('click', 'input:not([type=submit]).wpcf7-not-valid, textarea.wpcf7-not-valid', function () {
                $(this).removeClass('wpcf7-not-valid');
            });
        },

        parallax: function () {
            $('.top_site_main.thim-parallax-image').each(function (index, element) {
                $(element).parallax("50%", 0.4);
            });
        },


        // Open popup when click share
        popupShare: function () {
            $('.thim-share-social, .thim-popup-share').on('click', 'a', function (event) {
                event.preventDefault();
                var shareurl = $(this).attr('href');
                var top = (screen.availHeight - 500) / 2;
                var left = (screen.availWidth - 500) / 2;
                var popup = window.open(shareurl, 'social sharing', 'width=550,height=420,left=' + left + ',top=' + top + ',location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1');
                return false;
            });
        },

        // Toggle menu
        menuToggle: function () {

            var winW = $(window).width();
            $('.menu-toggle .inner, .thim-menu > .close-menu, .thim-toggle-mobile-menu').on('click', function (e) {
                e.preventDefault();
                if ($('body').hasClass('thim-active-menu')) {
                    $('body').removeClass('thim-active-menu');
                } else {
                    $('body').addClass('thim-active-menu');
                }

                return false;
            });

            $(document).on('keyup', function (e) {
                if ($('body').hasClass('thim-active-menu')) {
                    if (e.keyCode == 27) {
                        $('body').toggleClass('thim-active-menu');
                    }
                }

                if ($('body').hasClass('thim-active-search')) {
                    if (e.keyCode == 27) {
                        $('body').toggleClass('thim-active-search');
                    }
                }

            });

            $('#wrapper-container').on('click', function (e) {
                if ($('body').hasClass('thim-active-menu') || (winW <= 780 && $('body').hasClass('thim-active-menu'))) {
                    $('body').toggleClass('thim-active-menu');
                }
            });


            $('.menu-item-has-children > a,.menu-item-has-children > span').after('<span class="icon-toggle"><i class="fa fa-angle-down"></i></span>');
            if (winW <= 780) {
                $('.menu-item-has-children .icon-toggle').on('click', function (event) {
                    if ($(this).next('ul.sub-menu').is(':hidden')) {
                        $(this).next('ul.sub-menu').slideDown(500, 'linear');
                        $(this).html('<i class="fa fa-angle-up"></i>');
                    }
                    else {
                        $(this).next('ul.sub-menu').slideUp(500, 'linear');
                        $(this).html('<i class="fa fa-angle-down"></i>');
                    }
                });
            }
            ;

        },


        quickview: function () {
            $('.quick-view').on('click', function (e) {
                /* add loader  */
                e.preventDefault();
                var $product = $(this).parents('.product');

                $product.toggleClass('loading');
                $(this).toggleClass('loading');
                var product_id = $(this).attr('data-prod');
                var data = {action: 'jck_quickview', product: product_id};
                $.post(ajaxurl, data, function (response) {
                    $.magnificPopup.open({
                        mainClass: 'my-mfp-zoom-in',
                        items: {
                            src: '<div class="mfp-iframe-scaler">' + response + '</div>',
                            type: 'inline'
                        }
                    });
                    $('.quick-view').removeClass('loading');
                    $('.product-card .wrapper').removeClass('animate');
                    $product.toggleClass('loading');
                    setTimeout(function () {
                        $('.product-lightbox form').wc_variation_form();
                    }, 600);
                });
            });
        },

        back_to_top: function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $('#back-to-top').addClass('scrolldown').removeClass('scrollup');
                } else {
                    $('#back-to-top').addClass('scrollup').removeClass('scrolldown');
                }
            });
            $('#back-to-top').on('click', function () {
                $('html,body').animate({scrollTop: '0px'}, 800);
                return false;
            });
        },


        // Menu fixed
        menuFixed: function () {
            var $header = $('.site-header');
            var topH = $('.top-header').outerHeight();
            var menuH = $header.outerHeight();
            var latestScroll = 0;
            var width = $(window).width();
            var adminbar = 0;
            var header_top = 0;
            var $toolbar = $('.toolbar-sidebar');
            var toolbarH = ($toolbar.length > 0 && $toolbar.css('display') != 'none' ) ? $toolbar.outerHeight() : 0;
            var target = header_top + toolbarH + menuH;

            var overlay = $('body').hasClass('thim_header_overlay') ? true : false;
            var position = 'relative';

            if ($('body').hasClass('admin-bar')) {
                if (width <= 780) {
                    if (width <= 600) {
                        adminbar = 0;
                        toolbarH = 0;
                    } else {
                        adminbar = 46;
                    }
                } else {
                    adminbar = 32;
                }
            }

            if ($('body').hasClass('thim_fixedmenu')) {

                $(window).scroll(function () {

                    var current = $(this).scrollTop();

                    if ($('body').hasClass('thim-active-search')) {
                        $('body').removeClass('thim-active-search');
                    }

                    if (current >= toolbarH && current > latestScroll) {
                        header_top = adminbar;
                        position = 'fixed';
                        var hClass = 'sticky';
                        $header.css({
                            position: position,
                            top: header_top
                        }).addClass(hClass);
                        if (current >= target) {
                            if (!$header.hasClass('menu-hidden')) {
                                $header.addClass('menu-hidden').removeClass('menu-show');
                            }
                        }
                    }
                    if (current <= toolbarH && current < latestScroll) {
                        if ($header.hasClass('menu-show')) {
                            $header.removeClass('menu-show');
                        }

                        var hClass = '';
                        if (overlay === true) {
                            position = 'fixed';
                            header_top = toolbarH + adminbar;
                            hClass = '';
                        } else {
                            position = 'absolute';
                            header_top = toolbarH;
                            hClass = '';
                        }
                        $header.css({
                            position: position,
                            top: header_top
                        }).addClass(hClass);
                        if (hClass === '') {
                            $header.removeClass('sticky');
                        }

                        var remove_hidden = setInterval(function () {
                            $header.removeClass('menu-hidden');
                        }, 1000);


                        setTimeout(function () {
                            clearInterval(remove_hidden);
                        }, 500);

                    } else if (current > target && current < latestScroll) {
                        if ($header.hasClass('menu-hidden')) {
                            $header.removeClass('menu-hidden').addClass('menu-show');
                        }
                        header_top = adminbar;
                        position = 'fixed';
                        var hClass = 'sticky';
                        $header.css({
                            position: position,
                            top: header_top
                        }).addClass(hClass);
                    }

                    latestScroll = current;
                });

                if (overlay === false) {
                    $('#main-content').css({
                        'padding-top': menuH
                    });
                }
            }

            setTimeout(function () {
                $header.css({
                    top: toolbarH
                });
            }, 500);
        }
    };

})(jQuery);