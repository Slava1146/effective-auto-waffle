import fs from 'fs';

export function readJson(filePath: string) {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}
