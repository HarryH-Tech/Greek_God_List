let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// God Model
let godSchema = require("../models/God");

//Create God
router.route("/add_god").post((req, res, next) => {
  godSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//Read Gods
router.route("/").get((req, res, next) => {
  godSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single God
// router.route("/edit-student/:id").get((req, res, next) => {
//   godSchema.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// Update God Details
router.route("/update_god/:id").put((req, res, next) => {
  console.log(req.params.id);
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
});

//Delete many gods
router.route("/delete_gods/:id").delete((req, res, next) => {
  // convert string passed into
  // function into an array of strings
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
});

// Delete Specific God
router.route("/delete_god/:id").delete((req, res, next) => {
  godSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
