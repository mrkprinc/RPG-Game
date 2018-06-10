$(document).ready(function() {
    
    $("main").on("click", function() {
        

        $(".rey").clone().appendTo($(".div-selectionOverlay"));
        $(".snoke").clone().appendTo($(".div-selectionOverlay"));
        $(".kylo").clone().appendTo($(".div-selectionOverlay"));
        $(".poe").clone().appendTo($(".div-selectionOverlay"));

        $(".div-selectionOverlay").addClass("showOverlay");
        $(".fade").addClass("fadeMain");
})

})

