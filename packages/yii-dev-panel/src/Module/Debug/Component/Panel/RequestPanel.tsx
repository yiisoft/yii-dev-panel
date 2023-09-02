import {Accordion, AccordionDetails, AccordionSummary, Divider, Typography} from '@mui/material';
import {HTTPMethod} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {CodeHighlight} from '@yiisoft/yii-dev-panel-sdk/Component/CodeHighlight';
import {JsonRenderer} from '@yiisoft/yii-dev-panel/Module/Debug/Component/JsonRenderer';

type Response = {
    content: string;
    request: string;
    requestIsAjax: boolean;
    requestMethod: HTTPMethod;
    requestPath: string;
    requestQuery: string;
    requestRaw: string;
    requestUrl: string;
    response: string;
    responseRaw: string;
    responseStatusCode: number;
    userIp: string;
};
type RequestPanelProps = {
    data: Response;
};

export const RequestPanel = ({data}: RequestPanelProps) => {
    console.log(data);
    if (!data) {
        return <>Nothing here</>;
    }
    const responseParts = data.responseRaw.split('\r\n\r\n');
    const headers = responseParts[0];
    const content = responseParts.splice(1).join('\r\n\r\n');
    const contentType = headers.match(/Content-Type: \w+\/(\w+);/)[1] ?? 'plain';
    const isJson = !!contentType.match(/json/);

    return (
        <>
            <CodeHighlight
                language={'plain'}
                code={data.requestMethod + ' ' + data.requestUrl}
                showLineNumbers={false}
            />
            {/*<DebugChip*/}
            {/*    label={data.requestMethod + ' ' + data.responseStatusCode}*/}
            {/*    color={buttonColorHttp(data.responseStatusCode)}*/}
            {/*/>*/}
            <Typography component="h2" variant="h6">
                Request
            </Typography>
            <JsonRenderer value={data.request} />
            <Accordion defaultExpanded={data.requestRaw.length < 500}>
                <AccordionSummary>Raw</AccordionSummary>
                <AccordionDetails>
                    <CodeHighlight code={data.requestRaw} language={'plain'} showLineNumbers={false} />
                </AccordionDetails>
            </Accordion>
            <Divider />
            <Typography component="h2" variant="h6">
                Response
            </Typography>
            <JsonRenderer value={data.response} />
            <Accordion defaultExpanded={content.length < 500}>
                <AccordionSummary>Content</AccordionSummary>
                <AccordionDetails>
                    {isJson ? (
                        <JsonRenderer value={JSON.parse(content)} />
                    ) : (
                        <CodeHighlight code={content} language={contentType} showLineNumbers={false} />
                    )}
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={data.responseRaw.length < 500}>
                <AccordionSummary>Raw</AccordionSummary>
                <AccordionDetails>
                    <CodeHighlight code={data.responseRaw} language={contentType} showLineNumbers={false} />
                </AccordionDetails>
            </Accordion>
        </>
    );
};
