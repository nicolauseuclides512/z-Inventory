/**
 * Convert string to slug https://gist.github.com/mathewbyrne/1280286
 * We don't handle UTF-8 characters
 * @return {string} Slugish string
 */
export default (string) => {
  return string.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}
