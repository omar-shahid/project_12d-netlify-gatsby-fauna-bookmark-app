const queryDb = require("./utils/queryDb");
const sendResponse = require("./utils/sendResponse");

exports.handler = async (ev, ctx, cb) => {
  const body = JSON.parse(ev.body);
  if (!body) return sendResponse(401, { msg: "expected body" });
  const { id, ...rest } = body;
  console.log(body);

  const query = `

    mutation deleteItem($id: ID!, $data: ItemInput!){
        updateItem(id: $id, data: $data){
            _id
        }
      }
    `;
  const resId = await queryDb(query, { id, data: rest });
  return sendResponse(200, resId);
};
