module.exports = class BadRequest400 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};
