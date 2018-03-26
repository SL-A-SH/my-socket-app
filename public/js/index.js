var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function(data) {
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${data.from} ${formattedTime}: ${data.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function (data) {
  var formattedTime = moment(data.createdAt).format('h:mm a');
  var li = $('<li></li>');
  var a = $('<a target="_blank">My Current Location</a>');

  li.text(`${data.from} ${formattedTime}: `);
  a.attr('href', data.url);
  li.append(a);

  $('#messages').append(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextbox = $('[name=message]');

  socket.emit('createMessage', {
    from: 'User1',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  }); 
});