'use strict';
// index.js

// Serverless framework
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

// AWS
const AWS = require('aws-sdk');

// DynamoDb

const DYNAMODB_DATA_TABLE = process.env.DYNAMODB_DATA_TABLE
const DYNAMODB_USERS_TABLE = process.env.DYNAMODB_USERS_TABLE
const DYNAMODB_COMMENTS_TABLE = process.env.DYNAMODB_COMMENTS_TABLE


const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Express API 
const express = require('express');
const app = express()
app.use(bodyParser.json({ strict: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//////////////////////////
// Hello World endpoint //
//////////////////////////
  app.get('/hello', function (req, res) {
    console.log("Hello World")
    res.send('Hello World!')
  })

///////////////////////////////////
// Create addComment endpoint    //
///////////////////////////////////
app.post('/addComment', function (req, res) {
    console.log("addComment")
    // res.send('addComment')
    const  comment = req.body;
    console.log("addComment req.body:" ,req.body)
    // if (typeof userId !== 'string') {
    //   res.status(400).json({ error: '"userId" must be a string' });
    // } else if (typeof name !== 'string') {
    //   res.status(400).json({ error: '"name" must be a string' });
    // }
  
    const params = {
      TableName: DYNAMODB_COMMENTS_TABLE,
      Item: comment,
      Key:  {
        id: comment.id
      },
    };
    console.log("comment", comment)
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not addComment' });
      }
      res.json({ comment });
    }); 
  })

  
/////////////////////////////////////
// Create deleteComment endpoint   //
/////////////////////////////////////

  app.post('/deleteComment', function (req, res) {
    const comment = req.body
    console.log("DELETE COMMENT:", comment)
    const params = { 
      TableName: DYNAMODB_COMMENTS_TABLE,
      Key: {
        id: comment.id
      },  
    };
    dynamoDb.delete(params, (error) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not deleteComment' });
      }
      res.json({ comment });
    });
    res.send('Got a DELETE request at /user')
  })  

///////////////////////////////////
// Create getComments endpoint   //
///////////////////////////////////
app.get('/getComments', function (req, res) {
  const params = { 
    TableName: DYNAMODB_COMMENTS_TABLE  
  }
  dynamoDb.scan (params,( error, comments ) => {
    console.log("comments:",comments)
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not read comments from DB' });
    } else {
      res.json (comments)
    }
  })
})

app.post('/updateUserData', function(req, res){
  console.log("UPDATE_USER_DATA req.body", req.body)
  // res.send('UDPDATE_USER_DATA')
  
  const  userData = req.body;

  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Item: userData,
    Key: {
      email: userData.email,
    },  
  }
  dynamoDb.get(params, (error, result) => {
    console.log("MISSä MISSÄ")
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result.Items) {
        const {item} = result.Items;
        res.json(result.Items);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    });
}
)

///////////////////////////////////
// Create AddUser endpoint       //
///////////////////////////////////
app.post('/addUser', function (req, res) {
  console.log("addUser", req.body)
  const  userData  = req.body;
  
  
  // console.log("Hello World from getUserData")
  // res.send('Hello World! -- from getUserData')
  // if (typeof userId !== 'string') {
  //   res.status(400).json({ error: '"userId" must be a string' });
  // } else if (typeof name !== 'string') {
  //   res.status(400).json({ error: '"name" must be a string' });
  // }

  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Item: userData,
    Key: {
      email: userData.email,
    },
  };
  
  dynamoDb.put(params, (error, resp) => {
    console.log("Missä Missä")
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ resp });
  });
})


///////////////////////
// Get User endpoint //
///////////////////////
app.post('/getUser', function (req, res) {
  // res.send('addComment')
  const  comment = req.body;
  console.log("getComment req.body:" ,req.body)
// app.post('/getUser', function (req, res) {
  // let email = "jakoivus@live.com"
  // console.log("let email:", email)
  // const  userData  = req.body;
  // const email = "jakoivus@live.com"

  // console.log("Hello World from getUserData")
  res.send('Hello World! -- from getUserData')
  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Key: {
      email: req.body.email,
    },  
  }
  console.log("getUser", req.body)
  
  // dynamoDb.get(params, (error, result) => {
  //   if (error) {
  //     console.log(error);
  //     res.status(400).json({ error: 'Could not get user' });
  //   }
  //   if (result.Items) {
  //     const {item} = result.Items;
  //     res.json(result.Items);
  //   } else {
  //     res.status(404).json({ error: "User not found" });
  //   }
  // });
})

module.exports.handler = serverless(app);