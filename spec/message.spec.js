// Inside message.spec.js

const Message = require('../message');
const Command = require('../command');

describe("Message class", function() {

  // Test 4
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    expect(() => new Message()).toThrowError("Name required.");
  });

  // Test 5
  it("constructor sets name", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    expect(message.name).toBe('Test message with two commands');
  });

  // Test 6
  it("contains a commands array passed into the constructor as the 2nd argument", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    expect(message.commands).toEqual(commands);
  });

});
