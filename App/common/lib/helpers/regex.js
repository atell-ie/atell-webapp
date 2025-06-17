export default {
  /**
   * Get RegEx invalid characters array
   */
  getInvalidCharacters: (regex: RegExp, text: string) => {
    const next = [];
    for (let i = 0; i < text.length; i++) {
      !regex.test(text[i]) && next.push(text[i]);
    }
    return next;
  },
  /**
   * Parse RegEx String
   * @description Parse quoted regex string "/regex/" -> /regex/
   */
  parseString: (regex: string) => {
    if (regex) {
      const parts = /\/(.*)\/(.*)/.exec(regex);
      if (parts && parts.length > 0) {
        return new RegExp(parts[1], parts[2] || '');
      }
    } 
    return null;
  },
};
