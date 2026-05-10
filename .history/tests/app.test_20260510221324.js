const { add, subtract, formatResponse } = require('../src/app');

describe('app module', () => {
  test('add should sum two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add('4', '6')).toBe(10);
  });

  test('subtract should subtract two numbers', () => {
    expect(subtract(7, 2)).toBe(5);
    expect(subtract('8', '3')).toBe(5);
  });

  test('formatResponse should include status, message, data, and timestamp', () => {
    const result = formatResponse('ok', 'ok', { value: 1 });
    expect(result.status).toBe('ok');
    expect(result.message).toBe('ok');
    expect(result.data).toEqual({ value: 1 });
    expect(typeof result.timestamp).toBe('string');
  });
});
