const { test, expect, describe } = require('@playwright/test');
const { getAuthToken } = require('./authHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/admin';

describe('Admin API', () => {
  const adminPayload = {
    name: 'Test Admin name',
    mobile: '7878777777',
    email: 'test@gmail.com',
    password: '1234',
    role: 'admin',
  };

  test('Create admin via API', async ({ request }) => {
    // Generate unique values for test run
    const unique = Date.now();
    // adminPayload is now defined above

    // Attach request body to Playwright report
    await test.info().attach('Create Admin Request', {
      body: JSON.stringify(adminPayload, null, 2),
      contentType: 'application/json',
    });

    // Get auth token using helper
    const token = await getAuthToken(request);

    // Make the create_admin API call
    const response = await request.post(`${BASE_URL}/create_admin`, {
      data: adminPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Assert status code is 200 or 201, else log error
    if (![200, 201].includes(response.status())) {
      const errorBody = await response.text();
      await test.info().attach('Create Admin Error', {
        body: errorBody,
        contentType: 'application/json',
      });
      throw new Error(`Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
    }

    // Attach response body to Playwright report
    const responseBody = await response.json();

    // Print response body to terminal
    console.log('Create Admin Response:', JSON.stringify(responseBody, null, 2));

    // Attach response body to Playwright report
    await test.info().attach('Create Admin Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });

  test('Create admin with minimal required fields', async ({ request }) => {
    // adminPayload is now defined above

    // Attach request body to Playwright report
    await test.info().attach('Create Admin Request (Minimal Fields)', {
      body: JSON.stringify(adminPayload, null, 2),
      contentType: 'application/json',
    });

    // Get auth token using helper
    const token = await getAuthToken(request);

    // Make the create_admin API call
    const response = await request.post(`${BASE_URL}/create_admin`, {
      data: adminPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Assert status code is 200 or 201, else log error
    if (![200, 201].includes(response.status())) {
      const errorBody = await response.text();
      await test.info().attach('Create Admin Error (Minimal Fields)', {
        body: errorBody,
        contentType: 'application/json',
      });
      throw new Error(`Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
    }

    // Attach response body to Playwright report
    const responseBody = await response.json();
    console.log('Create Admin Response (Minimal Fields):', JSON.stringify(responseBody, null, 2));
    await test.info().attach('Create Admin Response (Minimal Fields)', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });
});
