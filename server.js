const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const subdomain = require('express-subdomain');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

require('dotenv').config({ path: '.env.local' });

const mongodbUri = process.env.MONGODB_URI;

if (!mongodbUri) {
  throw new Error('MONGODB_URI environment variable is not defined');
}

mongoose.connect(mongodbUri, {
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
    console.log(`ICO request URL: ${req.url}`);
    req.url = '/ico' + req.url;
    return handle(req, res);
  });

  // Desktop subdomain router
  const desktopRouter = express.Router();
  desktopRouter.get('*', (req, res) => {
    console.log(`Desktop request URL: ${req.url}`);
    req.url = '/desktop' + req.url;
    return handle(req, res);
  });

  // Middleware for the subdomain routers
  server.use(subdomain('ico', icoRouter));
  server.use(subdomain('desktop', desktopRouter));

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
