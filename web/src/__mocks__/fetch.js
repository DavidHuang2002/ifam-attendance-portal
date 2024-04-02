export default jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);