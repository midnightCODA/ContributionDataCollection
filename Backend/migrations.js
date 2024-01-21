// migration.js
require('dotenv').config({ path: './.env' }); // Adjust the path accordingly
const { default: mongoose } = require('mongoose');
const UserData = require('./models/users.model'); // Update the path

async function runMigration() {
    try {
        // Connect to the database

        console.log(process.env.MONGODB_URI); // Add this line
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Add newField to existing records with a default value
        const updateResult = await UserData.updateMany({}, {
            $set: {
                gender: '', // Default value for gender
                rank: '',   // Default value for rank
                phone: ''   // Default value for phone
            }
        });


        // Disconnect from the database
        await mongoose.disconnect();

        console.log('Migration successful');
        console.log('Number of documents updated:', updateResult.nModified);
    } catch (error) {
        console.error('Migration failed', error);
    }
}

// Run the migration
runMigration();
