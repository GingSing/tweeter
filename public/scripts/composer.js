$(() => {
  $(window).scroll(()=>{
    $(".move-up").addClass("show");
    if(window.scrollY === 0) {
      $(".move-up").removeClass("show");
    }
  });

  $(".move-up").on("click", function() {
    $("html, body").scrollTop(0);
  });
});