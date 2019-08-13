$(document).ready(function(){

  $('#tweet').on('keyup', function(){
    let textLeft = 140 - $(this).val().length;
    const span = $(this).siblings("span");

    if (textLeft < 0) { 
      span.addClass("warn");
    } else {
      span.removeClass("warn");
    }

    span.text(textLeft);
  });

});