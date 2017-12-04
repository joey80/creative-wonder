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

// Within the controller
// element = DOMstrings.incomeContainer;

// Outside the controller
// var DOM = UICtrl.getDOMstrings();
// document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
// document.querySelector(DOM.navMenu).style.display = 'block';



/*
/
/ 
/ TODO!!!

	- Completely redo the mobile navigation

/
/
*/





var DOMController = (function() {
    
    var DOMstrings = {
		navMenu: 'nav',
		navMenuParentArrow: 'drop',
        menuButton: '.menu-button',
		mobileMenu: '.mobile-menu',
		mobileMenuLi: 'nav li',
		menuButtonArrowOn: 'on',
		menuButtonArrowOff: 'off',
		menuTopPosition: 'top'
	};

	return {
		getDOMstrings: function() {
			return DOMstrings;
		}
	}

})();

var UIController = (function() {

	var DOM = DOMController.getDOMstrings(),
		navClass = document.querySelector(DOM.navMenu).classList,
		menuButtonClass = document.querySelector(DOM.menuButton).classList,
		topClass = DOM.menuTopPosition,
		arrowOn = DOM.menuButtonArrowOn,
		arrowOff = DOM.menuButtonArrowOff,
		drop = DOM.navMenuParentArrow;

	var menuToggle = function() {

		//TODO:
		/*
		- transition doesn't happen on tablet for some reason
		*/

		navClass.toggle(topClass);
		addRemoveArrow();

	};

	var menuCloseOnScroll = function() {
		
		let called = false;

		return function() {
			if (!called) {
				navClass.remove(topClass);
				called = true;
			} else if (navClass.contains(topClass)) {
				addRemoveArrow();
				called = false;
			}
		}
			  
	}();

	var addRemoveArrow = function() {

		if (menuButtonClass.contains(arrowOn)) {
			menuButtonClass.remove(arrowOn);
			menuButtonClass.add(arrowOff);
		} else {
			menuButtonClass.remove(arrowOff);
			menuButtonClass.add(arrowOn);
		}

	};

	var isVisible = function(e) {
		return !!( e.offsetWidth || e.offsetHeight );
	}

	var navMenuInit = function() {
		
		$('nav li:has(ul)').addClass(drop);

	};

	var setupEventListeners = function() {

		let mobileLinks = document.querySelectorAll(DOM.mobileMenuLi);
		
		document.querySelector(DOM.menuButton).addEventListener('click', menuToggle);

		// For the mobile nav menu. Hide/show links. This is a work in progress and needs to be completely redone
		document.querySelector(DOM.mobileMenu).addEventListener('click', function() {
			menuToggle();
			mobileLinks.forEach(function(links){
				links.addEventListener('click', function() {
					
					for (let i = 0; i < this.children.length; i++) {
						if(this.children[i].style.display === 'block') {
							this.children[i].style.display = 'none';
						} else {
							this.children[i].style.display = 'block';
						}
					}					
				})
			})
		});

		window.addEventListener('scroll', menuCloseOnScroll);
	};			

	return {
		init: function() {
			console.log('Welcome To Creative Wonder!');
			setupEventListeners();
			navMenuInit();

			// All the other crap
		}
	}

})();


UIController.init();


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