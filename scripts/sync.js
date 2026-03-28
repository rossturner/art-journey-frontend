import { generateWorkspaceIndex } from './generate-workspace-index.js';
import { generateEventsIcs } from './generate-events-ics.js';
import { execSync } from 'node:child_process';

const WORKSPACE_ROOT = process.env.WORKSPACE_ROOT || '/mnt/d/artwork/workspace';
const R2_BUCKET = process.env.R2_BUCKET || 'r2:art-journey';

console.log('=== Step 1: Generate workspace-index.json ===');
generateWorkspaceIndex();

console.log('\n=== Step 2: Generate events.ics ===');
generateEventsIcs();

console.log('\n=== Step 3: Sync to R2 ===');
const rcloneExe = process.env.RCLONE || 'rclone.exe';
const winPath = execSync(`wslpath -w "${WORKSPACE_ROOT}"`, { encoding: 'utf8' }).trim();
const rcloneCmd = `${rcloneExe} sync "${winPath}" ${R2_BUCKET} --progress`;
console.log(`Running: ${rcloneCmd}`);
execSync(rcloneCmd, { stdio: 'inherit' });

console.log('\nSync complete.');
