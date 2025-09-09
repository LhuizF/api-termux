import 'dotenv/config';
import express from 'express';
import { exec } from 'child_process';
import cron from 'node-cron';
import { sendBatteryStatusMessage } from './discordWebhook';
import { BatteryStatus } from './types';

const app = express();
const port = 3333;

const getBatteryStatus = (): Promise<BatteryStatus> => {
  return new Promise((resolve, reject) => {
    exec('termux-battery-status', (error, stdout) => {
      if (error) {
        return reject(error);
      }
      try {
        const data = JSON.parse(stdout);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  });
};

app.get('/', (req, res) => {
  const seconds = process.uptime();
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  res.json({
    uptime: `${hrs}h ${mins}m ${secs}s`,
    uptimeSeconds: seconds,
    date: new Date().toLocaleString(),
  })
})

app.get('/battery', (req, res) => {
  getBatteryStatus()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Server port ${port}`)
  cron.schedule('0 * * * *', () => {
    getBatteryStatus()
      .then(data => sendBatteryStatusMessage(data))
      .catch(err => console.error("Error fetching battery status:", err));
  });
});
