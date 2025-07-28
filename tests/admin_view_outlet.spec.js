

const { test, describe, expect } = require('@playwright/test');
const { getAuthToken } = require('./authCommonHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/common'; // Remove trailing space

describe('Outlet API', () => {
  test('View outlet via API', async ({ request }) => {
    // Get auth token using helper, specify admin app_type
    const token = await getAuthToken(request, { app_type: 'admin' });

    // Make the listview_partner API call
    const response = await request.post(`${BASE_URL}/view_outlet`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        outlet_id: '567',
        user_id: 1,
        app_source: 'admin_app',
      },
    });

    // Log status code and response body for debugging
    const status = response.status();
    const contentType = response.headers()['content-type'];
    let responseBody;
    let isJson = false;
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
      isJson = true;
    } else {
      responseBody = await response.text();
    }
    console.log('Status:', status);
    console.log('Response:', JSON.stringify(responseBody, null, 2));

    // Assert status code is 200 or 201, else log the response for debugging
    if (status === 404) {
      throw new Error(`Endpoint not found (404). Check if the URL is correct and the server is running. Response: ${JSON.stringify(responseBody)}`);
    }
    if (![200, 201].includes(status)) {
      throw new Error(`Unexpected status code: ${status}. Response: ${JSON.stringify(responseBody)}`);
    }
    expect([200, 201]).toContain(status);

    // Attach response body to Playwright report (as string or JSON)
    await test.info().attach('View Outlet Response', {
      body: isJson ? JSON.stringify(responseBody, null, 2) : String(responseBody),
      contentType: isJson ? 'application/json' : 'text/plain',
    });
  });
});

