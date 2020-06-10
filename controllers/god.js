const godSchema = require("../models/God");
const mongoose = require("mongoose");

//View All Gods
exports.getAllGods = (req, res, next) => {
  godSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

//Create God
exports.createGod = (req, res, next) => {
  godSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

//Update God Details
exports.updateGod = (req, res, next) => {
  godSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log("God updated successfully !");
      }
    }
  );
};

//Delete many gods
exports.deleteManyGods = (req, res, next) => {
  // convert string passed into function into an array of strings
  // eg - "el,el,el" into ["el", "el", "el"]
  const idList = req.params.id.split(",");
  godSchema.deleteMany(
    { _id: { $in: idList.map(mongoose.Types.ObjectId) } },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data,
        });
      }
    }
  );
};

// // Delete Specific God
exports.deleteGod = (req, res, next) => {
  console.log("GOD ID =", req.params.id);
  godSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
};
