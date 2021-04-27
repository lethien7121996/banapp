$(document).ready(function(){
    $("#side-menu li").click(function(){
        
        $("#side-menu li ul").removeClass("openmenu");
        if($(this).hasClass("activemenu"))
        {
            $(this).removeClass("activemenu");
            $(this).children("ul").removeClass("openmenu");
        }
        else
        {
            $(this).addClass("activemenu");
            $(this).children("ul").addClass("openmenu");
        }
        
    });
})