const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema ({
   title: {
       type: String,
       required: true, 
       maxLength: [20, "`{PATH} alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır"],  
       minLength: 2    
   },
    category: {
      type: String,
      required: [true, "`{PATH}` alanı zorunludur"]
    },
    country: String,
    year: {
      type: Number,
      max: 2018,   
      min: 1900
    },
    imdb_score: Number,
    director_id: Schema.Types.ObjectId,  
    createdAt: {
       type: Date,
        default: Date.now  
    }
});

module.exports = mongoose.model("movie", MovieSchema);

