// service-worker.js

let socket = null;
const apiKey = "cq3aa79r01qobiisg6pgcq3aa79r01qobiisg6q0";
const STOCKS = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "TSLA",
  "BINANCE:BTCUSDT",
  "BINANCE:BNBUSDT",
  "BINANCE:DOTUSDT",
  "BINANCE:LTCUSDT",
  "BINANCE:LINKUSDT",
  "HITBTC:BTCUSD",
];

// Función para manejar la conexión WebSocket y suscripciones
function setupWebSocket(apiKey, stocks) {
  socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

  socket.onopen = () => {
    console.log("WebSocket connected WORKER");
    stocks.forEach((stock) => {
      socket.send(JSON.stringify({ type: "subscribe", symbol: stock }));
    });
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("WebSocket message:", data);

    // Guardar los datos en IndexedDB
    saveToIndexedDB(data);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

// Función para guardar datos en IndexedDB
function saveToIndexedDB(data) {
  // Abrir o crear la base de datos "websocketDB" con versión 1
  const request = indexedDB.open("websocketDB", 1);

  // Manejar el evento de éxito al abrir la base de datos
  request.onsuccess = (event) => {
    const db = event.target.result;

    // Crear una transacción de escritura en el almacén de objetos "dataStore"
    const transaction = db.transaction(["dataStore"], "readwrite");

    // Obtener el almacén de objetos "dataStore"
    const store = transaction.objectStore("dataStore");

    // Agregar el objeto de datos al almacén de objetos
    store.add(data);

    console.log("Datos guardados en IndexedDB:", data);
  };

  // Manejar el evento de error al abrir la base de datos
  request.onerror = (event) => {
    console.error("Error al abrir la base de datos:", event.target.error);
  };

  // Crear el almacén de objetos "dataStore" si no existe
  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Crear un nuevo almacén de objetos "dataStore"
    db.createObjectStore("dataStore", { keyPath: "id", autoIncrement: true });

    console.log("Almacén de objetos 'dataStore' creado");
  };
}

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
  setupWebSocket(apiKey, STOCKS);
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activado");
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notificación clickada:", event.notification);
  event.notification.close();

  // Aqu se puede manipular el redireccionamiento al dar click en notificacion.
  event.waitUntil(clients.openWindow("/"));
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notificación cerrada:", event.notification);
});
