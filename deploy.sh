#!/data/data/com.termux/files/usr/bin/bash

startTime=$(date +%s)

cd /data/data/com.termux/files/home/app/api-termux || exit 1

npm install || { echo "npm install failed"; exit 1; }

npm run build || { echo "Erro no build"; exit 1; }

pm2 restart api-termux || pm2 start dist/server.js --name api-termux

endTime=$(date +%s)
duration=$((endTime - startTime))

echo "Time: ${duration} s"
