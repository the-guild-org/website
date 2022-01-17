const microCors = require('micro-cors');
const { linkPreview } = require('link-preview-node');
const { decode } = require('html-entities');

const cors = microCors();

module.exports = cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end();
    return;
  }

  const data = await linkPreview(req.query.url);

  data.title = decode(data.title);
  data.description = decode(data.description);

  res.setHeader('cache-control', 'max-age=86400, public');
  res.json(data);
  res.end();
});
