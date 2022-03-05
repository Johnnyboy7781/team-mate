const Employee = require('../lib/Manager');
const Manager = require('../lib/Manager');

test('Initialize Manager correctly with super data', () => {
    const manager = new Manager('Dave','123abc','dave@gmail.com','987');

    expect(manager.name).toBe('Dave');
    expect(manager.id).toBe('123abc');
    expect(manager.email).toBe('dave@gmail.com');
    expect(manager.office).toBe('987');
})