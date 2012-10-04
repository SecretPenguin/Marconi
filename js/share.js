$(document).ready(function(){

    $('a#copyFlexible').zclip({
        path:'/js/vendor/ZeroClipboard.swf',
        copy:function(){return $('input#pFlexible').val();},
        afterCopy:function(){
        	$(this).siblings('.copy-confirm').animate({'top': '-18px', 'opacity': '1'}, 1000, function(){
        		$(this).delay(3000).animate({'top': '0', 'opacity': '0'}, 100);
        	});
        }
    });

});