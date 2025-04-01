const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/westland-properties-database');
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Connection error', err);
  }
}
connectDB();

const userSchema = {
  firstName: String,
  surname: String,
  userName: String,
  _id: String,
  email: String,
  contact: String,
  level: Number,
  accountType: String,
  password: String
};

const User = mongoose.model('Users', userSchema);

app.post('/api/login', async (req, res) => {
  const { _id, password } = req.body;
  try {
    const user = await User.findOne({ _id, password });
    if (user) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

app.post('/users', async (req, res) => {
  console.log('inside post function');

  const data = new User({
    firstName: req.body.firstName,
    surname: req.body.surname,
    userName: req.body.userName,
    _id: req.body._id,
    email: req.body.email,
    contact: req.body.contact,
    level: req.body.level,
    accountType: req.body.accountType,
    password: req.body.password
  });

  data.save()
    .then(user => console.log('account created :', user))
    .catch(err => console.error('Error creating account: ', err));

  res.send('done');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});


//schema for accommodation
const accommodationSchema ={
    listingName:String,
    address: String,
    desciption: String,
    distance: Number,
    price: Number,
    availableRooms: Number,
    contact: String,
    servicesProvided: String,
     
}

const monmodel1 = mongoose.model('Accommodation', accommodationSchema); 

//posting accommodation
app.post('/accommodation', async(req,res)=>{
    console.log('inside post function');

    const data = new monmodel1({    
        address: req.body.address,
        listingName: req.body.listingName,
        desciption: req.body.desciption,
        distance: req.body.distance,
        price: req.body.price,
        availableRooms: req.body.availableRooms,
        contact: req.body.contact,
        servicesProvided: req.body.servicesProvided        
    });

    data.save()
    .then(accommodation => console.log('accommodation added :',accommodation))
    .catch(err => console.error('Error adding accommodation: ', err))

    res.send('done')
})

//accommodation get request
app.get('/accommodation', async (req , res)=> {
    try{
        const accommodation = await monmodel1.find()
        console.log(accommodation)

        res.json(accommodation);
    } catch (error){
        console.error(error);
        res.status(500).json({error:'Failed to fetch data'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
