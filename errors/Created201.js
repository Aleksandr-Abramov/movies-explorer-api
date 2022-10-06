module.exports = class Created201 extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 201;
  }
};
