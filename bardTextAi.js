const {
  DiscussServiceClient,
  TextServiceClient,
  v1beta2,
} = require("@google-ai/generativelanguage");

const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const ChatMODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyBXoXXRqVoXnn" + "KEfsZqRz0omkQNUmLsC0s";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
const client2 = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

let messages = [];
export async function messageai(message, Client, message1) {
  message = message.replace(/\t/g, "").replace(/[\.,!:"'/\\]/g, "");


  try {
    if (message.toLocaleLowerCase() === "clear") {
      messages = [];
      return;
    } else if (message.startsWith("..")) {
      message = message.replace("..", "");
      messages.push({ content: message });
      client
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


        client
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

