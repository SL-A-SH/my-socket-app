const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = isRealString(12);
    expect(res).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    var res = isRealString("   ");
    expect(res).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString("   Room     ");
    expect(res).toBeTruthy();
  });
});