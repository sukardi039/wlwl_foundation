/**
 * API Configuration Module
 * Provides centralized backend URL configuration from environment variables
 */

const API_CONFIG = {
  // Backend base URL (from .env VUE_APP_BACKEND_URL)
  BACKEND_URL: process.env.VUE_APP_BACKEND_URL || 'http://127.0.0.1/wlwl',
  
  // Image upload URL (from .env VUE_APP_IMAGE_UPLOAD_URL)
  IMAGE_UPLOAD_URL: process.env.VUE_APP_IMAGE_UPLOAD_URL || 'http://127.0.0.1/wlwl',

  /**
   * Get full endpoint URL
   * @param {string} endpoint - The endpoint path (e.g., 'staffsignin/', 'action/')
   * @returns {string} Full URL for the endpoint
   */
  getEndpoint(endpoint) {
    const url = this.BACKEND_URL;
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${url}${path}`;
  },

  /**
   * Get image upload endpoint
   * @param {string} path - The upload path (e.g., 'images/upload.php')
   * @returns {string} Full URL for image upload
   */
  getImageUploadendpoint(path) {
    const url = this.IMAGE_UPLOAD_URL;
    const urlPath = path.startsWith('/') ? path : `/${path}`;
    return `${url}${urlPath}`;
  }
};

export default API_CONFIG;
