
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1af45a16250e4ebf91234e9b29645306',
  appName: 'Spendora',
  webDir: 'dist',
  server: {
    url: 'https://1af45a16-250e-4ebf-9123-4e9b29645306.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: "#FFFFFF"
  }
};

export default config;
