import db from '../config/connection.js';
import {Doctor} from '../models/index.js';
import doctorSeeds from './doctorData.json' with { type: "json" };
import cleanDB from './cleanDB.js';

// This script seeds the database with initial data for testing purposes.
// It connects to the database, clears existing data, and inserts new data from JSON files.
const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDB();

    await Doctor.insertMany(doctorSeeds);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error seeding database:', error.message);
    } else {
      console.error('Unknown error seeding database');
    }
    process.exit(1);
  }
};

seedDatabase();
