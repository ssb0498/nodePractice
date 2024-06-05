import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import db from './models/index.js';

import indexRouter from './routes/index.js';


dotenv.config();  // node.js에서는 process.env로 환경변수에 접근하는데 dotenv.config()를 해줘야 우리가 .env에 명시해둔 환경변수들이 process.env 객체에 들어감

const app = express();


app.set('port', process.env.PORT || 3000); // port 설정 : .env에 있는 PORT가 없으면 3000번 포트로 연결



app.use(cookieParser());  // 쿠키 파싱 (req.cookies로 접근 가능)
console.log("here")

db.sequelize.authenticate().then(() => {
  console.log('DB connection Success!');
  
  db.sequelize.sync({alter: true}).then(() => {
    console.log('DB sync Success!');
  }).catch((err) => { console.error('db sync error', err); });
}).catch((err) => { console.error('db connect fail!', err); });

// 'content-type': 'application/json',
app.use(express.json(), (req, res, next) => {
  console.log('json start')
  console.log(req.headers);
  console.log(req.body);
  console.log('json end')
  next();
});
app.use('/', indexRouter);

app.use(express.urlencoded({ extended: false }), (req, res, next) => {
  console.log('urlencoded start')
  console.log(req.headers);
  console.log(req.body);
  console.log('urlencoded end')
  next();
}); // application/x-www-form-urlencoded 형식으로 인코딩된 데이터를 파싱

app.listen(app.get('port'), () => {
  console.log(`Server on port http://localhost:${app.get('port')}`);
  console.log(app._router.stack); // 스택 구조 출력
});


// [
//   {
//     "path": "/user",
//     "methods": [
//       "post"
//     ],
//     "stack": [
//       "isLoggedIn",
//       "async"
//     ]
//   }
// ]
