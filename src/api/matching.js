import { API } from "aws-amplify";
import store from "../store";

const API_AUTH = "api9f77a9d3";

const getMailSubject = () => "Nomad links - メッセージが届きました";
const getMailText = (fromUser, message) => {
  return `${fromUser.name} さんからメッセージが届きました！
${fromUser.name} さんへ返信のメッセージを送ってみましょう。
（本メールへの返信ではなく、以下のメールアドレス宛にお願い致します。）
  
【${fromUser.name} さんのプロフィール】
https://nomad-links.net/user/${fromUser.id}
  
【${fromUser.name} さんのメールアドレス】
${fromUser.email}

【メッセージ】
${message}

----------------------------
Nomad-links
サービスサイト: https://nomad-links.net/
お問い合わせ: nomadlinks.japan@gmail.com
`;
};

const sendMessage = async (toUserId, message) => {
  const fromUser = store.state.user.authUserProfile;
  const subject = getMailSubject();
  const text = getMailText(fromUser, message);
  return API.post(API_AUTH, "/matching/message", {
    body: {
      userId: toUserId,
      subject: subject,
      text: text
    }
  });
};

export default {
  sendMessage
};
