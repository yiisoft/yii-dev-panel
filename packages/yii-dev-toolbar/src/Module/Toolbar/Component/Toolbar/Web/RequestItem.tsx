import {DataObject, DynamicFeed, Repeat, Route} from '@mui/icons-material';
import {Button, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip, Typography} from '@mui/material';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';
import {buttonColorHttp} from '@yiisoft/yii-dev-panel-sdk/Helper/buttonColor';
import {serializeCallable} from '@yiisoft/yii-dev-panel-sdk/Helper/callableSerializer';
import {NestedMenuItem} from 'mui-nested-menu';
import React, {useState} from 'react';
import {CollectorsMap} from "@yiisoft/yii-dev-panel-sdk/Helper/collectors";

type RequestItemProps = {
    data: DebugEntry;
};
export const RequestItem = ({data}: RequestItemProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const summary = data.summary;
    const request = summary[CollectorsMap.RequestCollector].request
    const response = summary[CollectorsMap.RequestCollector].response;
    const router = summary[CollectorsMap.RouterCollector];

    return (
        <>
            <Tooltip title="Click to see more options" arrow>
                <Button
                    color={buttonColorHttp(response.statusCode)}
                    variant="contained"
                    onClick={handleClick}
                    sx={{
                        whiteSpace: 'nowrap',
                        textTransform: 'none',
                        borderRadius: 0,
                    }}
                >
                    {request.method}&nbsp;
                    {request.path}&nbsp;
                    {String(response.statusCode)}
                </Button>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'top', horizontal: 'left'}}
                transformOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Repeat fontSize="small" />
                    </ListItemIcon>
                    Repeat
                </MenuItem>
                {router?.middlewares && (
                    <NestedMenuItem
                        onClick={handleClose}
                        sx={{
                            padding: '6px 16px',
                        }}
                        leftIcon={
                            <DynamicFeed
                                fontSize="small"
                                sx={{
                                    color: 'text.secondary',
                                    mr: 1,
                                }}
                            />
                        }
                        label="Middlewares"
                        parentMenuOpen={open}
                    >
                        {router.middlewares.map((middleware, index) => (
                            <MenuItem key={index} onClick={handleClose}>
                                <ListItemText color="text.secondary">
                                    {index + 1}. {serializeCallable(middleware)}
                                </ListItemText>
                            </MenuItem>
                        ))}
                    </NestedMenuItem>
                )}
                {router?.action && (
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <DataObject fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Action</ListItemText>
                        <Typography variant="body2" color="text.secondary" ml={2}>
                            {serializeCallable(router.action)}
                        </Typography>
                    </MenuItem>
                )}
                {router?.name && (
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Route fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Route</ListItemText>
                        <Typography variant="body2" color="text.secondary" ml={2}>
                            {router.name}
                        </Typography>
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};
