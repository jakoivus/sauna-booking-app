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
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Express API 
const express = require('express');
const { LakeFormation } = require('aws-sdk');
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
      TableName: DYNAMODB_DATA_TABLE,
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
app.post('/addUser', function (req, res) {
  console.log("addUser", req.body)
  const  {id, salution, email, firstName, lastName}  = req.body;
  
  // console.log("Hello World from getUserData")
  // res.send('Hello World! -- from getUserData')
  // if (typeof userId !== 'string') {
  //   res.status(400).json({ error: '"userId" must be a string' });
  // } else if (typeof name !== 'string') {
  //   res.status(400).json({ error: '"name" must be a string' });
  // }

  const params = {
    TableName: DYNAMODB_DATA_TABLE,
    Item: {
      email: email,
      salution: salution,
      firstName: firstName,
      lastName: lastName,
    },
  };
  
  console.log(" Email:",email)
  dynamoDb.put(params, (error) => {
    console.log("Missä Missä")
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ id, email });
  });
})


///////////////////////
// Get User endpoint //
///////////////////////
app.post('/email', function (req, res) {
  let email = "jakoivus@live.com"
  console.log("let email:", email)
  console.log("REQ body:", req.body.email)

  // console.log("Hello World from getUserData")
  // res.send('Hello World! -- from getUserData')
  const params = {
    TableName: DYNAMODB_DATA_TABLE,
    Key: {
      email: req.body.email,
    },  
  }

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const {item} = result.Item;
      res.json(result.Item);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
})

module.exports.handler = serverless(app);