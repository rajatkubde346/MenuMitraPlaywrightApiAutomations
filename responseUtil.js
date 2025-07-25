const { request } = require('@playwright/test');
const Ajv = require('ajv');
const ajv = new Ajv();

class ResponseUtil {
  /**
   * Makes an HTTP request and returns the response.
   * @param {APIRequestContext} apiContext - Playwright APIRequestContext.
   * @param {string} url - The endpoint URL.
   * @param {object} requestBody - The request body.
   * @param {string} method - HTTP method ('GET', 'POST', etc.).
   * @returns {APIResponse}
   */
  static async getResponse(apiContext, url, requestBody, method) {
    console.log(`Making ${method.toUpperCase()} request to: ${url}`);
    if (requestBody) console.log('Request body:', requestBody);

    let response;
    switch (method.toLowerCase()) {
      case 'post':
        response = await apiContext.post(url, { data: requestBody });
        break;
      case 'put':
        response = await apiContext.put(url, { data: requestBody });
        break;
      case 'get':
        response = await apiContext.get(url);
        break;
      case 'delete':
        response = await apiContext.delete(url, { data: requestBody });
        break;
      case 'patch':
        response = await apiContext.patch(url, { data: requestBody });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    console.log(`Status code: ${response.status()}`);
    console.log('Response body:', await response.text());
    return response;
  }

  /**
   * Makes an HTTP request with Authorization header and returns the response.
   * @param {APIRequestContext} apiContext - Playwright APIRequestContext.
   * @param {string} url - The endpoint URL.
   * @param {object} requestBody - The request body.
   * @param {string} method - HTTP method.
   * @param {string} jwtToken - Bearer token.
   * @returns {APIResponse}
   */
  static async getResponseWithAuth(apiContext, url, requestBody, method, jwtToken) {
    console.log(`Making ${method.toUpperCase()} request to: ${url}`);
    const headers = { Authorization: `Bearer ${jwtToken}` };

    let response;
    switch (method.toLowerCase()) {
      case 'post':
        response = await apiContext.post(url, { data: requestBody, headers });
        break;
      case 'put':
        response = await apiContext.put(url, { data: requestBody, headers });
        break;
      case 'get':
        response = await apiContext.get(url, { headers });
        break;
      case 'delete':
        response = await apiContext.delete(url, { data: requestBody, headers });
        break;
      case 'patch':
        response = await apiContext.patch(url, { data: requestBody, headers });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    console.log(`Status code: ${response.status()}`);
    console.log('Response body:', await response.text());
    return response;
  }

  /**
   * Validates the response body against a JSON schema.
   * @param {object} responseBody - The response body (parsed JSON).
   * @param {object} schema - The JSON schema object.
   */
  static validateResponseSchema(responseBody, schema) {
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
      throw new Error('Response schema validation failed');
    }
    console.log('Response schema validation successful');
  }
}

module.exports = ResponseUtil; 