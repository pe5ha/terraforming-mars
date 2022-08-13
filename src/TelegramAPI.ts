import {Player} from '@/Player';
import {Game} from '@/Game';
import fetch from 'node-fetch';

// sending push about player turns via telegram bot
export function sendTelegramPush(player: Player, message: String = ', your turn! 🪐') {
  if(!player.telegramID) return;
  const chat_id = player.telegramID;
  const text = player.name + message;
  sendMessage(chat_id, text);
}

export function sendGameResultsInTelegramChats(game: Game){
  let text = "";
  game.getPlayers().forEach((player)=>{
    text+=player.getVictoryPoints().total+" "+player.name+"%0A";
    sendMessage(player.telegramID,", the game is over.");
  });

  const chat_id = process.env.BOT_GROUP_CHAT_ID;
  sendMessage(chat_id, text);
}

// sending notice about player turns via telegram bot
export function sendTelegramNoticeGameStart(player: Player){
  if(!player.telegramID) return;
  const chat_id = player.telegramID;
  const notice = ', new game start! 🚀 Your link: '+process.env.HOST+'/player?id='+player.id;
  const text = player.name + notice;
  sendMessage(chat_id, text);
}

// sending notice about player turns via telegram bot
export function sendTelegramNotice(player: Player){
  if(!player.telegramID) return;
  const chat_id = player.telegramID;
  const notice = ', your turn! 🪐';
  const text = player.name + notice;
  const message = sendMessage(chat_id, text);
  message.then(function(data){
    console.log(data);
    if(data.result.message_id) player.lastNoticeMessageId = data.result.message_id;
    console.log(player.lastNoticeMessageId);
  });
}

export function deleteTelegramNotice(player: Player){
  if(!player.telegramID) return;
  const chat_id = player.telegramID;
  const message_id = player.lastNoticeMessageId;
  deleteMessage(chat_id,message_id);
}

async function sendMessage(chat_id: String|undefined, text: String|undefined){
  const token = process.env.BOT_TOKEN;
  if (token) {
    const queryString = 'https://api.telegram.org/bot' + token + '/sendMessage?chat_id=' + chat_id + '&text=' + text;
    console.log(queryString);
    try {
      return (await fetch(queryString)).json();
      // let resp = fetch(queryString);
      // (await resp).json().then(function(data) {  
      //   message = data.result;
      // });
    } catch (e) {
    }
  }
  return null;
}

function deleteMessage(chat_id: String|undefined, message_id: number|undefined){
  const token = process.env.BOT_TOKEN;
  if (token) {
    const queryString = 'https://api.telegram.org/bot' + token + '/deleteMessage?chat_id=' + chat_id + '&message_id=' + message_id;
    console.log(queryString);
    try {
      fetch(queryString);
    } catch (e) {
    }
  }
}