const axios = require("axios");
exports.handler = async (ev, ctx, cb) => {
  const res = await axios.post(
    "https://graphql.fauna.com/graphql",
    {
      query: `{
            allItems{
              data{
                _id
                name
                url
                description
              }
            }
          }`,
      variables: {},
    },
    { headers: { Authorization: `Bearer ${process.env.FAUNA_KEY}` } }
  );
  const data = await res.data;
  console.log(data);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
