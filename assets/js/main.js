(function ($) {
   $(document).ready(function () {


   
    gsap.registerPlugin(ScrollSmoother , ScrollTrigger , SplitText);
    let smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.35,
        effects: true,
        smoothTouch: false,
        normalizeScroll: false,
        ignoreMobileResize: true,
    });
    gsap.to(".header-overlay", {
        y: "0%", // TranslateY 0%
        duration: 1, // Adjust the duration as needed
        scrollTrigger: {
            trigger: ".header-area",
            start: "top top", // When the top of the trigger element hits the top of the viewport
            end: "bottom top", // When the top of the trigger element hits the bottom of the viewport
            scrub: 1, // Smoothly animates between scroll positions
            onEnter: () => {
                // Add your class when trigger is activated
                document.querySelector('.header-area').classList.add('change-color');
            },
            onLeaveBack: () => {
                // Remove your class when trigger is deactivated
                document.querySelector('.header-area').classList.remove('change-color');
            }
        }
    });

    let globaltitles = new SplitText(".text-animation", {
        type: "lines",
        linesClass: "split-line",
        tag: "span",
    });
    let spans = $(".split-line");

    spans.each((index, span) => {
        let delay = parseFloat($(span).closest(".text-animation").data("delay"));
        gsap.from(span, {
            scrollTrigger: {
                trigger: span,
                start: "top 100%",
                end: "bottom 20%",
                toggleActions: "play pause resume reset",
            },
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: delay,
        });
    });


    // sticky-sidebar
    function createScrollTriggerForSidebars() {
        // Get all time-line-wrapper elements
        const wrappers = gsap.utils.toArray(".sticky-sidebar-div");
        const windowWidth = $(window).width();
           if(windowWidth > 991){
            wrappers.forEach((wrapper) => {
                const sidebar = wrapper.querySelector(".sidebar");
                const endTrigger = wrapper.querySelector(".end-sidebar");
    
                if (sidebar && endTrigger) {
                    const trigger = sidebar;
                    const start = "top +120px";
                    const pin = true;
                    const invalidateOnRefresh = true;
        
                    ScrollTrigger.create({
                        trigger: trigger,
                        start: start,
                        end: () => `bottom center`,
                        endTrigger: endTrigger,
                        pin: pin,
                        pinSpacing: false,
                        invalidateOnRefresh: invalidateOnRefresh,
                    });
                } else {
                    console.warn("Sidebar or end trigger element not found within wrapper:", wrapper);
                }
            });
           }

    }
    
    createScrollTriggerForSidebars();

    const $reservationMenu = $('.sticky-menu-wrapper');

    function initStickyMenu() {
        if (window.innerWidth > 991) {
            ScrollTrigger.create({
            trigger: '.resrvation-table-area',
            start: '-220px top',
            end: 'bottom 200px',
            pin: $reservationMenu[0],
            pinSpacing: false,
            onUpdate: function (self) {
                if (self.isActive) {
                $reservationMenu.addClass('active').css('position', 'sticky');
                } else {
                $reservationMenu.removeClass('active').css('position', 'static');
                }
            },
            });
        }
    }
    initStickyMenu();
  
    $(window).on('resize', function () {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        initStickyMenu();
    });

          


       // cart dropdown  up slide
       $(".cart-dropdown-btn").click(function(){
           $(".cart-dropdown-menu").slideToggle();
         });

       //   rotate pluse icon click on
       $(".cf-submenu").click(function(event){
            event.preventDefault();
            console.log('hi')
            $(this).find(".pluse-icon").toggleClass("rotate-icon");
            $(this).next('.sub-menu').slideToggle();
        });
       //rotate pluse icon click on
   
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

    $("#datepicker").datepicker({
        dateFormat: "DD, MM d, yy",
        showAnim: "fadeIn",
        onSelect: function (dateText) {
            $(this).val(dateText);
        },
        }).on("focus", function () {
        $(this).blur();
    });

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
               delay: 3000, 
               disableOnInteraction: false, 
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
           loop: true,
           allowTouchMove: false,
           speed: 10000,
           autoplay: {
               delay: 0,
           },
       });
       let resrvation_table_slider = new Swiper(".resrvation-table-slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 3000, 
          disableOnInteraction: false, // Keeps autoplay running after user interaction
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
        },
      });
       // our-sponsor-slider
       let our_sponsor_slider = new Swiper(".our-sponsor-slider", {
           slidesPerView: 6,
           spaceBetween: 20,
           freeMode: true,
           loop: true,
           allowTouchMove: false,
           speed: 10000,
           autoplay: {
               delay: 0,
           },
           breakpoints: {
            320: {
              slidesPerView: 3
            },
            // when window width is >= 480px
            992: {
              slidesPerView: 6
            }
          }
       });
       // customer-testimonial-slider
       let customer_testimonial_slider = new Swiper(".customer-testimonial-slider", {
           slidesPerView: 1,
           autoHeight: true,
           spaceBetween: 0,
           loop:true,
           navigation: {
               nextEl: ".swiper-button-next",
               prevEl: ".swiper-button-prev",
           },
       });
       // header-offcanvas-inner-slider
       let header_offcanvas = new Swiper(".header-offcanvas-inner-slider", {
           slidesPerView: 3,
           spaceBetween: 15,
           loop:true,
           autoplay: {
               delay: 1000,
           },
           breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 30
            }
          }
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
      //responsive table  
      $('.table-1').easyTableA11y({
        label: 'data-easy-table',
        selector: '.table-1',
        view: '786px',
        css: {
          trBottomBorder: '1px solid #000',
          tdMarginRight: '10px !important',
          tdFontWeight: 'bold'
        }
      });

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

        // checkout checkbox issu fix
        $('.payment-according .accordion-button').on('click', function() {
            $('.payment-according .form-check-input').prop('checked', false);
            $(this).find('.form-check-input').prop('checked', true);
        });
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

     
        //  counter up   base on minus and pluse
        $('.minus').click(function(){
            let inputElement = $(this).closest('.product-quantity').find("input");
            let oldValue = parseFloat(inputElement.val());
            if (oldValue > 0) {
                let newValue = oldValue - 1;
                inputElement.val(newValue);
            }
        });
        
        $('.plus').click(function(){
            let inputElement = $(this).closest('.product-quantity').find("input");
            let oldValue = parseFloat(inputElement.val());
            let newValue = oldValue + 1;
            inputElement.val(newValue);
        });

        // map js
        let mapDiv = document.getElementById("map");
            if(mapDiv){
                async function initMap() {
                    // Request needed libraries.
                    const { Map } = await google.maps.importLibrary("maps");
                    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
                        "marker",
                    );
                
                    map = new Map(mapDiv, {
                        center: { lat: 47.65196191658531, lng: -122.30716770065949 },
                        zoom: 19,
                        tilt: 67.5,
                        heading: 45,
                        mapId: "6ff586e93e18149f",
                        mapTypeControl: false,
                    });
                
                    // Define custom map styles
                    const customMapStyles = [
                        { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
                        { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
                        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
                        { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9b2a6" }] },
                        // Add more custom styles here for different features
                        // Example:
                        // { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] },
                        // { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] },
                    ];
                
                    // Create a StyledMapType object
                    const styledMapType = new google.maps.StyledMapType(customMapStyles, { name: "Styled Map" });
                
                    // Set the styled map to the map instance
                    map.mapTypes.set("styled_map", styledMapType);
                    map.setMapTypeId("styled_map");
                
                    // Add marker
                    const pin = new PinElement({
                        background: "#090b19",
                        borderColor: "#090b19",
                        glyphColor: "#eeede8",
                        scale: 2.0,
                    });
                
                    const markerView = new AdvancedMarkerElement({
                        map,
                        content: pin.element,
                        // Set altitude to 20 meters above the ground.
                        position: { lat: 47.65170843460547, lng: -122.30754, altitude: 20 },
                    });
                }
                
                initMap();
                
            }
        const $myModal = $('#myModal');
        const $myInput = $('#myInput');
        
        $myModal.on('shown.bs.modal', function () {
            $myInput.focus();
        });


       
   });
})(jQuery);




