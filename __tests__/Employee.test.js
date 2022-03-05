const Employee = require('../lib/Employee');

test('Initialize Employee correctly', () => {
    const employee = new Employee('Dave', '123abc', 'dave@gmail.com');

    expect(employee.name).toBe('Dave');
    expect(employee.id).toBe('123abc');
    expect(employee.email).toBe('dave@gmail.com');
})