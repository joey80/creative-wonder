
var DOMController = (function() {
    
    var DOMstrings = {
		navMenu: '.menu',
		menuButtonText: '.header__button__text',
        menuButton: '.header__button',
		menuButtonArrowOn: 'header__button--on',
		menuButtonArrowOff: 'header__button--off',
		navMenuHide: 'menu--hidden',
		navMenuDown: 'menu--down',
		navMenuList: '.menu__list__first'
	};

	return {
		getDOMstrings: function() {
			return DOMstrings;
		}
	}

})();

var MenuController = (function() {

	var DOM = DOMController.getDOMstrings(),
		navClass = document.querySelector(DOM.navMenu).classList,             // The menu div
		navMenuListClass = document.querySelector(DOM.navMenuList).classList, // The menu ul
		menuButtonClass = document.querySelector(DOM.menuButton).classList,   // The header button
		menuButtonText = document.querySelector(DOM.menuButtonText),          // The header button text
		navMenuHide = DOM.navMenuHide,
		navMenuDown = DOM.navMenuDown,
		arrowOn = DOM.menuButtonArrowOn,
		arrowOff = DOM.menuButtonArrowOff;


    // Helper function to check to see if something is visible
	var isVisible = function(e) {
		return !!( e.offsetWidth || e.offsetHeight );
	}


    // Controls the animation for revealing the ul list in the menu and dropping down the 
    // menu itself. Once the menu hides then the arrow in the menu button will change again
	var menuToggle = function() {

		if (navClass.contains(navMenuHide)) {
			navClass.remove(navMenuHide);
			setTimeout(function() {
				navMenuListClass.add(navMenuDown);
			}, 300);
		} else {
			navClass.add(navMenuHide);
			navMenuListClass.remove(navMenuDown);
		}

		addRemoveArrow();
	};


    // On tablet and desktop this will close the menu once the user starts to scroll.
    // This doesn't work on mobile because of the small screen size
	var menuCloseOnScroll = function() {

		if (navClass.contains(navMenuHide) || isVisible(menuButtonText) === false) {
			return
		} else {
			navClass.add(navMenuHide);
			addRemoveArrow();
			return
		}
	};


	// This will either add or remove the up/down arrow in the header button for the menu
	var addRemoveArrow = function() {

		if (menuButtonClass.contains(arrowOn)) {
			menuButtonClass.remove(arrowOn);
			menuButtonClass.add(arrowOff);
		} else {
			menuButtonClass.remove(arrowOff);
			menuButtonClass.add(arrowOn);
		}
	};


	// Sets up all of the event listener for the header and menu DOM items
	var setupEventListeners = function() {
		
		document.querySelector(DOM.menuButton).addEventListener('click', menuToggle);
		window.addEventListener('scroll', menuCloseOnScroll);
	};			

	return {
		init: function() {
			console.log('Welcome To Creative Wonder!');
			setupEventListeners();

			// Anything else to come
		}
	}

})();


MenuController.init();





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