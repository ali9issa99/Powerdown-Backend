const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 }); // Change port as needed

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handling incoming messages from clients
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'sensorData') {
      // Process sensor data sent by ESP8266
      console.log(`Sensor data received: ${data}`);
      // Broadcast the sensor data to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'sensorData', payload: data }));
        }
      });
    } else if (data.type === 'controlAppliance') {
      // Handle appliance control
      console.log(`Control command: ${data.command}`);
      // Send command to ESP8266
      // Depending on the setup, you may send HTTP or MQTT requests to ESP8266
    }
  });

  // Handle connection close
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
