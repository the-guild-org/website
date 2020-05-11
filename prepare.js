const links = require('./canonical.json');

Object.keys(links).forEach((mediumLink) => {
  const blogLink = `https://the-guild.dev/blog/${links[mediumLink]}`;
  const mediumId = mediumLink.match(/[a-z0-9]+$/)[0];
  const settingsLink = `https://medium.com/p/${mediumId}/settings`;
  console.log(`
    -- 
    
    Open:   ${settingsLink}
    Use:    ${blogLink}
    
  `);
});
