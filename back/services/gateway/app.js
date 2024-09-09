const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = 3000; // Port pour l'API Gateway

app.use('/clients', createProxyMiddleware({ target: 'http://client-service:3001', changeOrigin: true }));

// Proxy vers Order Service
app.use('/orders', createProxyMiddleware({ target: 'http://order-service:3002', changeOrigin: true }));

// Proxy vers Kitchen Service
app.use('/kitchen', createProxyMiddleware({ target: 'http://kitchen-service:3003', changeOrigin: true }));

// Proxy vers Delivery Service
app.use('/delivery', createProxyMiddleware({ target: 'http://delivery-service:3004', changeOrigin: true }));


app.listen(PORT, () => {
    console.log(`Master API (Gateway) is running on port ${PORT}`);
});