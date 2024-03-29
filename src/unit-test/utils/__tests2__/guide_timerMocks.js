jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

test('waits 1 second before ending the game', () => {
    const timerGame = require('../timerGame');
    timerGame();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});

// Run All Timers ------------------------------------------------------------------------

jest.useFakeTimers();
test('calls the callback after 1 second', () => {
    const timerGame = require('../timerGame');
    const callback = jest.fn();

    timerGame(callback);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toBeCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
});

// Run Pending Timers -----------------------------------------------------------------------------------

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('infiniteTimerGame', () => {
    test('schedules a 10-second timer after 1 second', () => {
        const infiniteTimerGame = require('../infiniteTimerGame');
        const callback = jest.fn();

        infiniteTimerGame(callback);

        // At this point in time, there should have been a single call to
        // setTimeout to schedule the end of the game in 1 second.
        expect(setTimeout).toHaveBeenCalledTimes(1);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

        // Fast forward and exhaust only currently pending timers
        // (but not any new timers that get created during that process)
        jest.runOnlyPendingTimers();

        // At this point, our 1-second timer should have fired its callback
        expect(callback).toBeCalled();

        // And it should have created a new timer to start the game over in
        // 10 seconds
        expect(setTimeout).toHaveBeenCalledTimes(2);
        expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
    });
});

// TODO by NhatPA: Đọc thêm theo doc, dài quá note không hết
