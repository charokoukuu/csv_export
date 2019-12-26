const csv = require('csv');
const fs = require('fs');

const columns = {
  name: '名前',
  old: '歳',
  type: '種類',
  place: '場所',
  color: '色',
  voice: '鳴き声',
  look: '見た目'


};


const data = {
  name: 'charo',
  old: '8',
  type: 'cat',
  place: 'home',
  color: 'red tabby',
  voice: 'nyan',
  look: 'cute'
};

const stringifier = csv.stringify({ header: true, columns: columns });
const writableStream = fs.createWriteStream('export.csv', { encoding: 'utf-8' });
stringifier.pipe(writableStream);

stringifier.write(data);