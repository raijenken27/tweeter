$(document).ready(function() {
  //use input event handler
  $('#tweet-text').on('input', function() {
    const charLimit = 140;
    const characters = $(this).val().length;
    $(this).siblings('div').children('#counter').val(charLimit - characters);

  
    if (characters > charLimit) {
      $('#counter').addClass('negative');
    } else {
      $('#counter').removeClass('negative');
    }
  });
});