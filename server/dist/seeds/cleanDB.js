import { Doctor } from '../models/index.js';
const cleanDB = async () => {
    try {
        Doctor.deleteMany({});
        console.log('Doctor collection cleaned.');
    }
    catch (err) {
        console.error('Error cleaning collections:', err);
        process.exit(1);
    }
};
export default cleanDB;
