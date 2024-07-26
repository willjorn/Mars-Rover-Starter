class Rover {
   class Rover {
      constructor(position) {
        this.position = position;
        this.mode = 'NORMAL';
        this.generatorWatts = 110;
      }
    // This method handles the execution of commands received in a message object. starts by extracting the name property from the message object and initializing an empty results array to store the outcome of each command then iterates over each command in the message.commands array Inside the loop, it retrieves the current command using message.commands[i] and assigns it to the command variable.
    
      receiveMessage(message) {
        const messageName = message.name;
        const results = [];
    
        for (let i = 0; i < message.commands.length; i++) {
          const command = message.commands[i];
    
          if (command.commandType === 'STATUS_CHECK') {
            results.push({
              completed: true,
              roverStatus: {
                mode: this.mode,
                generatorWatts: this.generatorWatts,
                position: this.position
              }
            });
          } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            results.push({ completed: true });
          } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
              results.push({ completed: false });
            } else {
              this.position = command.value;
              results.push({ completed: true });
            }
          }
        }
    
        //returns an object with two properties: message, which contains the name of the original message, and results, which contains the array of results generated during command execution.
    
        return {
          message: messageName,
          results: results
        };
      }
    }
    
}

module.exports = Rover;