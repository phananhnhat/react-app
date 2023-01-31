import sum from '../utils/sum'

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

// Truthiness
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
});

// Numbers
test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);

    // For floating point equality, use toBeCloseTo instead of toEqual, because you don't want a test to depend on a tiny rounding error.
    const value1 = 0.1 + 0.2;
    //expect(value).toBe(0.3);           This won't work because of rounding error
    expect(value1).toBeCloseTo(0.3); // This works.

});

// Strings
test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});

// Arrays and iterables
const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
];

test('the shopping list has milk on it', () => {
    expect(shoppingList).toContain('milk');
    expect(new Set(shoppingList)).toContain('milk');
});

// Exceptions
// Nếu bạn muốn kiểm tra xem một chức năng cụ thể có đưa ra lỗi khi được gọi hay không, hãy sử dụng toThrow.
function compileAndroidCode() {
    throw new Error('you are using the wrong JDK!');
}

test('compiling android goes as expected', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);

    // You can also use a string that must be contained in the error message or a regexp
    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);

    // Or you can match an exact error message using a regexp like below
    expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/); // Test fails
    expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/); // Test pass
});

// Testing Asynchronous Code

// Promise
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 300);
});
// Đảm bảo trả lại (hoặc await) lời hứa - nếu bạn bỏ qua câu lệnh return/ await,
// bài kiểm tra của bạn sẽ hoàn thành trước khi lời hứa được trả về từ fetchDatagiải quyết hoặc từ chối.
test('the data is peanut butter', () => {
    return fetchData().then(data => {
        expect(data).toBe('peanut butter');
    });
});

// Async/Await
test('the data is peanut butter async/await', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
});
test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        await fetchData();
    } catch (e) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(e).toMatch('error');
    }
});

test('the data is peanut butter 1', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error 1', async () => {
    await expect(fetchData()).rejects.toMatch('error');
});

// Callbacks
test('the data is peanut butter Callbacks', done => {
    function callback(error, data) {
        if (error) {
            done(error);
            return;
        }
        try {
            expect(data).toBe('peanut butter');
            done();
        } catch (error) {
            done(error);
        }
    }
    fetchData(callback);
});
// Nếu done()không bao giờ được gọi, thử nghiệm sẽ không thành công (với lỗi hết thời gian chờ), đó là điều bạn muốn xảy ra.

// .resolves/.rejects
test('the data is peanut butter with .resolves/.rejects', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error with .resolves/.rejects', () => {
    return expect(fetchData()).rejects.toMatch('error');
});
