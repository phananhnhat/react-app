const users = {
  4: {name: 'Mark'},
  5: {name: 'Paul'},
};

// Because we don't want to go to the network in our test, we are going to create a manual mock for our request.js module in the __mocks__ folder (the folder is case-sensitive, __MOCKS__ will not work).
// It could look something like this:
export default function request(url) {
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(() =>
      users[userID]
        ? resolve(users[userID])
        : reject({
          error: `User with ${userID} not found.`,
        }),
    );
  });
}
