

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
// import { Client  } from 'whatsapp-web.js';
const axios=require("axios")
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: './Application/chrome.exe',
}
});

client.initialize();

client.on('qr', (qr) => {
  const qrcode = require('qrcode-terminal');

  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('AUTHENTICATED');
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async (message) => {
  const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
  if (message.body.includes(".https://")) {
    client.sendMessage(message.from, 'Fetching video please wait...');
  }
  if (message.body === 'hello') {

    let mimetype;
    const attachment = await axios.get("https://via.placeholder.com/350x150.png", {
      responseType: 'arraybuffer'
    }).then(response => {
      mimetype = response.headers['content-type'];
      console.log(mimetype)
      return response.data.toString('base64');
    }).catch((err)=>{
      console.log(err)
    });
    const media = new MessageMedia(mimetype, attachment, 'Media');
    // const media = await MessageMedia.fromUrl('https://via.placeholder.com/350x150.png', { unsafeMime: true });
    // media.mimetype = "video/mp4"; media.filename = "video.mp4";
    try {
      client.sendMessage(message.from, media,{ sendMediaAsSticker: true });
    } catch (error) {
      console.log({ error })
    }


    client.sendMessage(message.from, 'pong');
  }

  if(message.hasMedia&& message.body.includes(".s")) {
    const media = await message.downloadMedia();
    if(media){
      client.sendMessage(message.from, media,{ sendMediaAsSticker: true });
    }

    return
    // do something with the media data here
}
  try {
    if (message.body.startsWith(".") ) {
      message.body= message.body.split('').slice(1).join('');
      
      if (message.body.includes('tiktok.com/@')) {
        const { ttdl } = require('btch-downloader')

        const url = 'https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226'
        // Using tiktokdl
        const data = await ttdl(message.body)
        console.log(data.video[0]) // JSON
        let mimetype;
        const attachment = await axios.get(data.video[0], {
          responseType: 'arraybuffer'
        }).then(response => {
          mimetype = response.headers['content-type'];
          console.log(mimetype)
          return response.data.toString('base64');
        }).catch((err)=>{
          console.log(err)
        });
        const media = new MessageMedia(mimetype, attachment, 'Media');
        try {
          client.sendMessage(message.from, media);
        } catch (error) {
          console.log({ error })
        }



      }
      else if (message.body.includes('instagram.com/p')) {
        const { igdl } = require('btch-downloader')

        const url = 'https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link'
        const data = await igdl(message.body)
        console.log(data[0].url)

        let mimetype;
    const attachment = await axios.get(data[0].url, {
      responseType: 'arraybuffer'
    }).then(response => {
      mimetype = response.headers['content-type'];
      console.log(mimetype)
      return response.data.toString('base64');
    }).catch((err)=>{
      console.log(err)
    });
    const media = new MessageMedia(mimetype, attachment, 'Media');
        try {
          client.sendMessage(message.from, media);
        } catch (error) {
          console.log({ error })
        }



      }
      else if (message.body.includes('twitter.com/') || message.body.includes('x.com/')) {
        const { TwitterDL } = require("twitter-downloader");

        TwitterDL(message.body).then(async (result) => {
          console.log(result.result.media[0].result[0].url);

          let mimetype;
          const attachment = await axios.get(result.result.media[0].result[0].url, {
            responseType: 'arraybuffer'
          }).then(response => {
            mimetype = response.headers['content-type'];
            console.log(mimetype)
            return response.data.toString('base64');
          }).catch((err)=>{
            console.log(err)
          });
          const media = new MessageMedia(mimetype, attachment, 'Media');
          try {
            client.sendMessage(message.from, media);
          } catch (error) {
            console.log({ error })
          }

        });

      }
      else if (message.body.includes('fb.watch/')) {

        const { fbdown } = require('btch-downloader')

        const url = 'https://fb.watch/mcx9K6cb6t/?mibextid=8103lRmnirLUhozF'
        const data = await fbdown(url)
        console.log(data.HD) // JSON
        let mimetype;
        const attachment = await axios.get(data.HD, {
          responseType: 'arraybuffer'
        }).then(response => {
          mimetype = response.headers['content-type'];
          console.log(mimetype)
          return response.data.toString('base64');
        }).catch((err)=>{
          console.log(err)
        });
        const media = new MessageMedia(mimetype, attachment, 'Media');
        try {
          client.sendMessage(message.from, media);
        } catch (error) {
          console.log({ error })
        }



      }
      else if (message.body.includes('youtube.com/') || message.body.includes('youtu.be/')) {
        const { youtube } = require('btch-downloader')

        const url = 'https://youtu.be/dBihd9w4aOg'
        const data = await youtube(message.body)
        console.log(data.link)
        let mimetype;
        const attachment = await axios.get(data.link, {
          responseType: 'arraybuffer'
        }).then(response => {
          mimetype = response.headers['content-type'];
          console.log(mimetype)
          return response.data.toString('base64');
        }).catch((err)=>{
          console.log(err)
        });
        const media = new MessageMedia(mimetype, attachment, 'Media');
        try {
          client.sendMessage(message.from, media);
        } catch (error) {
          console.log({ error })
        }


      }


      else if (message.body.startsWith('...')) {
        imaging(message.body.replace('...', ''), client,message)

      } else {
        console.log(message.body)
        messageai(message.body, client, message)

      }
    }
  } catch (error) {
    console.log({ error })
  }

});



const {
  DiscussServiceClient,
  TextServiceClient,
  v1beta2,
} = require("@google-ai/generativelanguage");

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const ChatMODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyBXoXXRqVoXnn" + "KEfsZqRz0omkQNUmLsC0s";

const client11 = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
const client2 = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

let messages = [];
async function messageai(message, Client, message1) {
  message = message.replace(/\t/g, "").replace(/[\.,!:"'/\\]/g, "");


  try {
    if (message.toLocaleLowerCase() === "clear") {
      messages = [];
      return;
    } else if (message.startsWith("..")) {
      message = message.replace("..", "");
      messages.push({ content: message });
      client11
        .generateText({
          model: MODEL_NAME,
          candidateCount: 1,
          prompt: {
            text: message,
          },
        })
        .then((result) => {

          if (result[0].candidates[0]?.output) {
            console.log(
              result[0].candidates[0].output
                .replace(/\n/g, "")
                .replace(/\t/g, "")
                .replace(/[\.,!:"'/\\]/g, "")
            );
            messages.push({
              content: result[0].candidates[0].output
                .replace(/\n/g, "")
                .replace(/\t/g, "")
                .replace(/[\.,!:"'/\\]/g, ""),
            });

            Client.sendMessage(message1.from, result[0].candidates[0].output);

          }
        });
    } else {
      messages.push({ content: message });

      const result = await client2.generateMessage({
        model: ChatMODEL_NAME,
        temperature: 0.6,

        prompt: { context: "Respond to with Nigerian Pidgin ", messages },
      });



      if (result[0].candidates[0]?.content) {
        messages.push({
          content: result[0].candidates[0]?.content
            .replace(/\n/g, "")
            .replace(/\t/g, "")
            .replace(/[\.,!:"'/\\]/g, ""),
        });
        console.log({ content: result[0].candidates });
        Client.sendMessage(message1.from, result[0].candidates[0].content);

      } else {


        client11
          .generateText({
            model: MODEL_NAME,
            candidateCount: 1,
            prompt: {
              text: message,
            },
          })
          .then((result) => {

            if (result[0].candidates[0]?.output) {
              console.log(
                result[0].candidates[0].output
                  .replace(/\n/g, "")
                  .replace(/\t/g, "")
                  .replace(/[\.,!:"'/\\]/g, "")
              );
              messages.push({
                content: result[0].candidates[0].output
                  .replace(/\n/g, "")
                  .replace(/\t/g, "")
                  .replace(/[\.,!:"'/\\]/g, ""),
              });
              Client.sendMessage(message1.from, result[0].candidates[0].output);
            }
          });
      }


    }

  } catch (error) {
    console.log(error);
  }
}




const OpenAI = require("openai");
const { Configuration, OpenAIApi }= require("openai");

const configuration = new Configuration({
  apiKey: "s"+"k"+"-U4up"+"GpuCHcDumrv6YCwsT3B"+"lbkFJ3NhuPspizsoSYbBQ4nWI"
  
});
const openAI = new OpenAIApi(configuration);

 async function imaging(
  sendmessage,Client
 
) {
  const {  MessageMedia} = require('whatsapp-web.js');
  let replyToBeSent = "";

    try {
      const completion = await openAI.createImage({
        prompt: sendmessage, // completion based on this
        n: 1,
        size: "1024x1024",
        
      });
      console.log("replyToBeSent",completion.data.data);
        replyToBeSent = completion.data.data[0].url;
  } catch (error) {
    // console.error(error.response)
    if (error.response) {
      replyToBeSent = error.response.message;
    } else {
      replyToBeSent = "An error occurred during your request.";
    }
  }

  let mimetype;
  const attachment = await axios.get(replyToBeSent, {
    responseType: 'arraybuffer'
  }).then(response => {
    mimetype = response.headers['content-type'];
    console.log(mimetype)
    return response.data.toString('base64');
  }).catch((err)=>{
    console.log(err)
  });
  const media = new MessageMedia(mimetype, attachment, 'Media');
  try {
    Client.sendMessage(message1.from, media);
  } catch (error) {
    console.log({ error })
  }



}
// module.s = imaging;