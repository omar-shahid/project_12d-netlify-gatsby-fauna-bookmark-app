const axios = require("axios");
module.exports = (query, variables) => {
  return axios
    .post(
      "https://graphql.fauna.com/graphql",
      {
        query,
        variables,
      },
      { headers: { Authorization: `Bearer ${process.env.FAUNA_KEY}` } }
    )
    .then((res) => res.data);
};
