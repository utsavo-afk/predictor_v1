import { loadEnvConfig } from "@next/env"
// import path from "path"

const projectDir = process.cwd()
loadEnvConfig(projectDir)

interface EnvConfig {
    NODE_ENV: string;
    MONGODB_URI: string;
    FOOTBALL_DATA_ORG_API_TOKEN: string;
}

function validateEnvVars(): EnvConfig {
  const requiredVars = ['MONGODB_URI', 'FOOTBALL_DATA_ORG_API_TOKEN'];
  const missing: string[] = [];

  // Check for required environment variables
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   • ${varName}`);
    });
    console.error('\nPlease check your .env.local file');
    process.exit(1);
  }

  return {
    MONGODB_URI: process.env.MONGODB_URI!,
    NODE_ENV: process.env.NODE_ENV || 'development',
    FOOTBALL_DATA_ORG_API_TOKEN: process.env.FOOTBALL_DATA_ORG_API_TOKEN!
  };
}

export const env = validateEnvVars();

export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';

if (isDevelopment) {
  console.log('🔧 Environment loaded:', {
    NODE_ENV: env.NODE_ENV,
    MONGODB_URI: env.MONGODB_URI ? '✅ Set' : '❌ Missing',
    FOOTBALL_DATA_ORG_API_TOKEN: env.FOOTBALL_DATA_ORG_API_TOKEN ? '✅ Set' : '⚠️  Using default'
  });
}