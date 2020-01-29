const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
            {
            'id' : 1,
            'image': 'https://placeimg.com/64/64/1',
            'name' : '홍길자',
            'birthday' : '961212',
            'gender' : '남자',
            'job' : '대학생'    
          },
          {
            'id' : 2,
            'image': 'https://placeimg.com/64/64/2',
            'name' : '김동민',
            'birthday' : '980215',
            'gender' : '여자',
            'job' : '디지아너'    
          },
          {
            'id' : 3,
            'image': 'https://placeimg.com/64/64/3',
            'name' : '안동아',
            'birthday' : '990211',
            'gender' : '남자',
            'job' : '웹프로그래머'    
          }    
        
    ]);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
