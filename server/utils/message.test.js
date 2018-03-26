const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'test@example.com';
    var text = 'Hey';
    var res = generateMessage(from, text);

    expect(res).toMatchObject({from, text});
    expect(typeof res.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = "test@example.com";
    var latitude = 1;
    var longitude = 1;
    var url = 'https://www.google.com/maps?q=1,1';
    var res = generateLocationMessage(from, latitude, longitude);

    expect(typeof res.createdAt).toBe('number');
    expect(res).toMatchObject({from, url});
  });
});