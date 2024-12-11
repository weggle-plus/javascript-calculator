const { getAnswer } = require('./calculator');

test('2+3x4/2=8', () =>{
    expect(getAnswer('2+3x4/2')).toBe(8);
});