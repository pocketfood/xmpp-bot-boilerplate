# xmpp-bot-boilerplate
Execute basic shell commands through xmpp. 

Only runs on linux.

---

`npm install xmpp @xmpp/client @xmpp/debug ` 

then

`node xmpp-bot.js`

---

# Groupchat stanza

`xmpp.send(xml('presence', {from: '', to: ''}, xml('x', {xmlns: 'http://jabber.org/protocol/muc'}))`

Make sure to specify the nick name at the end of the conference or you will get a malformed error

:)
