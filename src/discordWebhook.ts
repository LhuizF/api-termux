import { BatteryStatus } from "./types";

function getBatteryColor(percentage: number) {
  if (percentage >= 51) return 0x2ecc71;
  if (percentage >= 41) return 0xf1c40f;
  if (percentage >= 21) return 0xe67e22;
  return 0xe74c3c;
}

export async function sendBatteryStatusMessage(batteryStatus: BatteryStatus) {
  const webhookURL = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookURL) {
    console.error("Webhook URL not defined in environment variables.");
    return;
  }

  const body = {
    username: "Termux Bot",
    embeds: [
      {
        title: "🔋 Status da Bateria",
        color: getBatteryColor(batteryStatus.percentage),
        fields: [
          { name: "Nível", value: batteryStatus.percentage + "%", inline: true },
          { name: "Status", value: batteryStatus.status, inline: true },
          { name: "Carregador", value: batteryStatus.plugged, inline: true },
          { name: "Temperatura", value: batteryStatus.temperature + "°C", inline: true },
          { name: "Ciclos", value: batteryStatus.cycle, inline: true },
        ],
        footer: { text: "Monitor de bateria" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const response = await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.log("Erro ao enviar mensagem:", response.statusText);
  }
}
