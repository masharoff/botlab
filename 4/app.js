var restify = require('restify');
var builder = require('botbuilder');
var i18n = require('i18n');
var parser = require('./parse-inquire');

const inMemoryStorage = new builder.MemoryBotStorage();

// i18n configuration
i18n.configure({
    defaultLocale: process.env.DEFAULT_LOCALE ? process.env.DEFAULT_LOCALE : 'en',
    directory: __dirname + '/locales'
});

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3982, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.userData.profile = parser.ParseInquire(session.message.text);
    if (session.userData.profile.greeting) {
        session.send(i18n.__("greeting"));
    }
    else {
        session.send("You said: %s", session.message.text);
    }
}).set('storage', inMemoryStorage);