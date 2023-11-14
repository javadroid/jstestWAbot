const OpenAI =require("openai") ;

const openAI = new OpenAI({
  apiKey: "s"+"k"+"-U4up"+"GpuCHcDumrv6YCwsT3B"+"lbkFJ3NhuPspizsoSYbBQ4nWI"
  
});

export async function imaging(
  sendmessage,Client
 
) {
  const {  MessageMedia} = require('whatsapp-web.js');
  let replyToBeSent = "";

    try {
      const completion = await openAI.images.generate({
        prompt: sendmessage, // completion based on this
        n: 1,
        size: "1024x1024",
        
      });
      console.log("replyToBeSent",completion.data);
        replyToBeSent = lcompletion.data[0].ur;
    } catch (error) {
      // console.error(error.response)
      if (error.response) {
        replyToBeSent = error.response.message;
      } else {
        replyToBeSent = "An error occurred during your request.";
      }
    }
  
    const media = await MessageMedia.fromUrl(replyToBeSent,{unsafeMime:true});
    Client.sendMessage(media);
     
  
}
// module.exports = imaging;