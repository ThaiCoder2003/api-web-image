// src/types/globals.d.ts (or react-app-env.d.ts)

// Extend the existing NodeJS ProcessEnv interface to include your custom env variable
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    // Add the specific environment variable you are using
    readonly REACT_APP_UNSPLASH_ACCESS_KEY: string | undefined;
    // Add any other REACT_APP_ variables here
  }
}