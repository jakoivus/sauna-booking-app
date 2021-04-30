'use strict';
// index.js

// Serverless framework
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');

// AWS
const AWS = require('aws-sdk');

// DynamoDb

const DYNAMODB_EVENTS_TABLE = process.env.DYNAMODB_EVENTS_TABLE
const DYNAMODB_USERS_TABLE = process.env.DYNAMODB_USERS_TABLE

const dynamoDb = new AWS.DynamoDB.DocumentClient();


// Express API 
const express = require('express');
// const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json({ strict: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", 
    "Access-Control-Allow-Methods", "OPTIONS,POST,GET" 
  next();
});

//////////////////////////
// Hello World endpoint //
//////////////////////////
  app.get('/hello', function (req, res) {
    
    console.log("Hello World!!", req)
    res.send('BACKEND: I am alive')
  })


///////////////////////////////////
// Create AddEvent endpoint       //
///////////////////////////////////
app.post('/addEvent', function (req, res) {
  console.log("addEvent", req.body)
  const  eventsData  = req.body;
  
  const params = {
    TableName: DYNAMODB_EVENTS_TABLE,
    Item: eventsData,
    Key: {
      email: eventsData.email,
    },
  };
  
  dynamoDb.put(params, (error, result) => {
    console.log("addEvent Dynamo")
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not add Event' });
    }
    if (result) {
      const item = result.Item;
      console.log ("RESULT:", result)
      res.json(item);
    } else {
      console.log("addEvent ERROR haara")
      res.status(404).json({ error: "Could not add Event" });
      res.send('ERROR: addEventsData is alive')  
  }
  });
})

///////////////////////////////////
// Create getEventsData endpoint //
///////////////////////////////////

app.post('/getEventsData', function (req, res) {
  console.log("GET_EVENTS_DATA req.body", req.body)
  const  data= req.body;
  console.log("req.body:",data)

  const params = {
    TableName: DYNAMODB_EVENTS_TABLE,
    Key: {
      email: req.body.email,
    },  
  }
    dynamoDb.get(params, (error, result) => {
    console.log("DynamoBD")
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get events' });
      }
      if (result) {
        const item = result.Item;
        console.log ("Item:", result.Item)
        res.json(item);
      } else {
        console.log("getEvents ERROR haara")
        res.status(404).json({ error: "Could not get events" });
        res.send('ERROR: getEventsData is alive')  
    }
    })    
})

///////////////////////////////////
// Create AddUser endpoint       //
///////////////////////////////////
app.post('/addUser', function (req, res) {
  console.log("addUser", req.body)
  const  userData  = req.body;
  
  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Item: userData,
    Key: {
      email: userData.email,
    },
  };
  
  dynamoDb.put(params, (error, resp) => {
    console.log("addUser Dynamo")
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ resp });
  });
})

///////////////////////////////////
// Create getUserData endpoint   //
///////////////////////////////////

app.post('/getUserData', function(req, res){
  console.log("GET_USER_DATA req.body", req.body)
  const  data= req.body;
  console.log("req.body:",data)

  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Key: {
      email: req.body.email,
    },  
  }
  dynamoDb.get(params, (error, result) => {
      console.log("getUserData result from DymanoDB:", result)
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get user' });
      }
      if (result.Item) {
        const item = result.Item;
        console.log ("Item:", result.Item)
        res.json(item);
      } else {
        console.log("getUserData ERROR haara")
        res.json({ MSG: "User not found" });
      }
  });
})

///////////////////////////////////
// Create updateUserData endpoint       //
///////////////////////////////////
app.post('/updateUserData', function (req, res) {
  console.log("updateUserData", req.body)
  const  userData  = req.body;
  
  const params = {
    TableName: DYNAMODB_USERS_TABLE,
    Item: userData,
    Key: {
      email: userData.email,
    },
  };
  
  dynamoDb.put(params, (error, resp) => {
    console.log("updateUserData Dynamo", req.body)
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.json({ resp });
  });
})

module.exports.handler = serverless(app);