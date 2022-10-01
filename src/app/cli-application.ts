import {CliCommandInterface} from '../cli-command/cli-command.interface.js';

type ParsedCommand = Record<string, string[]>;

export default class CLIApplication {
  private commands: Record<string, CliCommandInterface> = {};
  private defaultCommand = '--help';

  registerCommands(commandList: CliCommandInterface[]): void {
    commandList.reduce((acc, command) => {
      const cliCommand = command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

  getCommand(commandName: string): CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  private parseCommand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let command = '';

    return cliArguments.reduce((accumulator, arg) => {
      if (arg.startsWith('--')) {
        accumulator[arg] = [];
        command = arg;
      } else if (command && arg) {
        accumulator[command].push(arg);
      }
      return accumulator;
    }, parsedCommand);
  }
}
