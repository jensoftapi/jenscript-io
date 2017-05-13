$(document).ready(wrapResize);
$(window).resize(wrapResize);

function wrapResize (){
    var nav = $('.navbar');
    if(nav === null || nav === undefined) return;
    var full = $('#header-full');
    var wrap = $('.wrap-primary');
    var bottom = $('.wrap-dark-color');
 
    if(nav.offset()){
    	 var sizeTop = nav.offset().top + nav.height();
    	   var sizeWrap = $(window).height() - sizeTop - bottom.height();
    	    wrap.css('min-height', sizeWrap + "px");
    }
   
}
