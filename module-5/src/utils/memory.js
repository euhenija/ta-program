'use strict';

class Memory {
  async setValue(property, value) {
    this[`${property}`] = value;
  }

  async getValue(property) {
    if (this[`${property}`]) {
      return this[`${property}`];
    }
    throw new Error(`Property ${property} does not exist`);
  }
}

module.exports = new Memory();
