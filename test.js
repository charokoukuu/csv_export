const admin = require('firebase-admin');
const serviceAccount = require('./myfirebasechatapp-ed95d-firebase-adminsdk-vcd3o-03d7a434ad.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://myfirebasechatapp-ed95d.firebaseio.com"
});

//↑ここまでは共通 ↓ここから記述が分かれる

const db = admin.firestore();
db.collection('col').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });