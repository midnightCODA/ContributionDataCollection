const express = require('express')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express()
const port = 3300
const cors = require('cors');
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = require('./models/users.model');
const Contribution = require('./models/contributions.model');
const contributionOf = require('./models/contributionOf.model');
app.use(cors());
app.use(express.json());


// CONNECTION TO THE DB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application on a MongoDB connection error
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});




app.get('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World!')
})

// APPLICATION DASHBOARD 
app.get('/analytics', async (req, res) => {
    try {
        // Assuming you have models named "User" and "Contribution"
        const userCount = await User.countDocuments();
        const contributionCount = await Contribution.countDocuments();
        const totalContributionAmount = await Contribution.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]);

        if (userCount !== null && contributionCount !== null && totalContributionAmount.length > 0) {
            const { totalAmount } = totalContributionAmount[0];
            res.status(200).json({ userCount, contributionCount, totalAmount });
        } else {
            res.status(404).json({ message: 'No users, contributions, or contribution amounts found' });
        }
    } catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





//USERS CRUD

//get all users
app.get('/allusers', async (req, res) => {
    try {
        // Assuming you have a model named "User" that represents your users
        const allUsers = await User.find(); // Use the appropriate method to fetch all users

        if (allUsers) {
            res.status(200).json(allUsers); // Return the users as JSON response
        } else {
            res.status(404).json({ message: 'No users found' });
        }
    } catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all users but return only full names and their user ids
app.get('/getcontributors', async (req, res) => {
  try {
    const contributors = await User.find({}, '_id full_name'); // Specify the fields to retrieve

    if (contributors.length > 0) {
      res.status(200).json(contributors);
    } else {
      res.status(404).json({ message: 'No contributors found' });
    }
  } catch (error) {
    console.error('An error occurred', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




// create users
app.post('/register', async (req, res) => {
    console.log(req.body);
  
    try {
      const existingUser = await User.findOne({ email: req.body.email });
  
      if (existingUser) {
        return res.status(409).json({ status: 'error', message: 'Email is already in use' });
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
      const user = await User.create({
        full_name: req.body.full_name,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
        gender: req.body.gender,
        rank: req.body.rank,
        phone: req.body.phone
      });
  
      if (user) {
        console.log(`Successfully created a user: ${user}`);
        return res.json({ status: 'ok', message: 'User registered successfully' });
      } else {
        console.log('User was not created successfully');
        return res.status(500).json({ status: 'error', message: 'Failed to create a user' });
      }
    } catch (error) {
      console.error('An error occurred', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
  


// CONTRIBUTIONS

//get all contributions
app.get('/allcontributions', async (req, res) => {
    try {
        // Assuming you have a model named "User" that represents your users
        const allContributions = await Contribution.find().populate('contributionOf'); // Use the appropriate method to fetch all users

        if (allContributions) {
            res.status(200).json(allContributions); // Return the users as JSON response
        } else {
            res.status(404).json({ message: 'No contributions found' });
        }
    } catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// ...

// CONTRIBUTIONS

// Create a contribution
app.post('/createcontribution', async (req, res) => {
  console.log(req.body);

  try {
      // Fetch contributor details
      const contributorDetails = await User.findById(req.body.user_id);

      if (!contributorDetails) {
          return res.status(404).json({ message: 'Contributor not found' });
      }

      // Create contribution
      const contribution = await Contribution.create({
          full_name: contributorDetails.full_name,
          gender: contributorDetails.gender,
          title: contributorDetails.title,
          contact: contributorDetails.contact,
          amount: req.body.amount,
          contributionOf: req.body.contributionType
      });

      if (contribution) {
          console.log('Successfully created a contribution', contribution);
          res.status(201).json({ message: 'Contribution created successfully', contribution });
      } else {
          console.log('Contribution creation failed');
          res.status(400).json({ message: 'Contribution creation failed' });
      }
  } catch (error) {
      console.error('An error occurred', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


// ...


// ...

// CONTRIBUTIONS TYPES

app.post('/contributionTypes', async (req,res) => {

    console.log(req.body);

    try {
        const contributionType = await contributionOf.create({
            name: req.body.name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        });

        if (contributionType) {
            console.log('Successfully created a contributionOf', contributionType);
            res.status(201).json({ message: `Contribution of ${contributionType} created successfully` });
        } else {
            console.log('Contribution type creation failed');
            res.status(400).json({ message: 'Contribution type creation failed' });
        }
    } catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})


app.get('/contributionTypes', async (req, res) => {
    try {
        // Assuming you have a model named "User" that represents your users
        const contributionTypes = await contributionOf.find(); // Use the appropriate method to fetch all users

        if (contributionTypes) {
            res.status(200).json(contributionTypes); // Return the users as JSON response
        } else {
            res.status(404).json({ message: 'No contributions found' });
        }
    } catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})




//AUTHORISATION

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Check if the provided password matches the stored hashed password
       const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Password is correct
        const userData = user.toObject();

        const token = jwt.sign(
          {
            email: userData.email,
            full_name: userData.full_name
          },
          'secret123'
        );

        return res.json({ status: 'ok', user: token, userdata: userData });
      } else {
        return res.status(401).json({ status: 'error', message: 'Invalid password' });
      }
    } else {
      return res.status(401).json({ status: 'error', message: 'User not found' });
    }
  } catch (error) {
    console.error('An error occurred', error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});


app.post('/changepassword', async (req, res) => {
    console.log(req.body);
  
    const { email, oldPassword, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user) {
        // Compare the provided old password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  
        if (isPasswordValid) {
          // Hash the new password before updating it
          const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
          // Update the user's password with the new hashed password
          await User.updateOne(
            { email: email },
            { password: hashedPassword }
          );
  
          return res.json({ status: 'ok', message: 'Password changed successfully' });
        } else {
          return res.status(401).json({ status: 'error', message: 'Invalid password' });
        }
      } else {
        return res.status(401).json({ status: 'error', message: 'User not found' });
      }
    } catch (error) {
      console.error('An error occurred', error);
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  });
  



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})