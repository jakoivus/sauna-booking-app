'use strict';
// index.js

// Serverless framework
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

// AWS
const AWS = require('aws-sdk');

// DynamoDb
const DYNAMODB_USERS_TABLE = process.env.DYNAMODB_USERS_TABLE
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Express API 
const express = require('express')
const app = express()
app.use(bodyParser.json({ strict: false }));
// const cors = require('cors')
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(cors(true)) 

//////////////////////////
// Hello World endpoint //
//////////////////////////
  app.get('/hello', function (req, res) {
    console.log("Hello World")
    res.send('Hello World!')
  })

///////////////////////////////////
// Create addComment endpoint       //
///////////////////////////////////
app.post('/addComment', function (req, res) {
    console.log("addComment")
    // res.send('addComment')
    const  comment  = req.body;
    // if (typeof userId !== 'string') {
    //   res.status(400).json({ error: '"userId" must be a string' });
    // } else if (typeof name !== 'string') {
    //   res.status(400).json({ error: '"name" must be a string' });
    // }
  
    const params = {
      TableName: DYNAMODB_USERS_TABLE,
      Item: {
        userId: "jakoivus",
        comment: comment,
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


///////////////////////////////////
// Create AddUser endpoint       //
///////////////////////////////////
app.post('/users', function (req, res) {
//   console.log("addUser")
//   res.send('addUser')
// })
  // res.send('addUser')
  console.log("addUser")
  // res.send(req)
  const { userId, name } = req.body;
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Item: {
      userId: userId,
      name: name,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ userId, name });
  });
})


///////////////////////
// Get User endpoint //
///////////////////////
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Key: {
      userId: req.params.userId,
    },
  }
  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const {userId, name} = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
})


module.exports.handler = serverless(app);