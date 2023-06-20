export const Config = {
    backendUrl: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
    buildVersion: 'VITE_BUILD_ID' in import.meta.env ? '#' + import.meta.env.VITE_BUILD_ID : 'development',
    appEnv: import.meta.env.VITE_ENV || 'development',
};
