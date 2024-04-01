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
   
       //btn mouse hover base on mouse pointer
       $(".btn-1 , .icon-btn , .rotate-text-inner").mousemove(function (event) {
           let innerText = $(this).find(".inner-text");
           let btnOffset = $(this).offset();
           let btnWidth = $(this).outerWidth();
           let btnHeight = $(this).outerHeight();
           let centerX = btnOffset.left + btnWidth / 2;
           let centerY = btnOffset.top + btnHeight / 2;
           let offsetX = (event.pageX - centerX) * 0.15; // Adjust as needed
           let offsetY = (event.pageY - centerY) * 0.2; // Adjust as needed

           let transformValue = "translate3d(" + offsetX + "px, " + offsetY + "px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
           innerText.css("transform", transformValue);
       });

       $(".btn-1 , .icon-btn , .rotate-text-inner").mouseleave(function () {
           $(this).find(".inner-text").css("transform", "none");
       });
       function desktopWorking(){
           if(window.innerWidth > 991){
               $('.about-us-video ').addClass("animation-add")
           
           }else{
               $('.about-us-video').remove('animation-add')
           }
           
       }
       desktopWorking();
       
       // video mouse hover base on mouse pointer
       function moveBtn(wrapper, event) {
           let videoBtn = $(wrapper).find(".popup-video");
           const pointerPageX = event.pageX;
           const pointerPageY = event.pageY;
           const sectionOffsetLeft = $(wrapper).offset().left;
           const sectionOffsetTop = $(wrapper).offset().top;
           const leftPixel = pointerPageX - sectionOffsetLeft - videoBtn.width() / 2;
           const topPixel = pointerPageY - (sectionOffsetTop + $(wrapper).height() / 2) - videoBtn.height() / 2;

           let transformedValue = "translate3d(" + leftPixel + "px, " + topPixel + "px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)";
           videoBtn.css({
               transform: transformedValue,
           });
       }
       function playMove(){
           const windowWidth = $(window).width();
           if(windowWidth > 991){
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
           }
       }
       playMove();
       // $(window).on("resize", function(){
       //     playMove();
       // });
       
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
       let most_popular_item_slider = new Swiper(".most-popular-item-slider", {
           slidesPerView: "auto",
           spaceBetween: 0,
           freeMode: true,
           loop: true,
           allowTouchMove: false,
           speed: 10000,
           autoplay: {
               delay: 0,
           },
       });
       // our-sponsor-slider
       let our_sponsor_slider = new Swiper(".our-sponsor-slider", {
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
       let customer_testimonial_slider = new Swiper(".customer-testimonial-slider", {
           slidesPerView: 1,
           spaceBetween: 0,
           navigation: {
               nextEl: ".swiper-button-next",
               prevEl: ".swiper-button-prev",
           },
       });
       // header-offcanvas-inner-slider
       let header_offcanvas = new Swiper(".header-offcanvas-inner-slider", {
           slidesPerView: 3,
           spaceBetween: 15,
           autoplay: {
               delay: 1000,
           },
       });
       let blog_img_slider = new Swiper(".blog-img-slider", {
           slidesPerView: 1,
           spaceBetween: 0,
           autoplay: {
               delay: 5000,
           },
           pagination: {
            el: ".swiper-pagination",
          }
       });

       // counter up active
       let counterUp = window.counterUp["default"]; // import counterUp from "counterup2"

       let $counters = $(".counter");

       /* Start counting, do this on DOM ready or with Waypoints. */
       $counters.each(function (ignore, counter) {
           let waypoint = new Waypoint({
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
           let windowWidth = $(window).width();
           let bannerContainer = $(".banner-section .container");
           let containerWidth = bannerContainer.outerWidth();

           let rightOffsetWidth = $(window).width() - bannerContainer.offset().left - containerWidth;
           let additionalWidth = 12; // Additional fixed width
           let captionWidth = windowWidth - containerWidth - rightOffsetWidth + additionalWidth;

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
       $(".blog-video-popup").magnificPopup({
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
       //gallery
       $('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	   });
      // justified Gallery active
      $(".blog-gallary").justifiedGallery({
        rowHeight : 70,
        lastRow : 'justify',
        margins : 5,
        captions: false    
      });
      
      //   nice select
      $('select').niceSelect();

      // price filter
        let lowerSlider = $('#lower');
        let upperSlider = $('#upper');

        $('#two').val(upperSlider.val());
        $('#one').val(lowerSlider.val());

        let lowerVal = parseInt(lowerSlider.val());
        let upperVal = parseInt(upperSlider.val());

        upperSlider.on('input', function() {
            lowerVal = parseInt(lowerSlider.val());
            upperVal = parseInt(upperSlider.val());

            if (upperVal < lowerVal + 4) {
                lowerSlider.val(upperVal - 4);
                if (lowerVal == lowerSlider.attr('min')) {
                    upperSlider.val(4);
                }
            }
            $('#two').val($(this).val());
        });

        lowerSlider.on('input', function() {
            lowerVal = parseInt(lowerSlider.val());
            upperVal = parseInt(upperSlider.val());
            if (lowerVal > upperVal - 4) {
                upperSlider.val(lowerVal + 4);
                if (upperVal == upperSlider.attr('max')) {
                    lowerSlider.val(parseInt(upperSlider.attr('max')) - 4);
                }
            }
            $('#one').val($(this).val());
        });

        // noui slider active
        

      




       // Wow JS
       new WOW().init();

       let textContainer = $(".slider-text-wrapper span");
       let words = textContainer.text().split(" ");
       textContainer.empty();

       $.each(words, function (index, word) {
           let span = $("<span>").text(word + " ");
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
       //    noUiSlider active
        var slider = $('.price-filter');
        $(slider).each(function(index, item){
            noUiSlider.create(item, {
                start: [5, 35], // Initial values
                connect: true,   // Connect the handles with a line
                range: {
                    'min': 0,
                    'max': 300
                },
                tooltips: true, 
                format: {
                    to: function (value) {
                        return Math.round(value); // Round the value to the nearest integer
                    },
                    from: function (value) {
                        return Math.round(value); // Round the value to the nearest integer
                    }
                }
            
            });
        });
        
        // Link slider to input elements
        var inputMin = $('#inputMin');
        var inputMax = $('#inputMax');
    
        slider[0].noUiSlider.on('update', function (values, handle) {
            var value = values[handle];
            if (handle) {
                inputMax.val(value);
            } else {
                inputMin.val(value);
            }
        });
    
        // Update slider when input values change
        inputMin.on('change', function () {
            slider[0].noUiSlider.set([this.value, null]);
        });
    
        inputMax.on('change', function () {
            slider[0].noUiSlider.set([null, this.value]);
        });


 
   
       
       
       
       
   });
})(jQuery);

