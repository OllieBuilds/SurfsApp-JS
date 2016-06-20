'use strict';

const app = require('../app-data');

// let surfboardId = require('./events');
const authUi = require('./ui');

const signUp = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + 'sign-up',
    dataProcessing: false,
    data,
  }).done(success)
  .fail(failure);
};

const signIn = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + 'sign-in',
    data,
  }).done(success)
  .fail(failure);
};

const signOut = (success, failure) => {
  console.log(app);
  $.ajax({
    method: 'DELETE',
    url: app.api + 'sign-out/' + app.user1.id,
    headers: {
      Authorization: 'Token token=' + app.user1.token,
    },
  }).done(success)
  .fail(failure);
};

const changePassword = (success, failure, data) => {
  console.log(app.user1.authToken);
  $.ajax({
    method: 'PATCH',
    url : app.api + 'change-password/' + app.user1.id,
    headers: {
      Authorization: 'Token token=' + app.user1.authToken,
    },
    data
  }).done(success)
  .fail(failure);
};

// Quiver and Journal actions
const displayJournal = (data) => {
  let sessionsTemplate = require('../templates/sessions.handlebars');
  $('.show-sessions').append(sessionsTemplate({ sessions:data }));
  showQuiver();
};

const displayQuiver = (data) => {
  $('#show-quiver').html('');
  let quiverTemplate = require('../templates/quiver.handlebars');
  // let quivTem = require('../templates/quiver-select.handlebars');
  $('#show-quiver').append(quiverTemplate({ surfboards:data }));
  // $('#show-quiver-sesh').append(quivTem({surfboards:data}));
};

const addBoard = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + 'surfboards',
    headers: {
      Authorization: 'Token token=' + app.user1.token,
    },
    data,
  }).done(success)
  .fail(failure);
};

const showQuiver = () => {
  $.ajax({
    method: 'GET',
    url: app.api + 'surfboards',
    headers: {
      Authorization: 'Token token=' + app.user1.token,
    },
  }).done(function (data) {
    let quivTem = require('../templates/quiver-select.handlebars');
    $('#show-quiver-sesh').append(quivTem({surfboards:data}));
    displayQuiver(data);
    console.log(data);
  });
};

const addSession = (success, failure, data) => {
  $.ajax({
    method: 'POST',
    url: app.api + 'sessions',
    headers: {
      Authorization: 'Token token=' + app.user1.token,
    },
    data,
  }).done(success)
  .fail(failure);
};

const deleteSession = (success, failure, id) => {
  $.ajax({
    method: 'DELETE',
    url: app.api + 'sessions/' + id,
    headers:{
      Authorization: 'Token token=' + app.user1.token, },
  }).done(success)
  .fail(failure);
};

const showSessions = () => {
  $.ajax({
    method: 'GET',
    url: app.api + 'sessions',
    headers: {
      Authorization: 'Token token=' + app.user1.token,
    },
  }).done(function (data) {
    displayJournal(data);
    // showQuiver();
    $('#delete_session').on('click', function (event) {
      event.preventDefault();
      // debugger;
      let id = this.name;
      console.log(id);
      deleteSession(authUi.success, authUi.failure, id);
    });
  });
};

const addBoardToSession = (success, failure, data) => {
  $.ajax({
    method: 'PATCH',
    url: app.api + 'sessions/' + data.session.id,
    headers:{
      Authorization: 'Token token=' + app.user1.token,
    },
    data,
  }).done(success)
  .fail(failure);
};

// MSW

// const displayJournal = (data) => {
//   let sessionsTemplate = require('../templates/sessions.handlebars');
//   $('.show-sessions').append(sessionsTemplate({ sessions:data }));
//   showQuiver();
// };

// const getCharts = (data) =>{
//   let chartsTemplate = require('../templates/charts.handlebars');
//   $('.msw').append(chartsTemplate({charts:data}));
//
// };

const mswData = () => {
  $.ajax({
    method: 'GET',
    url: app.api + 'charts',
// authorization needed?
  }).done(function(data){
    authUi.render_charts(data);
  //   console.log(data[3].charts.swell + "working");
  //   // getCharts(data);
  //   // run data through success function that will add images to carousel
  }).
  fail(authUi.failure);
};

module.exports = {
  signUp,
  signIn,
  signOut,
  addBoard,
  showQuiver,
  addSession,
  showSessions,
  addBoardToSession,
  deleteSession,
  mswData,
  changePassword,
  displayQuiver,
  // getCharts
};
