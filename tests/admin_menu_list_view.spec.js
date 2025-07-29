const { test, describe, expect } = require('@playwright/test');
const { getAuthToken } = require('./authCommonHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/common';

describe('Admin Menu List View API', () => {
  test('List view menu via API', async ({ request }) => {
    // Get auth token using helper
    const token = await getAuthToken(request);

    // Make the listview_owner API call
    const response = await request.post(`${BASE_URL}/menu_list`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        outlet_id: "535",
        user_id: 1,
        app_source: "admin_app"
      }
    });

    // Log status code and response body for debugging
    const status = response.status();
    const responseBody = await response.json();

    // Attach status and response body to Playwright report
    await test.info().attach('List View Menu Status', {
      body: status.toString(),
      contentType: 'text/plain',
    });
    await test.info().attach('List View Menu Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });

    // Assert status code is 200 or 201
    expect([200, 201]).toContain(status);
  });
});
