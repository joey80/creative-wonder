import anime from 'animejs';

var DOMController = (function() {
    
    var DOMstrings = {
		navMenu: '.menu',
		menuButtonText: '.header__button__text',
		menuButton: '.header__button',
		menuButtonArrowOn: 'header__button--on',
		menuButtonArrowOff: 'header__button--off',
		navMenuHide: 'menu--hidden',
		navMenuDown: 'menu--down',
		navMenuList: '.menu__list__first',
		cbAccordion: '.chalkboard__accordion',
		cbAccordionQuestion: 'chalkboard__accordion__question',
		teacherCard: '.teachers__card',
		teacherLeft: '.teacherLeft',
		teacherRight: '.teacherRight',
		teacherCardContainer: '.teachers__card__container'
	};

	return {
		getDOMstrings: function() {
			return DOMstrings;
		}
	}

})();

var MenuController = (function() {

	var DOM = DOMController.getDOMstrings(),
		navMenu = document.querySelector(DOM.navMenu),                        // The menu div
		navClass = document.querySelector(DOM.navMenu).classList,             // The menu div classes
		navMenuListClass = document.querySelector(DOM.navMenuList).classList, // The menu ul
		menuButtonClass = document.querySelector(DOM.menuButton).classList,   // The header button
		menuButtonText = document.querySelector(DOM.menuButtonText),          // The header button text
		navMenuHide = DOM.navMenuHide,
		navMenuDown = DOM.navMenuDown,
		arrowOn = DOM.menuButtonArrowOn,
		arrowOff = DOM.menuButtonArrowOff,
		cbAccordion = DOM.cbAccordion,
		cbAccordionQuestion = document.getElementsByClassName(DOM.cbAccordionQuestion),
		teacherCard = document.querySelectorAll(DOM.teacherCard),
		teacherCardWidth = document.querySelector(DOM.teacherCard).scrollWidth,
		teacherLeft = DOM.teacherLeft,
		teacherRight = DOM.teacherRight,
		teacherCardContainer = document.querySelector(DOM.teacherCardContainer),
		teacherCardContainerWidth = document.querySelector(DOM.teacherCardContainer).clientWidth,
		total = 0;


    // Helper function to check to see if something is visible
	var isVisible = function(e) {
		return !!( e.offsetWidth || e.offsetHeight );
	}


    // Controls the animation for revealing the ul list in the menu and dropping down the 
    // menu itself. Once the menu hides then the arrow in the menu button will change again
	var menuToggle = function() {

		if (navClass.contains(navMenuHide)) {
			navClass.remove(navMenuHide);
			mobileMenuShow();
			setTimeout(function() {
				navMenuListClass.add(navMenuDown);
			}, 300);
		} else {
			mobileMenuHide();
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


	// On mobile this hides the menu. It calculates how tall the menu div is and then
	// moves it off screen by that much
	var mobileMenuHide = function() {
		let mobileMenuHeight = navMenu.offsetHeight;
		if (isVisible(menuButtonText) === false) {
			navMenu.style.marginTop = "-" + mobileMenuHeight + "px";
		}
	};


	// On mobile this will then reverse the menuHide and give the menu a margin-top
	// of 0 again. It is probably a better idea to make a css modifer and apply that instead.
	var mobileMenuShow = function() {
		if (isVisible(menuButtonText) === false) {
			navMenu.style.marginTop = "0px";
			navMenu.style.display = "block";
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


	// This controls the according FAQ, showing/hiding the answers
	var accordionControl = function() {

		for(var i = 0; i < cbAccordionQuestion.length; i++) {
			cbAccordionQuestion[i].addEventListener('click', function() {
				var answer = this.nextElementSibling;
				if(answer.style.maxHeight) {
					answer.style.maxHeight = null;
				} else {
					answer.style.maxHeight = answer.scrollHeight + "px";
				}
			});
		}
	};

	

	var divSliderLeft = function() {

		if(total === ( (-teacherCardContainerWidth + teacherCardWidth) + 4)) {
    		teacherCardContainer.style.transform = "translateX("+total+"px)";
  		} else {
    		total -= (teacherCardWidth + 4);
    		var cssSelector = anime({
      			targets: teacherCardContainer,
      			translateX: total
    		})
  		}
	};


	var divSliderRight = function() {

		if(total === 0) {
    		teacherCardContainer.style.transform = "translateX("+total+"px)";
  		} else {
      		total += (teacherCardWidth + 4);
      		var cssSelector = anime({
     	 		targets: teacherCardContainer,
      			translateX: total
    		})
  		}
	};


	// Sets up all of the event listener for the header and menu DOM items
	var setupEventListeners = function() {
		
		document.querySelector(DOM.menuButton).addEventListener('click', menuToggle);
		document.querySelector(DOM.teacherLeft).addEventListener('click', divSliderLeft);
		document.querySelector(DOM.teacherRight).addEventListener('click', divSliderRight);
		window.addEventListener('scroll', menuCloseOnScroll);
	};	

	return {
		init: function() {
			console.log('Welcome To Creative Wonder!');
			setupEventListeners();
			mobileMenuHide();
			accordionControl();

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



// put all slides at display none
// put all slides at document.documentElement.clientWidth marginRight
// set first slide a 0 display block
// have plus/minus arrows

// on left arrow move the slide to the left and then reset it to the right
// on right arrow move the slide to the right and then reset it




*/