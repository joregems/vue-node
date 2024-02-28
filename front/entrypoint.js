import process from 'node:process';
import fs from 'node:fs';
const env = process.env
const content = 'VITE_API_URL='+env.SEVER_HOST+'\nVITE_FRONT_URL='+env.FRONT_HOST+'/';

try {
  fs.writeFileSync('./.env.development', content);
  // file written successfully
} catch (err) {
  console.error(err);
}