const mongoose = require("mongoose");    
const express = require('express');
const router = express.Router();


const Director = require("../models/Director");

router.post('/', (req, res) => {  
    const director = new Director(req.body); 
    const promise = director.save();

    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });

});

router.get("/", (req,res) => {   
  const promise = Director.aggregate([   
      {
        $lookup: {
          from: "movies",
          localField: "_id", 
          foreignField: "director_id",
          as: "donendata"  

        }
      },
      {
          $unwind: {
              path: "$donendata",
              preserveNullAndEmptyArrays: true 
          }
      },
      {
          $group: {  
              _id: {
                  _id: "$_id",
                  name: "$name",
                  surname: "$surname",
                  bio: "$bio"
              },
              donendata: {
                  $push: "$donendata"
              }
          }
      },
      {
          $project: {  
              _id: "$_id.id",
              name: "$_id.name",
              surname: "$_id.surname",
              donendata: "$donendata"
          }
      }
  ]);

  promise.then((data) => {
      res.json(data);
  }).catch((err) => {
     res.json(err);
  });

});


router.get("/sadecedirector/:director_id", (req,res) => {   
   const promise = Director.findById(req.params.director_id);

   promise.then((director) => {
       res.json(director);
   }).catch((err) => {
       res.json(err);
   });
});



router.get("/:director_id", (req,res) => {   
    const promise = Director.aggregate([
        {
            $match: {
                "_id" : mongoose.Types.ObjectId(req.params.director_id)   //1. satır bak
            }
        },
        {
            $lookup: {
                from: "movies",
                localField: "_id",
                foreignField: "director_id",
                as: "donendata"

            }
        },
        {
            $unwind: {
                path: "$donendata",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: "$_id",
                    name: "$name",
                    surname: "$surname",
                    bio: "$bio"
                },
                donendata: {
                    $push: "$donendata"
                }
            }
        },
        {
            $project: {
                _id: "$_id.id",
                name: "$_id.name",
                surname: "$_id.surname",
                donendata: "$donendata"
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


router.put("/:director_id", (req, res) => {    
    const promise = Director.findByIdAndUpdate(req.params.director_id, req.body);  

    promise.then((director) => {
        if (!director)
            res.json("The Director was not found");
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});

router.delete("/:director_id", (req, res) => {    
    const promise = Director.findByIdAndRemove(req.params.director_id);  
    promise.then((director) => {
        if (!director)
            res.json("The Director was not found");
        res.json(director);
    }).catch((err) => {
        res.json(err);
    });
});


module.exports = router;


