const mongoose = require("mongoose");

const contributionOfSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: { type: String },
        // TO AVOID COMPLICATIONS
        // category: { type: String },
        // relatedUser: {type: String},
        startDate: { type: Date },
        endDate: { type: Date },
        createdAt: { type: Date, default: Date.now },
    },
    {
        collection: 'contributionsOf'
    }
)

const contributionOf = mongoose.model('contributionsOf', contributionOfSchema)


module.exports = contributionOf;