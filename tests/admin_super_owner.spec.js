const { test, expect, describe } = require('@playwright/test');
const { getAuthToken } = require('./authHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/admin';

describe('Admin API', () => {
  const adminPayload = {
    user_id: 1,
    name: 'rajat',
    mobile: '8669103746',
    email: 'rajatkubde14@gmail.com',
    aadhar_number: '777776756565',
    app_source: 'admin_app',
    outlet_ids: [567],
  };

  test('Create admin super owner via API', async ({ request }) => {
    // Generate unique values for test run
    const unique = Date.now();
    // adminPayload is now defined above

    // Attach request body to Playwright report
    await test.info().attach('Create Admin Super Owner Request', {
      body: JSON.stringify(adminPayload, null, 2),
      contentType: 'application/json',
    });

    // Get auth token using helper
    const token = await getAuthToken(request);

    // Make the create_admin API call
    const response = await request.post(`${BASE_URL}/create_super_owner`, {
      data: adminPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Assert status code is 200 or 201, else log error
    if (![200, 201].includes(response.status())) {
      const errorBody = await response.text();
      await test.info().attach('Create Admin Super Owner Error', {
        body: errorBody,
        contentType: 'application/json',
      });
      throw new Error(`Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
    }

    // Attach response body to Playwright report
    const responseBody = await response.json();

    // Print response body to terminal
    console.log('Create Admin Super Owner Response:', JSON.stringify(responseBody, null, 2));

    // Attach response body to Playwright report
    await test.info().attach('Create Admin Super Owner Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });
});
