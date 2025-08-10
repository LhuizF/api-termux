import express from 'express';
import { exec } from 'child_process';

const app = express();
const port = 3333;

app.get('/', (req, res) => {
  res.json({
    uptime: process.uptime(),
    date: new Date().toLocaleString(),
  })
})

app.get('/battery', (req, res) => {
  exec('termux-battery-status', (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao parse resposta' });
    }
  })
});

app.listen(port, () => {
  console.log(`Server port ${port}`);
});
