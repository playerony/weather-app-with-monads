const Task = (fork) => ({
  fork,
  map: (f) => Task((rej, res) => fork(rej, (x) => res(f(x)))),
  fold: (f, g) =>
    Task((rej, res) =>
      fork(
        (x) => f(x).fork(rej, res),
        (x) => g(x).fork(rej, res)
      )
    ),
});

module.exports = { Task };
