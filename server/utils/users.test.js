const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node'
    }, {
      id: '2',
      name: 'Andrew',
      room: 'React'
    }, {
      id: '3',
      name: 'Jen',
      room: 'Node'
    }];
  });

  it('should add new User', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Aqeeb',
      room: 'Gaming'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var id = '3';
    var user = users.removeUser(id);

    expect(user.id).toBe(id);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var user = users.removeUser('4');

    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2'
    var user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it('should not find user', () => {
    var user = users.getUser('5');

    expect(user).toBeFalsy();
  });

  it('should return names for node', () => {
    var userList = users.getUserList('Node');

    expect(userList).toEqual(['Mike', 'Jen']);
  });

  it('should return names for react', () => {
    var userList = users.getUserList('React');

    expect(userList).toEqual(['Andrew']);
  });
});