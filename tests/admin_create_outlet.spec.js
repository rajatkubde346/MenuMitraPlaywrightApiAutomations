const { test, expect, describe } = require('@playwright/test');
const { getAuthToken } = require('./authCommonHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/common';

describe('Outlet API', () => {
  const outletPayload = {
    owner_ids: [857],
    user_id: '1',
    name: 'Test Admin name',
    mobile: '6756756755',
    address: 'Mumbai',
    outlet_type: 'hotel',
    outlet_mode: 'online',
    veg_nonveg: 'veg',
    upi_id: 'outlet@upi',
    subscription_id: '218',
    subscription_end_date: '28 Jul 2026',
  };

  test('Create outlet via API', async ({ request }) => {
    // Generate unique values for test run
    const unique = Date.now();
    // outletPayload is now defined above

    // Attach request body to Playwright report
    await test.info().attach('Create Outlet Request', {
      body: JSON.stringify(outletPayload, null, 2),
      contentType: 'application/json',
    });

    // Get auth token using helper
    const token = await getAuthToken(request);

    // Make the create_outlet API call
    const response = await request.post(`${BASE_URL}/create_outlet`, {
      data: outletPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Assert status code is 200 or 201, else log error
    if (![200, 201].includes(response.status())) {
      const errorBody = await response.text();
      await test.info().attach('Create Outlet Error', {
        body: errorBody,
        contentType: 'application/json',
      });
      throw new Error(`Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
    }

    // Attach response body to Playwright report
    const responseBody = await response.json();

    // Print response body to terminal
    console.log('Create Outlet Response:', JSON.stringify(responseBody, null, 2));

    // Attach response body to Playwright report
    await test.info().attach('Create Outlet Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });
});
