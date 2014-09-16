// MUSICVENT V.1 //
// Copyright 2014, Mandar Shirke //
// www.quadcodes.com

// --------- INIT JS ---------  //

// -- 1. HOMEPAGE --  //
// -- 2. LOGO & NAV --  //
// -- 3. FLEXSLIDER --  //
// -- 4. ALPHABETICAL SORTING LIST --  //
// -- 5. TIPSY --  //
// -- 6. SCROLL SPY --  //
// -- 7. SCROLL FUNCTION --  //
// -- 8. EVENT MAP --  //
// -- 9. PRETTYPHOTO --  //
// -- 10. FITVIDS --  //
// -- 11. JSOCIAL --  //
// -- 12. SHORTCODES --  //
// -- 13. CONTACT FORM --  //

// --------------------------  //


// --------- REQUIRED FUNCTIONS ----------  //


// --------- JPLAYER PLAYLIST ----------  //
function jPlayerPlus() {
	
	/* ASSIGN META DATA */
	$('#th-title').text($('.jp-playlist-current').find('.jp-title').text());
	$('#th-artist').text($('.jp-playlist-current').find('.jp-artist').text() ? $('.jp-playlist-current').find('.jp-artist').text() : '-----');	

	/* STOP */
	$('.jp-stop, .jp-pause').click(function() {
		$('*').removeClass('isPlaying');
		$('.album-base img').removeClass('rotate');
	});
	
	/* PLAY */
	$('.jp-play').click(function() {
		$('*').removeClass('isPlaying');
		$('.jp-playlist-current').find('i').addClass('isPlaying');
	});

	/* NEXT PREV */
	$('.jp-next, .jp-previous').click(function() {
		$('#th-title').text($('.jp-playlist-current').find('.jp-title').text());
		$('#th-artist').text($('.jp-playlist-current').find('.jp-artist').text() ? $('.jp-playlist-current').find('.jp-artist').text() : '-----');
		$('*').removeClass('isPlaying');
		$('.jp-playlist-current').find('i').addClass('isPlaying');
	});
	
	/* PLAYLIST */
	$('.jp-playlist-item').click(function() {
		$('#th-title').text($(this).find('.jp-title').text());
		$('#th-artist').text($(this).find('.jp-artist').text() ? $(this).find('.jp-artist').text() : '-----');
		$('*').removeClass('isPlaying');
		$(this).find('i').addClass('isPlaying');
	});
	
	/* ROTATE ALBUM COVER */
	$('.jp-playlist-item, .jp-next, .jp-previous, .jp-play').click(function() {
		if($('.isPlaying').length > 0) {
			$('.album-base img').addClass('rotate');
		} else {
			$('.album-base img').removeClass('rotate');
		}
	});
}	

// ------------------------------------------  // 


