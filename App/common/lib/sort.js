export default {
  /**
   * Sort Date Strings
   * @param {string} a
   * @param {string} b
   * @param {?boolean} desc
   */
  date: (a, b, desc = false) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return desc ? dateB - dateA : dateA - dateB;
  },
  /**
   * Sort Numbers
   * @param {string} a
   * @param {string} b
   * @param {?boolean} desc
   */
  number: (a, b, desc = false) => (
    desc ? b - a : a - b
  ),
  /**
   * Sort Strings
   * @param {string} a
   * @param {string} b
   * @param {?boolean} desc
   */
  string: (a, b, desc = false) => {
    const stringA = (a || '').toLowerCase();
    const stringB = (b || '').toLowerCase();
    if (desc ? stringB < stringA : stringA < stringB) {
      return -1;
    }
    if (desc ? stringA < stringB : stringB < stringA) {
      return 1;
    }
    return 0;
  },
};
