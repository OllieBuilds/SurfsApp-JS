'use strict';
const app = require('../app-data.js');

const success = (data) => {
  console.log(data +' :::success');
};

// const sign_out_success = (data) =>{
//   console.log(data);
//   console.log('success');
// };

const sign_in_success = (data) => {
  app.user1 = data.user;
  app.user1.authToken = data.user.token;
  console.log(app.user1.id);
  console.log(data);
  console.log('signed in');
  $('.btn').removeClass('disabled');
};

const render_charts = (data) =>{
  console.log(data.length);
  let count = 0;
  let charts = data[count].charts.swell;

  $('#charts').prepend('<img id="' + charts +'" src="' + data[count].charts.swell + '"/>');
  $('#arrow-decrement').on('click', function(){
    count -=1;
    console.log(count);
    console.log(data[count].charts.swell);
    $('#charts img').remove();
    $('#charts').prepend('<img src="' + data[count].charts.swell + '"/>');
  });
  $('#arrow-increment').on('click', function(){
    count += 1;
    console.log(count);
    console.log(data[count].charts.swell);
    $('#charts img').remove();
    $('#charts').prepend('<img src="' + data[count].charts.swell + '"/>');
  });
  console.log(count);
  return count;
};

module.exports = {
  success,
  sign_in_success,
  render_charts,
};
