$(document).ready(function(){
	//for nav - if there are more pages routed
    $('<div id="menu-btn-wrapper"><button id="menu-btn"><i class="fa fa-bars fa-2x"></i></button></div>').insertAfter('.lw');  
    $('#menu-btn').click(function () {
        $('#main-nav').toggleClass('active');  
    });
    //show hide preferences
    $(document).on('click', '.viewtoggle', function () {
        $('.viewtoggle').toggleClass('hidden');
        $('.surveillance').toggleClass('hidden');  
    });
})





