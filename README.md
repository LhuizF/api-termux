# API Termux - Backend

Projeto backend Node.js + TypeScript para rodar no Termux, com esbuild para build e deploy via script shell.

### O que é Termux?

Termux é um emulador de terminal para Android que oferece um ambiente Linux, sem precisar de root no aparelho, permitindo instalar e usar ferramentas e linguagens de programação como se estivesse em um sistema Linux.

---

### Requisitos

- Node.js e git instalado no Termux

```shell
pkg install nodejs git -y
```

- pm2 instalado globalmente

```shell
npm install -g pm2
```

- Termux com permissões adequadas para rodar scripts

---

### Rodando no Termux

1. Clone o repositório:

```shell
git clone https://github.com/LhuizF/api-termux
cd api-termux
```

2. Rode o script de deploy

```shell
chmod +x ./deploy.sh
./deploy.sh
```

Se tudo der certo a api vai rodar na porta **3333**.

---

### Como descobrir o IP para acessar a API externamente

Rode:

```shell
termux-wifi-connectioninfo
```

O endereço será o IP atual do seu dispositivo na rede wi-fi.

_Para o comando `termux-wifi-connectioninfo` funciona, precisa ter o termux-api instalado no dispositivo._

### Endpoints

`GET /`
Retorna informações básicas da incluindo o tempo de atividade (uptime) e a data/hora atual do servidor.

Exemplo de resposta:

```json
{
  "uptime": "0h 15m 58s",
  "date": "8/10/2025, 3:13:17 PM"
}
```

uptime: Tempo que a aplicação está rodando desde o último start.

date: Data e hora atuais do servidor.

`GET /battery`
Retorna informações sobre o estado da bateria do dispositivo, conforme coletado pelo comando termux-battery-status.

Exemplo de resposta:

```json
{
  "present": true,
  "technology": "Li-poly",
  "health": "GOOD",
  "plugged": "UNPLUGGED",
  "status": "DISCHARGING",
  "temperature": 21,
  "voltage": 3823,
  "current": 674400,
  "current_average": -14800,
  "percentage": 58,
  "level": 58,
  "scale": 100,
  "charge_counter": 2872740,
  "energy": null,
  "cycle": 2
}
```
