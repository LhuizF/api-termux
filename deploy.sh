#!/data/data/com.termux/files/usr/bin/bash

cd /data/data/com.termux/files/home/app/api-termux || exit 1

npm install || { echo "npm install failed"; exit 1; }

npm run build || { echo "Erro no build"; exit 1; }

pm2 restart api-termux || pm2 start dist/server.js --name api-termux
