import {List, ListItemButton, ListItemSecondaryAction, ListItemText} from '@mui/material';
import Typography from '@mui/material/Typography';

type MailMessageType = {
    from: Record<string, string>;
    to: Record<string, string>;
    subject: string;
    date: string;
    textBody: string;
    htmlBody: string;
    charset: string;
    replyTo: Record<string, string>;
    cc: Record<string, string>;
    bcc: Record<string, string>;
};
type MailerPanelProps = {
    data: {
        messages: MailMessageType[];
    };
};

function serializeSender(sender: Record<string, string>): string {
    return Object.entries(sender)
        .map(([key, value]) => `${key} <${value}>`)
        .join(', ');
}

export const MailerPanel = ({data}: MailerPanelProps) => {
    return (
        <>
            {!data || data.messages.length === 0 ? (
                <>Nothing here</>
            ) : (
                <List>
                    {data.messages.map((entry, index) => (
                        <ListItemButton>
                            <ListItemText
                                primary={entry.subject}
                                secondary={`From: ${serializeSender(entry.to)}, to: ${serializeSender(entry.to)}`}
                            />
                            <ListItemSecondaryAction>
                                <Typography variant="body2" color="textSecondary">
                                    {entry.date}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItemButton>
                    ))}
                </List>
            )}
        </>
    );
};
