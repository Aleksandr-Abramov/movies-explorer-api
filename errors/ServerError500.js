module.exports = class ServerError500 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
};
