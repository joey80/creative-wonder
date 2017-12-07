// Fixes the iOS rotation zoom bug
// CREDIT: http://adactio.com/journal/4470/
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
	var viewportmeta = document.querySelector('meta[name="viewport"]');
	if (viewportmeta) {
		viewportmeta.content = 'width=device-width, minimum-scale=.25, maximum-scale=1.6, initial-scale=1.0, user-scalable=no';
		document.body.addEventListener('gesturestart', function() {
			viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6, user-scalable=no';
		}, false);
	}
}


var DOMController = (function() {
    
    var DOMstrings = {
		navMenu: '.menu',
        menuButton: '.header__button',
		menuButtonArrowOn: 'header__button--on',
		menuButtonArrowOff: 'header__button--off',
		navMenuHide: 'menu--hidden'
	};

	return {
		getDOMstrings: function() {
			return DOMstrings;
		}
	}

})();

var MenuController = (function() {

	var DOM = DOMController.getDOMstrings(),
		navClass = document.querySelector(DOM.navMenu).classList,
		menuButtonClass = document.querySelector(DOM.menuButton).classList,
		navMenuHide = DOM.navMenuHide,
		arrowOn = DOM.menuButtonArrowOn,
		arrowOff = DOM.menuButtonArrowOff;

	var menuToggle = function() {

		if (navClass.contains(navMenuHide)) {
			navClass.remove(navMenuHide);
		} else {
			navClass.add(navMenuHide);
		}

		addRemoveArrow();
	};

	var menuCloseOnScroll = function() {

		if (navClass.contains(navMenuHide)) {
			return
		} else {
			navClass.add(navMenuHide);
			addRemoveArrow();
			return
		}
	};

	var addRemoveArrow = function() {

		if (menuButtonClass.contains(arrowOn)) {
			menuButtonClass.remove(arrowOn);
			menuButtonClass.add(arrowOff);
		} else {
			menuButtonClass.remove(arrowOff);
			menuButtonClass.add(arrowOn);
		}
	};

	var setupEventListeners = function() {

		//let mobileLinks = document.querySelectorAll(DOM.mobileMenuLi);
		
		document.querySelector(DOM.menuButton).addEventListener('click', menuToggle);
		window.addEventListener('scroll', menuCloseOnScroll);
	};			

	return {
		init: function() {
			console.log('Welcome To Creative Wonder!');
			setupEventListeners();

			// All the other crap
		}
	}

})();


MenuController.init();


/// TODO!!! 

///// DIV SLIDER (foreach loop??)



/*

// Activate the div swiper for Meet Our Staff
$(document).ready(function() {
	$('.bxslider').bxSlider();
});


// Activate the "chalkboard" hover animations
$(document).ready(function() {
	$('.cb-animate').hover(function() {
			$(this).children().animate({
				marginTop: "-400"
			}, 200);
			$(this).children('button').animate({
				top: "125"
			}, 200);
		},
		function() {
			$(this).children('button').animate({
				top: "410"
			}, 400);
			$(this).children().delay(200).animate({
				marginTop: "0"
			}, 400);
		});
});


// Toggle for the mobile menu. It checks to see if the tablet/desktop menu button is hidden (which only happens
// on mobile screen sizes). Then it will allow it to fire.
//function checkSize() {
//	$('nav li').click(function(e) {
//		if (menuButton.css('display') === 'none') {
//			e.stopPropagation();
//			$(this).children('ul').slideToggle();
//			$(this).siblings('li').find('ul').slideUp();
//		}
//	});
//}


$(document).ready(function() {
	$('#accordion').accordion({
		collapsible: true,
		heightStyle: "content"
	});
});

*/


/*
	var isVisible = function(e) {
		return !!( e.offsetWidth || e.offsetHeight );
	}

	*/