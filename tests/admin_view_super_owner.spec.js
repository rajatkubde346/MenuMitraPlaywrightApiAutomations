const { test, describe, expect } = require('@playwright/test');
const { getAuthToken } = require('./authHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/admin';

describe('Admin Super Owner API', () => {
  test('View admin super owner via API', async ({ request }) => {
    // Get auth token using helper
    const token = await getAuthToken(request);

    // Make the listview_partner API call
    const response = await request.post(`${BASE_URL}/view_super_owner`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        user_id: 1,
        super_owner_id: 178,
        app_source: 'admin_app',
      },
    });

    // Log status code and response body for debugging
    const status = response.status();
    const contentType = response.headers()['content-type'];
    let responseBody;
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
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

    // Attach response body to Playwright report (always as string)
    await test.info().attach('View Admin Super Owner Response', {
      body: typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });
});
