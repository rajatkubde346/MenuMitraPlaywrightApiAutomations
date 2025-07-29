const { test, expect, describe } = require('@playwright/test');
const { getAuthToken } = require('./authCommonHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/common';

const orderPayload = {
  user_id: "744",
  outlet_id: "567",
  order_type: "dine-in",
  action: "has_save",
  order_items: [
    { menu_id: "1957", quantity: 1, comment: "", price: 220, portion_name: "Full" },
    { menu_id: "1955", quantity: 1, comment: "", price: 350, portion_name: "Full" },
    { menu_id: "1956", quantity: 1, comment: "", price: 220, portion_name: "Full" }
  ],
  app_source: "pos_app",
  customer_name: "",
  customer_mobile: "",
  customer_address: "",
  customer_landmark: "",
  customer_alternate_mobile: "",
  special_discount: "0",
  charges: "0",
  tip: "0",
  order_payment_settle_type: null,
  is_saved: true,
  tables: ["1"],
  section_id: "1115",
  table_id: 4261
};

describe('POS Create Order API', () => {
  test('Create order via API', async ({ request }) => {
    // Attach request body to Playwright report
    await test.info().attach('Create Order Request', {
      body: JSON.stringify(orderPayload, null, 2),
      contentType: 'application/json',
    });

    // Get auth token using helper (if required for this endpoint)
    const TEST_MOBILE = '9876543210'; // Use a valid 10-digit number
    const token = await getAuthToken(request, { mobile: TEST_MOBILE });

    // Make the create_order API call
    const response = await request.post(`${BASE_URL}/create_order`, {
      data: orderPayload,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Assert status code is 200 or 201, else log error
    if (![200, 201].includes(response.status())) {
      const errorBody = await response.text();
      await test.info().attach('Create Order Error', {
        body: errorBody,
        contentType: 'application/json',
      });
      throw new Error(`Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
    }

    // Attach response body to Playwright report
    const responseBody = await response.json();

    // Print response body to terminal
    console.log('Create Order Response:', JSON.stringify(responseBody, null, 2));

    // Attach response body to Playwright report
    await test.info().attach('Create Order Response', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });
});
