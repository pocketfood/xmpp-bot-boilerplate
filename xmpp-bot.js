// Has colors in CLI so you can read XML streams with ease
// the numbers const should be changed to something more else because its not just numbers my dude.

const { client, xml } = require("@xmpp/client");
const { exec } = require("child_process");

const xmpp = client({
  service: "",
  domain: "",
  resource: "bot",
  username: "",
  password: "",
});

xmpp.on("online", async (username) => {

  // tells itself its online
  // this is good to see and when bot goes online
  
  const date = new Date();
  console.log('\x1b[1m\x1b[36m','Bot Started on ',date,'\x1b[0m')

  const message = xml(
    "message",
    { type: "chat", to: username},
    xml("body", {}, 'Bot started on ', date),
  );
  await xmpp.send(message);
});

console.log('\x1b[33m%s\x1b[0m', '--- XMPP Connection ---')
xmpp.start().catch(console.error), () => {
  
};

xmpp.on("offline", () => {
    console.log("bot offline");
  });

  xmpp.on("stanza", (stanza) => {
    console.log(stanza.toString());
    console.log('\x1b[33m%s\x1b[0m', '--- XML Stream ---');
    
  });

  // Commands start here
  // reads message and outputs into terminal
  // reads only the message shown in with the bangsign !command
  
  xmpp.on("stanza", (stanza) => {

    console.log('\x1b[33m%s\x1b[0m', '--- XML Stream From User ---');
    
    // The const that makes this all happen
    // The most important CONST
    const numbers  = stanza.getChildText('body');

    if (numbers === '!systeminfo') {
      console.log('\x1b[1m\x1b[32m','--- Heres a quote ---','\x1b[0m');
      console.log('\n','\x1b[1m\x1b[36m','Message:',stanza.getChildText('body'),'\x1b[0m','\n')


    // System info command
    exec("uname -a", async (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`SystemOS: ${stdout}`);
      // if statement here

       // Sends a chat message to user
    const { to, from } = stanza.attrs;
    stanza.attrs.from = to;
    stanza.attrs.to = from;

    const message = xml(
    "message",
    { type: "chat", to: from },
    xml("body", {}, `SystemOS: ${stdout}`),
    ); 
    xmpp.send(message);
    });  
  };

  // uptime command
  if (numbers === '!uptime') {
    console.log('\x1b[1m\x1b[32m','--- Heres the uptime ---','\x1b[0m');
    console.log('\n','\x1b[1m\x1b[36m','Message:',stanza.getChildText('body'),'\x1b[0m','\n')

  exec("uptime", async (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`SystemOS: ${stdout}`);
    // if statement here

     // Sends a chat message to user
  const { to, from } = stanza.attrs;
  stanza.attrs.from = to;
  stanza.attrs.to = from;

  const message = xml(
  "message",
  { type: "chat", to: from },
  xml("body", {}, `Uptime: ${stdout}`),
  ); 
  xmpp.send(message);
  });  
};

  const bash  = ('!ping');
  //So if numbers equals to whatever thats the command its gonna execute
  if (numbers === bash) {
    console.log('\x1b[1m\x1b[32m','--- Heres a quote ---','\x1b[0m');
    console.log('\n','\x1b[1m\x1b[36m','Message:',stanza.getChildText('body'),'\x1b[0m','\n')

  exec("ping -n -c 3 google.com", async (error, stdout, stderr) => {
    if (error) {
       // Sends the command output to user if command not found
        console.log(`error: ${error.message}`);
        const { to, from } = stanza.attrs;
        stanza.attrs.from = to;
        stanza.attrs.to = from;
        const message = xml(
          "message",
          { type: "chat", to: from },
          xml("body", {}, `${error}`),
          ); 
          xmpp.send(message);  
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`${stdout}`);

     // Sends the command output to user
    const { to, from } = stanza.attrs;
    stanza.attrs.from = to;
    stanza.attrs.to = from;

    const message = xml(
    "message",
    { type: "chat", to: from },
    xml("body", {}, `${stdout}`),
    ); 
    xmpp.send(message);
  });  
};

    // Meme Command
    if (numbers === '!meme') {
      console.log('\x1b[1m\x1b[32m','--- You received a meme ---','\x1b[0m');
      console.log('\n','\x1b[1m\x1b[36m','Message:',stanza.getChildText('body'),'\x1b[0m','\n')
      
      
    // Sends a chat message to user
    const { to, from } = stanza.attrs;
    stanza.attrs.from = to;
    stanza.attrs.to = from;

    const message = xml(
    "message",
    { type: "chat", to: from },
    xml("body", {}, "ha ha meme!"),
    ); 
    xmpp.send(message);
    } 
  }); 

xmpp.on("online", (address) => {
  console.log('\x1b[1m\x1b[36m','Online as',address.toString(),'\x1b[0m','\n');
  xmpp.send(xml("presence")).catch(console.error);

});