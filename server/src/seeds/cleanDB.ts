import { Patient } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await Patient.deleteMany({});
    console.log('Patient collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
