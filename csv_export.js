const csv = require('csv')
const fs = require('fs')
const admin = require('firebase-admin');
const serviceAccount = require('./myfirebasechatapp-ed95d-firebase-adminsdk-vcd3o-03d7a434ad.json');

const columns = {
  name: '名前',
  old: '歳',
  type: '種類',
  place: '場所',
  color: '色',
  voice: '鳴き声',
  look: '見た目'
}

const data = [
  {
    name: 'charo',
    old: '8',
    type: 'cat',
    place: 'home',
    color: 'red tabby',
    voice: 'nyan',
    look: 'cute',
    text: "hello"
  },
  {
    name: 'neko',
    old: '82',
    type: 'cat',
    place: 'home',
    color: 'red tabby',
    voice: 'nyan',
    look: 'cute'
  }
];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const stringifier = csv.stringify({ header: true, columns: columns });
const writableStream = fs.createWriteStream('export.csv', { encoding: 'utf-8' });
stringifier.pipe(writableStream);

const db = admin.firestore();
db.collection('col').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      stringifier.write(doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
// data.forEach(e => { stringifier.write(e); });