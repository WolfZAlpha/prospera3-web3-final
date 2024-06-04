const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const subdomain = require('express-subdomain');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  // ICO subdomain router
  const icoRouter = express.Router();
  icoRouter.get('*', (req, res) => {
    req.url = '/ico' + req.url; // according to the docs the secures the path starts with /ico
    app.render(req, res, '/ico', req.query);
  });

  // Desktop subdomain router
  const desktopRouter = express.Router();
  desktopRouter.get('*', (req, res) => {
    req.url = '/desktop' + req.url; // according to the docs this secures teh path starts with /desktop
    app.render(req, res, '/desktop', req.query);
  });

  // middleware for the subdomain routers
  server.use(subdomain('ico', icoRouter));
  server.use(subdomain('desktop', desktopRouter));

  // routes for parent application
  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.get('/login', (req, res) => {
    return app.render(req, res, '/login', req.query);
  });

  server.get('/selection', (req, res) => {
    return app.render(req, res, '/selection', req.query);
  });

  // Removed the catch all so there would be no feed-back loops

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
