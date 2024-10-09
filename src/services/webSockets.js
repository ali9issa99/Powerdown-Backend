import { WebSocketServer } from 'ws';  // Adjust import

const wss = new WebSocketServer({ host: '0.0.0.0', port: 8081 });  // Change to 0.0.0.0 and port 8081

let esp8266Client = null; // To keep track of ESP8266 connection
let flutterClient = null; // To keep track of Flutter client connection

// Error handling for the WebSocket server
wss.on('error', (error) => {
  console.error('WebSocket Server Error:', error);
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    let data;
    try {
      data = JSON.parse(message);
    } catch (e) {
      console.error('Invalid JSON message received:', message);
      return;
    }

    // Identify the client (ESP8266 or Flutter)
    if (data.type === 'identify' && data.client === 'esp8266') {
      esp8266Client = ws;
      console.log('ESP8266 connected');
    } else if (data.type === 'identify' && data.client === 'flutter') {
      flutterClient = ws;
      console.log('Flutter App connected');
    }

    // ESP8266 sending sensor data
    if (data.type === 'sensorData') {
      console.log(`Sensor data received: ${JSON.stringify(data)}`);

      // Forward sensor data to the Flutter app
      if (flutterClient && flutterClient.readyState === WebSocket.OPEN) {
        flutterClient.send(JSON.stringify({
          type: 'sensorData',
          payload: data,
        }));
      }
    }

    // Flutter app sending appliance control commands
    if (data.type === 'controlAppliance' && esp8266Client) {
      console.log(`Control command from Flutter: ${data.command}`);

      // Forward the control command to ESP8266
      if (esp8266Client.readyState === WebSocket.OPEN) {
        esp8266Client.send(JSON.stringify({
          type: 'controlAppliance',
          command: data.command,
        }));
      }
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    if (ws === esp8266Client) esp8266Client = null;
    if (ws === flutterClient) flutterClient = null;
  });

  // Handle errors for each client
  ws.on('error', (error) => {
    console.error('WebSocket Client Error:', error);
  });
});

console.log('WebSocket server is running on ws://0.0.0.0:8081');  // Changed to 0.0.0.0 and port 8081
