const Discord = require('discord.js');
const Natural = require('natural');
const Intersect = require('intersect');
const http = require('http')
const client = new Discord.Client();


positivityPhrases = [
  'You can do it!',
  'Hang in there!',
  'Tomorrow is a brand new day!',
  'It\'s ok, I get nervous sometimes too!',
  'Reach for the stars! - Akaya Kimuryu',
  'If Donald Trump could do it, you can too!',
  'At least your mom thinks your cool!',
  'Cheer up, buttercup!',
  'Turn that frown upside down!',
  'Keep your face to the sunshine and you cannot see a shadow.',
  'The day is what you make it! So why not make it a great one?',
  'Write it on your heart that every day is the best day in the year.',
  'The greatest discovery of all time is that a person can change his future by merely changing his attitude.',
];

sadWords = [ 'sad',
  '😦',
  ':(',
  'unhappy',
  'mad',
  'angry',
  'hate',
  'you suck',
  '\';\'',
  'wahh',
]

function handler(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Positivity!');
};

function positivity() {
  var item = positivityPhrases[
    Math.floor(Math.random() * positivityPhrases.length)
  ];
  return item;
}


var server = http.createServer(handler);
var tokenizer = new Natural.WordPunctTokenizer();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
  var words = tokenizer.tokenize(msg.content);

  // cleaned words
  for (var i = 0; i < words.length; i++)
    words[i] = words[i].trim().toLowerCase();

  if (words[0] == '!' && words[1] == 'positive') {
    msg.reply(positivity());
  }

  if (Intersect(words, sadWords).length > 0) {
    msg.reply(positivity());
  }
});

client.login(process.env['DISCORD_TOKEN']);
server.listen(process.env['PORT']);
