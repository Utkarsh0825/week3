/**
 * Unit Test for Authentication API
 * Testing POST /api/auth/signup endpoint
 * 
 * Course: CS 696A - Full-Stack Enterprise Application Development
 * Professor: Prof. Radiy Matveev
 */

const request = require('supertest');
const app = require('../../server');

describe('POST /api/auth/signup', () => {
  
  it('should create a new user with valid data', async () => {
    // Generate unique credentials to avoid conflicts with existing data
    const timestamp = Date.now();
    const userData = {
      name: 'Test User',
      username: `testuser${timestamp}`,
      email: `test${timestamp}@example.com`,
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/signup')
      .send(userData)
      .expect(201);

    // Verify response contains user data
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(userData.name);
    expect(response.body.username).toBe(userData.username);
    expect(response.body.email).toBe(userData.email);
    
    // Verify password is not in response
    expect(response.body).not.toHaveProperty('password');
    expect(response.body).not.toHaveProperty('passwordHash');
  });

  it('should return 400 when required fields are missing', async () => {
    const incompleteData = {
      name: 'Test User',
      email: `test2${Date.now()}@example.com`
      // missing username and password
    };

    const response = await request(app)
      .post('/api/auth/signup')
      .send(incompleteData)
      .expect(400);

    // Check that an error is returned without asserting exact error message
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
    expect(response.body.error.length).toBeGreaterThan(0);
  });

});