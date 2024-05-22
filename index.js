const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const request = require("request"); 
const cheerio = require("cheerio"); 

const app = express()
const port = 4001

app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json())

app.get('/', function(req, res){

    request("https://www.finmarket.ru/currency/rates/", cb); 

    function cb(error, response, html) { 
        if (error) { 
          console.error("Error:", error); 
        } else { 
          handleItem(html); 
        } 
      } 
      function handleItem(html) { 
        let setTool = cheerio.load(html); 
        let contentArr = setTool(".fintool_button .value"); 
        
        let USD = setTool(contentArr[0]).text(); 
        let EUR = setTool(contentArr[1]).text(); 
        let recovered = setTool(contentArr[2]).text(); 

        let JSONcurrency = {
          USD: USD,
          EUR: EUR,
          RUB: "1"
        }
        
        res.send(JSONcurrency); 
      } 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
