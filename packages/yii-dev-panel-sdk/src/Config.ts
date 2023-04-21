export const Config = {
    backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080',
    buildVersion: 'REACT_APP_BUILD_ID' in process.env ? '#' + process.env.REACT_APP_BUILD_ID : 'development',
    appEnv: process.env.REACT_APP_ENV || 'development',
};
