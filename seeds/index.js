const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp-maptiler';
mongoose.connect(dbUrl);

const sample = array => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6ad3100e17a4ef05b94f0adb',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/eqpckjhd/image/upload/v1791725786/YelpCamp/grgewkklronuqram136q.jpg',
                    filename: 'YelpCamp/grgewkklronuqram136q',

                },
                {
                    url: 'https://res.cloudinary.com/eqpckjhd/image/upload/v1791725786/YelpCamp/jikcwjp5xjqw0fd4c629.jpg',
                    filename: 'YelpCamp/jikcwjp5xjqw0fd4c629',

                }
            ]
        });
        await camp.save();
    }
    // const c = new Campground({ title: 'purple field' });
    // await c.save();
}
seedDB();