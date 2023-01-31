import sum from '../sum'

// Matchers
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    // If you want to check the value of an object, use toEqual or toStrictEqual instead
    // Using toStrictEqual is preferred over using toEqual. toEqual simply ignores undefined values, whereas toStrictEqual takes them into account.
    expect(data).toEqual({one: 1, two: 2});
});

test('adding positive numbers is not zero', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});
