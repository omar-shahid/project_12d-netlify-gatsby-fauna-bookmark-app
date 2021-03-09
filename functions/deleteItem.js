const queryDb = require("./utils/queryDb");
const sendResponse = require("./utils/sendResponse");

exports.handler = async (ev, ctx, cb) => {
  const variables = JSON.parse(ev.body);
  if (!variables) return sendResponse(401, { msg: "Id expected" });
  const query = `
    mutation deleteBookmark($id: ID!){
        deleteItem(id: $id){
          _id
        }
      }
    `;
  const data = await queryDb(query, variables);
  return sendResponse(200, data);
};
