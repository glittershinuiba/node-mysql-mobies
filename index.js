

const express = require("express");
const cors = require("cors")
const app = express();
const port = 8000;

app.use(cors());


var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'bling',
  password: '0compares2u',
  database: 'moives'
});

connection.connect();
app.get('/',(req,res)=>{
  connection.query("SELECT * FROM moives order by vote_average DESC, poster_path DESC ", function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  })
}  )

app.get('/:input', (req, res) => {
  console.log(req.params.input)
  var string=req.params.input;
  switch (req.params.input){
    case '0': connection.query("SELECT * FROM moives Where id=1 LIMIT 1 ", function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }); break;
    
    case 'Science':
    case 'Comedy':
    case 'Crime':
    case 'Romance':
    case 'Action': connection.query(`SELECT * FROM moives  WHERE genres LIKE '%${string}%' order by vote_average DESC,poster_path DESC LIMIT 18`, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }); break;
    case 'Top_Rated_Movies':connection.query(`SELECT * FROM moives   order by vote_average DESC LIMIT 18`, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }); break;
    case 'Most_Popular_Movies':connection.query(`SELECT * FROM moives   order by vote_count DESC LIMIT 18`, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }); break;
    case 'Coming_Soon':connection.query(`SELECT * FROM moives Where status !='Released'  order by vote_count DESC LIMIT 18`, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    }); break;
    
    default: 
    connection.query(`SELECT * FROM moives Where title LIKE '%${string}%'`, function (error, results, fields) {
      if (error) throw error;
      res.send(JSON.stringify(results));
    });

  }
})


app.listen(port, () => console.log(`example app listening at http://localhost:${port}`))
