// import request from 'supertest';
// import { app } from '../../index.js';
// import mongoose from 'mongoose';
// import { User } from '../../src/models/userModel.js';
// import bcrypt from 'bcryptjs';

// describe('Auth API', () => {
//   beforeAll(async () => {
//     await mongoose.disconnect(); // Disconnect any existing connections
//     await mongoose.connect(process.env.DATABASE_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   });

//   beforeEach(async () => {
//     await User.deleteMany({});
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//   });

//   describe('POST /auth/login', () => {
//     it('should log in an existing user', async () => {
//       // Create a user with a hashed password
//       const plainPassword = 'Password123';
//       const hashedPassword = await bcrypt.hash(plainPassword, 10);
//       console.log('Hashed Password:', hashedPassword); // Log the hashed password
      
//       await User.create({
//         name: 'Login Test User',
//         email: 'logintest@example.com',
//         password: hashedPassword,
//       });

//       const user = await User.findOne({ email: 'logintest@example.com' });
//       console.log('User in DB:', user); // Log the stored user data

//       const res = await request(app)
//         .post('/auth/login')
//         .send({
//           email: 'logintest@example.com',
//           password: plainPassword, // Use the plain text password for the login request
//         });

//       console.log('Response status:', res.statusCode); // Log the status code
//       console.log('Response body:', res.body); // Log the response body

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty('token');
//       expect(res.body).toHaveProperty('userId');
//       expect(res.body).toHaveProperty('name', 'Login Test User');
//     });
//   });
// });
