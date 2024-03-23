(function ($) {
    $(document).ready(function () {
        // cart dropdown  up slide
        $(".cart-dropdown-btn").click(function(){
            $(".cart-dropdown-menu").slideToggle();
          });

        //   rotate pluse icon click on
        $(".responsive-navbar .nav-item").click(function(){
            $(".pluse-icon").toggleClass("rotate-icon")
        });
        //   rotate pluse icon click on
        $(".responsive-navbar").click(function(){
            $(".sub-menu").slideToggle();
        });
        //btn mouse hover base on mouse pointer
        $(".btn-1 , .icon-btn").mousemove(function (event) {
            var innerText = $(this).find(".inner-text");
            var btnOffset = $(this).offset();
            var btnWidth = $(this).outerWidth();
            var btnHeight = $(this).outerHeight();
            var centerX = btnOffset.left + btnWidth / 2;
            var centerY = btnOffset.top + btnHeight / 2;
            var offsetX = (event.pageX - centerX) * 0.15; // Adjust as needed
            var offsetY = (event.pageY - centerY) * 0.2; // Adjust as needed

            var transformValue = "translate3d(" + offsetX + "px, " + offsetY + "px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
            innerText.css("transform", transformValue);
        });

        $(".btn-1 , .icon-btn").mouseleave(function () {
            $(this).find(".inner-text").css("transform", "none");
        });
        // video mouse hover base on mouse pointer
        function moveBtn(wrapper, event) {
            var videoBtn = $(wrapper).find(".popup-video");
            const pointerPageX = event.pageX;
            const pointerPageY = event.pageY;
            const sectionOffsetLeft = $(wrapper).offset().left;
            const sectionOffsetTop = $(wrapper).offset().top;
            const leftPixel = pointerPageX - sectionOffsetLeft - videoBtn.width() / 2;
            const topPixel = pointerPageY - (sectionOffsetTop + $(wrapper).height() / 2) - videoBtn.height() / 2;

            var transformedValue = "translate3d(" + leftPixel + "px, " + topPixel + "px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
            videoBtn.css({
                transform: transformedValue,
            });
        }
        $(".about-us-video").mousemove(function (event) {
            setInterval(moveBtn(this, event), 100);
        });
        $(".about-us-video").mouseleave(function () {
            $(this).find(".popup-video").css({
                transform: "translateX(-50%) translateY(-50%)",
                left: "0",
                top: "50%",
            });
        });
        // swiper active
        // hot-deal-slider
        const hot_deal_slider = new Swiper(".hot-deal-slider", {
            // Optional parameters
            direction: "vertical",
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000, // Autoplay delay in milliseconds
                disableOnInteraction: false, // Prevent autoplay from stopping on user interaction
            },
            // And if we need scrollbar
            scrollbar: {
                el: ".swiper-scrollbar",
            },
        });
        // most-popular-item-slider
        var most_popular_item_slider = new Swiper(".most-popular-item-slider", {
            slidesPerView: "auto",
            spaceBetween: 0,
            freeMode: true,
            loop: true,
            allowTouchMove: false,
            speed: 7000,
            autoplay: {
                delay: 0,
            },
        });
        // our-sponsor-slider
        var our_sponsor_slider = new Swiper(".our-sponsor-slider", {
            slidesPerView: 6,
            freeMode: true,
            loop: true,
            allowTouchMove: false,
            speed: 10000,
            autoplay: {
                delay: 0,
            },
        });
        // customer-testimonial-slider
        var customer_testimonial_slider = new Swiper(".customer-testimonial-slider", {
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
        // header-offcanvas-inner-slider
        var customer_testimonial_slider = new Swiper(".header-offcanvas-inner-slider", {
            slidesPerView: 3,
            spaceBetween: 15,
            autoplay: {
                delay: 1000,
            },
        });

        // counter up active
        var counterUp = window.counterUp["default"]; // import counterUp from "counterup2"

        var $counters = $(".counter");

        /* Start counting, do this on DOM ready or with Waypoints. */
        $counters.each(function (ignore, counter) {
            var waypoint = new Waypoint({
                element: $(this),
                handler: function () {
                    counterUp(counter, {
                        duration: 3000,
                        delay: 5,
                    });
                    this.destroy();
                },
                offset: "bottom-in-view",
            });
        });

        //
        function setCaptionWidth() {
            var windowWidth = $(window).width();
            var bannerContainer = $(".banner-section .container");
            var containerWidth = bannerContainer.outerWidth();

            var rightOffsetWidth = $(window).width() - bannerContainer.offset().left - containerWidth;
            var additionalWidth = 12; // Additional fixed width
            var captionWidth = windowWidth - containerWidth - rightOffsetWidth + additionalWidth;

            $(".hot-deal-caption").css("width", captionWidth + "px");
        }

        // Call the function initially
        setCaptionWidth();

        // Call the function when the window is resized
        $(window).resize(function () {
            setCaptionWidth();
        });

        // magnific Popup
        $(".trigger-popup").magnificPopup({
            type: "iframe",
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allow="autoplay"></iframe>' + "</div>",
                patterns: {
                    youtube: {
                        index: "youtube.com/",
                        id: "v=",
                        src: "https://www.youtube.com/embed/%id%?autoplay=1",
                    },
                },
            },
        });

        // Sub menu Drop down
        // $(".offcanvas-nav li a").click(function (e) {
        // 	e.preventDefault();
        // 	var subMenu = $(this).next("ul");
        // 	if (subMenu.length > 0) {
        // 		if (subMenu.is(":visible")) {
        // 			subMenu.slideUp("fast");
        // 			subMenu.parent().removeClass("active");
        // 		} else {
        // 			$(this).parent().siblings().find("ul").slideUp("fast");
        // 			$(this).parent().siblings().find("ul").parent().removeClass("active");
        // 			subMenu.slideDown("fast");
        // 			subMenu.parent().addClass("active");
        // 		}
        // 		e.stopPropagation();
        // 	}
        // });

        // Wow JS
        new WOW().init();

        var textContainer = $(".slider-text-wrapper span");
        var words = textContainer.text().split(" ");
        textContainer.empty();

        $.each(words, function (index, word) {
            var span = $("<span>").text(word + " ");
            if (index % 2 === 0) {
                span.addClass("stroked");
            } else {
                span.addClass("non-stroked");
            }
            textContainer.append(span);
        });
        $(".marquee").marquee({
            //duration in milliseconds of the marquee
            duration: 50000,
            //gap in pixels between the tickers
            gap: 100,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: "left",
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            startVisible: true,
        });
        $(".marquee-logo").marquee({
            //duration in milliseconds of the marquee
            duration: 50000,
            //gap in pixels between the tickers
            gap: 100,
            //time in milliseconds before the marquee will start animating
            delayBeforeStart: 0,
            //'left' or 'right'
            direction: "left",
            //true or false - should the marquee be duplicated to show an effect of continues flow
            duplicated: true,
            startVisible: true,
        });
    });
})(jQuery);
