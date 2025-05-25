const express = require("express");
const client = require("prom-client"); // Prometheus client library
const app = express();

// Create a Registry to register metrics
const register = new client.Registry();

// Default metrics (e.g., CPU, memory usage)
client.collectDefaultMetrics({ register });

// Custom metric: HTTP request counter
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});
register.registerMetric(httpRequestCounter);

// Middleware to count HTTP requests
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Expose metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Health check route
app.get("/health", (req, res) => res.json({ status: "UP" }));

// Home route
app.get("/", (req, res) => {
  res.send("Hello, SI DevOps!");
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on ${port}`));
}

module.exports = app;
