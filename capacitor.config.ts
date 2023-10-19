import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'io.ionic.starter',
    appName: 'dealerpay-mobile',
    webDir: 'dist',
    server: {
        androidScheme: 'https'
    },
    plugins: {
        CapacitorHttp: {
            enabled: true
        }
    }
};

export default config;
