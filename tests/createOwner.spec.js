const { test, describe, expect } = require('@playwright/test');
const { getAuthToken } = require('./authCommonHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/common';

describe('Owner API', () => {
  test('Create owner via API', async ({ request }) => {
    // Generate unique values for test run
    const unique = Date.now();
    const mobile = `7987${unique.toString().slice(-6)}`; // generate once

    const partnerPayload = {
      user_id: 512,
      name: "Rahil",
      mobile, // use the same mobile
      email: `test${unique}@gmail.com`,
      address: "",
      aadhar_number: `${unique}${Math.floor(Math.random() * 1000)}`.slice(0,12),
      dob: "07 Jun 2025",
      outlet_ids: [535],
      account_type: "live",
      is_active: 1,
      app_source: "admin"
    };

    // Attach request body to Playwright report
    await test.info().attach('Create Owner Request', {
      body: JSON.stringify(partnerPayload, null, 2),
      contentType: 'application/json',
    });

    // Get auth token using a static admin mobile (must exist in DB)
    const adminToken = await getAuthToken(request, { mobile: '8787987898' }); // <-- use a real, existing admin mobile

    // Make the create_owner API call with admin token
    const response = await request.post(`${BASE_URL}/create_owner`, {
      data: partnerPayload,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Attach response body to Playwright report
    const responseBody = await response.json();

    // Print response body to terminal
    console.log('Create Owner Response:', JSON.stringify(responseBody, null, 2));

    // Assert status code is 200 or 201, else log error
    try {
      expect([200, 201]).toContain(response.status());
    } catch (error) {
      console.error('Unexpected status:', response.status(), responseBody);
      throw error;
    }

    // Attach response body to Playwright report
    await test.info().attach('Create Owner Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });
});
