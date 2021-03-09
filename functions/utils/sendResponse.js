module.exports = (code, response) => ({
  statusCode: code,
  body: JSON.stringify(response),
});