$(document).ready(function() {

// --------------------  //



// --------- 1. HOMEPAGE ----------  // 

if ($(window).width() >= 768) {
	$('#HUW').height($(document).height() - 20);
}
$(window).resize(function(){
	if ($(window).width() >= 768) {
		$('#HUW').height($(document).height() - 20);
	}
});



// --------- 2. LOGO & NAV ----------  // 

$('#logo').clone().appendTo('#nav-header');
$("#primary-nav li a").each(function() {
	$(this).clone().appendTo('#mobileNav ul').wrap('<li></li>');	
});
$("#mobileNav li").each(function() {
	var child = $(this).find('a');
	if(child.children().length === 0) {
		child.prepend('&nbsp;- ').addClass('child');
	}	
});
$('#sec-nav ul').html($('#primary-nav ul li.active ul').html());



// --------- 3. FLEXSLIDER ----------  // 

if ($.isFunction($.fn.froogaloop)) {
var player = document.getElementById('player_1');
$f(player).addEvent('ready', ready);
function addEvent(element, eventName, callback) {
	(element.addEventListener) ? element.addEventListener(eventName, callback, false) : element.attachEvent(eventName, callback, false);
}  
function ready(player_id) {
	var froogaloop = $f(player_id);
      
	froogaloop.addEvent('play', function(data) {
		$('.flexslider').flexslider("pause");
	});
        
	froogaloop.addEvent('pause', function(data) {
		$('.flexslider').flexslider("play");
	});
}
}
// Call fitVid before FlexSlider initializes, so the proper initial height can be retrieved.
if ($.isFunction($.fn.flexslider)) {
	$(".flexslider").fitVids().flexslider({
		slideshow: false,
		animation: "slide",
		easing: 'easeInExpo',
		animationSpeed: 1000,
		useCSS: false,
		animationLoop: false,
		smoothHeight: true,
		controlNav: false,
	});
}



// --------- 4. ALPHABETICAL SORTING LIST ----------  //

/* Detect SortBy Character */
var map = {}, list = [];
$('.sortable-list li').each(function () {
	/* For Event List */
	if ($(this).is("#event-list *")) {
		var char = $(this).find('p.sort-by').text();
	} 
	/* For Album/Artist List */
	if ($(this).is("#album-list *, #artist-list *")) {
		var char = $.trim($(this).find('p').text().toLowerCase())[0];
	}
	var array = map[char];
	if (!array) {
		array = [];
		map[char] = array;
		list.push({
			char: char,
			array: array
		});
	}
	array.push(this);
});
/* For Album/Artist List - Arrange in alphabetical order */
if($('#album-list, #artist-list').length > 0) {
	list.sort(function (obj1, obj2) {
		return obj1.char.localeCompare(obj2.char)
	});
}
/* Generate List Structure */
$.each(list, function (_, item) {
	$('<li><a href="#sort-'+ item.char.replace(/\s/g, '') +'">'+ item.char +'</a></li>').appendTo('#content-sorter ul');    
	var $li = $('<li id="sort-'+ item.char.replace(/\s/g, '') +'" data-sortable="'+ item.char.replace(/\s/g, '&nbsp;') +'"/>').appendTo('.sortable-list');
	var $ul = $('<ul class="clearfix"/>').append(item.array).appendTo($li);
});



// --------- 5. TIPSY ----------  //

$('.tips').tipsy({gravity: 's'});



// --------- 6. SCROLL SPY ----------  //

if ($.isFunction($.fn.scrollSpy)) {
	$('#content-sorter ul').scrollSpy({
		offsetTop: 80,
		speed: 500,
		easing: 'easeInExpo'
	});
}



// --------- 7. SCROLL FUNCTION ----------  //

$(window).scroll(function() {
	if( $(this).scrollTop() > 120) {
		$('#fixy, #page').addClass('fixed');
	} else {
		$('#fixy, #page').removeClass('fixed');
	}	
});



// --------- 8. EVENT MAP ----------  //

$('#toggle-map').click(function () {
	$('#event-map, #event-slides').toggle();
	show_map();
	$(this).toggleClass('active');
	if($(this).find('span').text() == 'Show Map'){
		$(this).find('span').text('Hide Map');
	} else {
		$(this).find('span').text('Show Map');
	}	
	return false;
});



// --------- 9. PRETTYPHOTO ----------  //

if ($.isFunction($.fn.prettyPhoto)) {
	$("a[rel^='prettyPhoto']").prettyPhoto({theme:'dark_square', social_tools: ''});
}



// --------- 10. RESPONSIVE VIDEO [ FITVIDS ] ----------  //

$(".qcBlogEntry").fitVids();



// --------- 11. JSOCIAL ----------  //

// Flickr
$('#flickr').jflickrfeed({
	limit: 10,
	qstrings: {
	id: '52617155@N08' // Define Flickr ID //
	},
	itemTemplate: '<li><a href="{{image_b}}" rel="prettyPhoto[pp_gal]"><img class="flickr" src="{{image_s}}" alt="{{title}}"></a></li>'
	}, function(data) {
	$('#flickr a').prettyPhoto({theme:'dark_square', social_tools: ''});
});



// --------- 12. SHORTCODES ----------  //

/*-- Tabs --*/

$('.tabs a').click(function(){
	switch_tabs($(this));
}); 
switch_tabs($('.defaulttab')); 
function switch_tabs(obj) {
	$('.tab-content').hide();
	$('.tabs a').removeClass("selected");
	var id = obj.attr("rel"); 
	$('#'+id).fadeIn(500);
	obj.addClass("selected");
}
	
/*-- Toggle --*/
	
if ( jQuery( '.shortcode-toggle').length ) {	
		
	jQuery( '.shortcode-toggle').each( function () {
			
		var toggleObj = jQuery(this);
			
		toggleObj.closedText = toggleObj.find( 'input[name="title_closed"]').attr( 'value' );
		toggleObj.openText = toggleObj.find( 'input[name="title_open"]').attr( 'value' );
			
		toggleObj.find( 'input[name="title_closed"]').remove();
		toggleObj.find( 'input[name="title_open"]').remove();
			
		toggleObj.find( 'h5.toggle-trigger a').click( function () {
			
			toggleObj.find( '.toggle-content').animate({ opacity: 'toggle', height: 'toggle' }, 300);
			toggleObj.toggleClass( 'open' ).toggleClass( 'closed' );
				
			if ( toggleObj.hasClass( 'open') ) {
				
				jQuery(this).text(toggleObj.openText);
				
			} // End IF Statement
				
			if ( toggleObj.hasClass( 'closed') ) {
				
				jQuery(this).text(toggleObj.closedText);
				
			} // End IF Statement
				
			return false;
			
		});
					
	});
	
} // End IF Statement


// --------- 13. CONTACT FORM ----------  //

$('.qcForm').submit(function() {
	$(this).find('.error').remove();
	var hasError = false;
	$(this).find('.requiredField').each(function() {
		if($.trim($(this).val()) == '') {
			var labelText = $(this).prev( 'label').text();
			$(this).parent().append( '<span class="error">You forgot to enter your '+labelText+'</span>' );
			$(this).addClass( 'inputError' );
			hasError = true;
		} else if($(this).hasClass( 'email')) {
			var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if(!emailReg.test($.trim($(this).val()))) {
				var labelText = $(this).prev( 'label').text();
				$(this).parent().append( '<span class="error">You have entered an invalid '+labelText+'</span>' );
				$(this).addClass( 'inputError' );
				hasError = true;
			}
		} else if($(this).hasClass( 'captcha')) {
			if($(this).val() != 'red' && $(this).val() != 'Red') {
				$(this).parent().append( '<span class="error">You have entered wrong Captcha Value</span>' );
				hasError = true;
			}
		}
	});
	if(!hasError) {
		var formInput = $(this).serialize();
		var hideForm = $(this);
		$.post($(this).attr('action'),formInput, function(data){
			$(hideForm).slideUp( "fast", function() {				   
				$(this).before( '<br/><p class="info">Thanks! Your email was successfully sent.</p>' );
			});
		});
	}
	return false;
});

// --------------------  //
  
});