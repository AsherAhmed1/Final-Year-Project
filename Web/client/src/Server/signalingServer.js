// "use strict";
// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', (ws) => {
//   console.log('New client connected');
  
//   ws.on('message', (message) => {
//     console.log('Received message:', message);
    
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });

//   ws.on('error', (error) => {
//     console.error('WebSocket error:', error);
//   });
// });

// console.log('Signaling server is running on ws://localhost:8080');



//--------------------------------------------------------------------------------------




// const fs = require('fs');
// const https = require('https');
// const WebSocket = require('ws');

// // Create an HTTPS server
// const server = https.createServer({
//   key: fs.readFileSync('C:\\Program Files\\Git\\usr\\bin\\key.pem', 'utf8'),
//   cert: fs.readFileSync('C:\\Program Files\\Git\\usr\\bin\\cert.pem'),
//   passphrase: '123abc@@'
// });

// // Create a WebSocket server attached to the HTTPS server
// const wss = new WebSocket.Server({ noServer: true });

// // WebSocket connection handling
// wss.on('connection', (ws) => {
//   ws.on('message', (message) => {
//     // Broadcast the received message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

// // Upgrade HTTP server to support WebSocket
// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

// // Start the HTTPS server
// server.listen(8080, () => {
//   console.log('Signaling server is running on https://localhost:8080');
// });

// // Log WebSocket server URL
// console.log('Signaling server is running on ws://localhost:8080');



//-----------------------------------------------------------------------------------------




"use strict";
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (message) => {
    console.log('Received message:', message);
    
    try {
      const data = JSON.parse(message);
      // Broadcasting the parsed JSON message to all clients except the sender
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // Handle the error, or simply ignore the message if it's not valid JSON
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('Signaling server is running on ws://localhost:8080');
