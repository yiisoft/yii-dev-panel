import * as React from 'react';
import {useEffect, useState} from 'react';
import {CommandType, useLazyGetCommandsQuery, useLazyRunCommandQuery} from '../API/Inspector';
import {Button, CircularProgress} from '@mui/material';
import Box from '@mui/material/Box';

type GroupedCommands = Record<string, CommandType[]>;
type CommandStatusMap = Record<
    string,
    {
        isLoading: boolean;
        response: null | any;
    }
>;
export const CommandsPage = () => {
    const [groupedCommands, setGroupedCommands] = useState<GroupedCommands>({});
    const [commandStatus, setCommandStatus] = useState<CommandStatusMap>({});

    const [getCommandsQuery] = useLazyGetCommandsQuery();
    const [runCommandsQuery, runCommandsQueryInfo] = useLazyRunCommandQuery();

    useEffect(() => {
        void (async () => {
            const response = await getCommandsQuery();

            if (response.data) {
                const groupedCommands: GroupedCommands = {};
                const commandStatus: CommandStatusMap = {};
                response.data.forEach((command) => {
                    if (command.group in groupedCommands) {
                        groupedCommands[command.group].push(command);
                    } else {
                        groupedCommands[command.group] = [command];
                    }
                    commandStatus[command.name] = {
                        isLoading: false,
                        response: null,
                    };
                });
                setCommandStatus(commandStatus);
                setGroupedCommands(groupedCommands);
            }
        })();
    }, []);

    const runCommand = async (command: CommandType) => {
        setCommandStatus((prev) => ({...prev, [command.name]: {...prev[command.name], isLoading: true}}));
        const response = await runCommandsQuery(command.name);
        setCommandStatus((prev) => ({...prev, [command.name]: {...prev[command.name], isLoading: false}}));
        console.log(response);
    };

    return (
        <>
            {groupedCommands &&
                Object.entries(groupedCommands).map(([groupName, commands], index) => (
                    <Box key={index}>
                        <h2>{groupName}</h2>
                        {commands.map((command, index) => (
                            <Button
                                key={index}
                                onClick={() => runCommand(command)}
                                disabled={commandStatus[command.name].isLoading}
                                endIcon={
                                    commandStatus[command.name].isLoading ? (
                                        <CircularProgress size={24} color="info" />
                                    ) : null
                                }
                            >
                                Run {command.title}
                            </Button>
                        ))}
                    </Box>
                ))}
        </>
    );
};
