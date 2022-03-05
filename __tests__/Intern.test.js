const Intern = require('../lib/Intern');

test('Initialize intern correctly with super data', () => {
    const intern = new Intern('Dave', '123abc', 'dave@gmail.com', 'UCF');

    expect(intern.name).toBe('Dave');
    expect(intern.id).toBe('123abc');
    expect(intern.email).toBe('dave@gmail.com');
    expect(intern.school).toBe('UCF');
})