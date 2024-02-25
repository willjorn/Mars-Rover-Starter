// Inside rover.spec.js

const Rover = require('../rover');
const Message = require('../message');
const Command = require('../command');

describe("Rover class", function() {

  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    const rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });

  // Test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.message).toBe('Test message with two commands');
  });

  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results.length).toBe(2);
  });

  // Test 10
  it("responds correctly to the status check command", function() {
    const message = new Message('Test message with status check', [new Command('STATUS_CHECK')]);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.position).toBe(98382);
  });

  // Test 11
  it("responds correctly to the mode change command", function() {
    const message = new Message('Test message with mode change', [new Command('MODE_CHANGE', 'LOW_POWER')]);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe('LOW_POWER');
  });

  // Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    const message = new Message('Test message with move command', [new Command('MOVE', 100)]);
    const rover = new Rover(98382);
    rover.mode = 'LOW_POWER';
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(false);
    expect(rover.position).toBe(98382); // Position should not change
  });

  // Test 13
  it("responds with the position for the move command", function() {
    const message = new Message('Test message with move command', [new Command('MOVE', 100)]);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(rover.position).toBe(100); // Position should be updated to 100
  });

});

