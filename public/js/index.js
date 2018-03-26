var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', function(data) {
  console.log(data);
  var li = $('<li></li>');
  li.text(`${data.from}: ${data.text}`);

  $('#messages').append(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

$('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User1',
    text: $('[name=message]').val()
  }, function () {

  });
});