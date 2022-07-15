import {Player} from '@/Player';
import fetch from 'node-fetch';

// sending push about player turns via telegram bot
export function sendTelegramPush(player: Player, message: String = ', your turn! 🪐') {
  const token = process.env.BOT_TOKEN;
  if (token) {
    const chat_id = player.telegramID;
    const text = player.name + message;
    const queryString = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chat_id + '&text=' + text;
    console.log(queryString);
    try {
      fetch(queryString);
    } catch (e) {
    }
  }
}
