const generateAuthString = (username, password) =>
  `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;

module.exports = {
  generateAuthString
};
