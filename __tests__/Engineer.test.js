const Engineer = require('../lib/Engineer');

test('initialize engineer correctly with super data', () => {
    const engineer = new Engineer('Dave', '123abc', 'dave@gmail.com', 'dave123');

    expect(engineer.name).toBe('Dave');
    expect(engineer.id).toBe('123abc');
    expect(engineer.email).toBe('dave@gmail.com');
    expect(engineer.github).toBe('dave123');
})