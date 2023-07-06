const express = require('express') ; 
const app = express() ;  
const cors = require('cors') ; 
const multer = require('multer') ; 
const bodyParser = require("body-parser");
const path = require('path')
const fs = require('fs').promises


app.use(cors())

const port = 4000
const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "postgres",
  password: "admin",
  port: 5432,
});
 
client.connect()


const parse_str  = ((thestring)=>{

  return "'"+thestring.toString()+"'"
})

//app.use(express.static("./public"));







app.post('/uploadMultiple',function(req, res) {

  var storage = multer.diskStorage({

    destination: "./public/images",
    filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
    }
    })
    

  var upload = multer({ storage: storage }).array('file');

  upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    return res.status(200).send(req.file)

  })

});




app.get('/getimages', async (req, res) => {
  const files = await fs.readdir(path.join(__dirname, '/public/images'))
  const images = []

  for (const f of files)
    images.push(await fs.readFile(path.join(__dirname, '/public/images', f), {encoding: 'base64'}))
  try {
    res.send( images ) ; 
  }
  catch{
    res.send( images ) ; 

  }
});


app.get('/select_all_products', async (req, res) => {
  // res.send('Hello World!')
  query = "select * from products" ; 
  const result = client.query(query);
  result.then(value => {
    console.log(query , value.rows,  result) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })




})
app.get('/select_one_product', async (req, res) => {
  var theid = 100 ; 
  query = " select * from products where id ="+(theid).toString()
  const result = client.query(query);
  result.then(value => {
    console.log(query , value.rows,  result) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })

})
app.get('/insert_into_new_product', async (req, res) => {
  var theid = 100 ; 
  var name = "test" ;
  var description = "test" ;
  var colors = "test" ;
  var sizes = "test" ;
  var quantities = "test" ;
  var date = "test" ;
  var images = "test" ;

  query = `INSERT INTO  products ("name" , "description" , "colors" , "sizes" , "quantities" , "date" , "images" ) 
   VALUES (${parse_str(name)} , ${parse_str(description)} , ${parse_str(colors)}  ,${parse_str(sizes)},${parse_str(quantities)}  ,${parse_str(date)} ,${parse_str(images)} ) `
  console.log(query)
  const result = client.query(query)

  result.then(value => {
    console.log(query , value.rows) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })


  })

app.get('/update_product', async (req, res) => {
  var theid = 1 ; 

  var name = "name" ;
  var description = "description" ;
  var colors = "colors" ;
  var sizes = "sizes" ;
  var quantities = "quantities" ;
  var date = "date" ;
  var images = "images" ;
  
  query = `UPDATE products SET name = ${parse_str(name)} , description = ${parse_str(description)}  , colors = ${parse_str(colors)} 
   ,sizes = ${parse_str(sizes)} , quantities = ${parse_str(quantities)}  ,
   date = ${parse_str(date)}  , images = ${parse_str(images)}  where id =${parse_str(theid)}`

  const result = client.query(query) ; 

  result.then(value => {
    console.log(query , value.rows,  result) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })
  })
  
app.get('/select_all_orders', async (req, res) => {
  theid = 100 ; 
  query = " select * from orders where on_off = true "
  const result = client.query(query);
  result.then(value => {
    console.log(query , value.rows,  result) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })

  })
  
app.get('/update_order_status', async (req, res) => {
  var theid = 1 ; 
  var status = "true" ;

  query = `UPDATE orders SET status =  ${parse_str(status)} , on_off =  false   where id =  ${parse_str(theid)} ` ; 
  const result = client.query(query) ; 

  result.then(value => {
    console.log(query , value.rows,  result) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })

  })
   
app.get('/select_all_history', async (req, res) => {
  theid = 100 ; 
  query = " select * from orders where on_off = false "
  const result = client.query(query);
  result.then(value => {
    console.log(query , value.rows) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })

  })
  

  
    
app.get('/get_all_products_shop', async (req, res) => {
  theid = 100 ; 
  query = " select * from products "
  const result = client.query(query);
  result.then(value => {
    console.log(query , value.rows,  result) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })

  })
  
app.get('/insert_into_order_shop', async (req, res) => {


  var theid = 100 ; 
  var name = "test" ;
  var group_id = 123 ;
  var color = "test" ;
  var size= "test" ;
  var quantity = "test" ;
  var date = "test" ;
  var client_name = "test" ;
  var client_surname = "test" ;
  var client_addr = "test" ;
  var client_tel = "test" ;

  var status = "null" ;
  var on_off = "true" ;

  query = `
  insert into orders ( group_id  , name ,color ,size ,quantity ,date ,client_name ,client_surname ,client_addr ,client_tel  , on_off) 
  VALUES (${parse_str(group_id)} , ${parse_str(name)} , ${parse_str(color)}  ,${parse_str(size)},
  ${parse_str(quantity)}  ,${parse_str(date)} ,${parse_str(client_name)},
  ${parse_str(client_surname)},${parse_str(client_addr)},${parse_str(client_tel)} , ${parse_str(on_off)}) 
  
  `

  console.log(query)
  const result = client.query(query)

  result.then(value => {
    console.log(query , value.rows) ; 
    res.json({ "data": value.rows});
  }).catch(err => {
    console.log(err); // 👉️ "Something went wrong"
    res.json({ "data": "error"});

  })

  })
   


app.get('/select_account_info', async (req, res) => {
    // res.send('Hello World!')
    var the_email = "test@testcom" ;
    query = `select * from all_accounts where email = ${parse_str(the_email)}` ; 
    const result = client.query(query);
    result.then(value => {
      console.log(query , value.rows,  result) ; 
      res.json({ "data": value.rows});
    }).catch(err => {
      console.log(err); // 👉️ "Something went wrong"
      res.json({ "data": "error"});
  
    })
  
  
  
  
  })

app.get('/insert_new_account', async (req, res) => {
    // res.send('Hello World!')
    var the_email = "test@testcom" ;
    var password = "password" ;
    
    query = `
    insert into all_accounts ( email  , password ) 
    VALUES (${parse_str(the_email)} , ${parse_str(password)} ) 
    
    `
    const result = client.query(query);
    result.then(value => {
      console.log(query , value.rows,  result) ; 
      res.json({ "data": value.rows});
    }).catch(err => {
      console.log(err); // 👉️ "Something went wrong"
      res.json({ "data": "error"});
  
    })
  
  
  
  
  })
  
app.get('/update_account_info', async (req, res) => {
    var theid = 1 ; 
    var password = "jjjjjjjjjjj" ;
    var the_email = "test@testcom" ;

    
    query = `UPDATE all_accounts SET password =  ${parse_str(password)}   where email =  ${parse_str(the_email)} ` ; 
    const result = client.query(query) ; 
  
    result.then(value => {
      console.log(query , value.rows,  result) ; 
      res.json({ "data": value.rows});
    }).catch(err => {
      console.log(err); // 👉️ "Something went wrong"
      res.json({ "data": "error"});
  
    })
  
    })
     

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

