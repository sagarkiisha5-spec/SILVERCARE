import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.silvercare.app',
  appName: 'SilverCare India',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
