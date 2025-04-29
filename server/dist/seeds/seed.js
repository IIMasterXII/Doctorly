import db from '../config/connection.js';
import { Doctor, } from '../models/index.js';
import doctorSeeds from './doctorData.json' assert { type: "json" };
import cleanDB from './cleanDB.js';
const seedDatabase = async () => {
    try {
        await db();
        await cleanDB();
        await Doctor.insertMany(doctorSeeds);
        console.log('Seeding completed successfully!');
        process.exit(0);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error seeding database:', error.message);
        }
        else {
            console.error('Unknown error seeding database');
        }
        process.exit(1);
    }
};
seedDatabase();
