const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let godSchema = new Schema(
  {
    id: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { collection: "gods" }
);

module.exports = mongoose.model("God", godSchema);
