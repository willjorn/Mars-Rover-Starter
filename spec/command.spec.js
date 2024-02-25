const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

//Test 1 test case checks if an error is thrown when a command type is not passed as the first parameter to the Command constructor.
describe("Command class", function() {
  it("throws an error if a command type is NOT passed into the constructor as the first parameter", function() {
    expect(function() { new Command(); }).toThrow(new Error('Command type required.'));
  });

  //Test 2 test case ensures that the commandType property of a Command object is set correctly when creating a new Command object.
  it("constructor sets command type", function() {
    let command = new Command('MODE_CHANGE', 'LOW_POWER');
    expect(command.commandType).toBe('MODE_CHANGE');
  });

  //Test 3  test case verifies that the value property of a Command object is set correctly when creating a new Command object.
  it("constructor sets a value passed in as the 2nd argument", function() {
    let command = new Command('MOVE', 12000);
    expect(command.value).toBe(12000);
  });
});
