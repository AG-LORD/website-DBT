// src/utils/createPageUrl.js

/**
 * Utility to create URL paths for pages
 * @param {string} page - Page name
 * @returns {string} URL path starting with '/'
 */
export function createPageUrl(page) {
  // Convert page name to lowercase and prefix with slash
  return `/${page.toLowerCase()}`;
}
