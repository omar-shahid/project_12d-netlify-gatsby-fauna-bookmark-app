const queryDb = require("./utils/queryDb");
const sendResponse = require("./utils/sendResponse");

exports.handler = async (ev, ctx, cb) => {
  const body = JSON.parse(ev.body);
  if (!body) return sendResponse(401, { message: "body expected" });
  const query = `
    mutation createBookmark($name: String!, $url: String!, $description: String) {
        createItem(data: {name: $name, url: $url, description: $description}){
          _id
        }
      }
    `;
  // const variables = {name: }
  const id = await queryDb(query, body);
  console.log("body", body);
  return sendResponse(200, { id });
};
