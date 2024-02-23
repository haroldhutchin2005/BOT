const axios = require("axios");
const fs = require("fs");

module.exports.config = {
  name: "shoti", //change it you want 
  version: "1.0.0",
  hasPermission: 0,
  credits: "Jonell Magallanes",
  description: "Customize your description",
  usePrefix: true,
  commandCategory: "media",
  cooldowns: 20,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const commandName = args[0] || module.exports.config.name;

  api.sendMessage(`⏱️ | Sending ${commandName} please wait...`, event.threadID, event.messageID);
  api.setMessageReaction("⏱️", event.messageID, () => {}, true);

  const videoUrl = `09d1025b-78c0-4b6f-8ae8-ff8f2db4f554`; //replace your link with api keys and usernames
  const apiUrl = `https://shotialternativejonellmagallanes.replit.app/video/${videoUrl}`;

  const response = await axios.get(apiUrl, {
    responseType: 'arraybuffer'
  }).catch(error => {
    api.sendMessage("Error fetching video.", event.threadID, event.messageID);
    console.error(error);
    return;
  });

  if (response && response.status === 200) {
    const filePath = __dirname + "/shotialt.mp4";
    fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'), "binary");
    api.setMessageReaction("✅", event.messageID, () => {}, true);
    
    const tid = event.threadID;
    api.sendMessage({
      body: `Shoti\nID:${tid}`,
      attachment: fs.createReadStream(filePath)
    }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);
  } else {
    api.sendMessage("Failed to retrieve a video.", event.threadID, event.messageID);
    api.setMessageReaction("🔭", event.messageID, () => {}, true);
  }
};
