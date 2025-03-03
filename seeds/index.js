const mongoose = require('mongoose');
const Player = require('../models/player');
const Sponsor = require('../models/sponsor');
const Contact = require('../models/contact');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/Picky',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('MongoDBコネクションOK');
  })
  .catch(err => {
    console.log('MongoDBコネクションエラー');
    console.log(err);
  });

const seedDB = async () => {
  await Player.deleteMany({});
  await Sponsor.deleteMany({});
  await Contact.deleteMany({});
  await User.deleteMany({});

  // シードデータ未作成
  // for (let i = 0; i < 10; i++) {
  //   // 選手データ
  //   const player = new Player({
  //     career: ['渋谷テスト', '品川テスト', 'テスト大学', 'テスト高校'],
  //     record: ['テスト受賞', 'テスト王', 'テスト賞', 'テストメンバー入り'],
  //     contractsponsor: ['テスト社', '株式会社テスト', 'テスト'],
  //     lastname: '山田',
  //     firstname: '太郎',
  //     birthyear: '1993',
  //     birthmonth: '12',
  //     birthday: '8',
  //     nationality: '日本',
  //     birthplace: '東京都品川区',
  //     workarea: '東京都渋谷区',
  //     height: 170,
  //     weight: 66,
  //     bloodtype: 'B',
  //     affiliationteam: '品川テスト',
  //     position: 'FW',
  //     dominantfoot: '右',
  //     returndetail: '角丸を大きくしたり小さくしたりするには、',
  //     desiredsupport: '角丸を大きくしたり小さくしたりするには、',
  //     target: {
  //       playerwork: '角丸を大きくしたり小さくしたりするには、',
  //       socialwork: '角丸を大きくしたり小さくしたりするには、ティリティAPIを変更することで設定することができます。',
  //       otherwork: '角丸を大きくしことで設定することができます。'
  //     },
  //     message: '角丸を大きくしたり小さくしたりするには、スケーリンィAPIを変更することで設定することができます。',
  //     images: [
  //       {
  //         url: 'https://res.cloudinary.com/dfoys0g8b/image/upload/v1740890807/Picky/adccu7sdb56qs2vof4w6.jpg',
  //         filename: 'Picky/adccu7sdb56qs2vof4w6'
  //       },
  //       {
  //         url: 'https://res.cloudinary.com/dfoys0g8b/image/upload/v1740891187/Picky/lm3f6zdfkkmowqbwesrz.jpg',
  //         filename: 'Picky/lm3f6zdfkkmowqbwesrz'
  //       },
  //       {
  //         url: 'https://res.cloudinary.com/dfoys0g8b/image/upload/v1740891189/Picky/yv6emowffnxzzl5zgrak.jpg',
  //         filename: 'Picky/yv6emowffnxzzl5zgrak'
  //       }
  //     ],
  //     author: '67b1b56b2f75a6185445771a'
  //   });
  //   await player.save();
  // 
  //   // スポンサーデータ
  //   const sponsor = new Sponsor({
  //     contractplayer: 
  // 
  //   });
  //   await sponsor.save();
  // }
}

seedDB().then(() => {
  mongoose.connection.close();
});