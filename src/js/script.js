// $(document).ready(function(){
//     $('.carousel__inner').slick({
//       speed: 1200,
//       // variableHeight: true,
//       prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//       nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//       responsive: [
//           {
//             breakpoint: 992,
//             settings: {
//               arrows: false,
//               dots: true
//             }
//           }
//         ]
//     });
//   });

const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	controls: false,
	navPosition: 'bottom',
	// nav: false,
	responsive: {
		320: {
			nav: true
		},
		992: {
			nav: true
		},
		1200: {
			nav: false
		}
	}
});

document.querySelector('.prev').addEventListener ('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener ('click', function () {
	slider.goTo('next');
});



$(document).ready(function(){
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	 })
	})
}
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn();
	});
	$('.modal__close').on('click', function(){
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function(){
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		})
	});

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Введите свое имя",
					minlength: jQuery.validator.format("Введите {0} символов")
				},
				phone: "Введите свой телефон",
				email: {
					required: "Введите свой email",
					email: "Неправильный email"
				}
			}
		});
	};
	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	$('input[name=phone]').mask("+420 999-999-999");
	$("input[name=phone]").mask("+420 999-999-999",{placeholder:" "});

	$('form').submit(function(e) {
		e.preventDefault();

		// if (!$(this).valid()) {
		// 	return;
		// };

		$.ajax ({
			type: "POST",
			url: "../mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	//Smooth scroll and pageup
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});
	$("a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
		  // Prevent default anchor click behavior
		  event.preventDefault();
	
		  // Store hash
		  var hash = this.hash;
	
		  // Using jQuery's animate() method to add smooth page scroll
		  // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
		  $('html, body').animate({
			scrollTop: $(hash).offset().top
		  }, 800, function(){
	
			// Add hash (#) to URL when done scrolling (default click behavior)
			window.location.hash = hash;
		  });
		} // End if
	  });

	  new WOW().init();

});

