const microCors = require('micro-cors');
const { linkPreview } = require('link-preview-node');
const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

const cors = microCors();

module.exports = cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end();
    return;
  }

  const data = await linkPreview(req.query.url);

  data.title = entities.decode(data.title);
  data.description = entities.decode(data.description);

  res.setHeader('cache-control', 'max-age=86400, public');
  res.json(data);
  res.end();
});
