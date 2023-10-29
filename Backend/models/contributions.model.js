const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema(
    {
        full_name: { type: String, required: true },
        gender: { type: String, required: true },
        title: { type: String },
        contact: { type: String },
        amount: { type: Number },
        contributionType: { type: String }
    },
    {
        collection: 'contributions' // You can specify the collection name here
    }
);

const Contribution = mongoose.model('Contribution', contributionSchema);

module.exports = Contribution;
