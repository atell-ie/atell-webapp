const replacePlaceholders = (text, replacements) => {
    let result = text;
    for (let key in replacements) {
        result = result.replace(new RegExp(`{${key}}`, "g"), replacements[key]);
    }
    return result;
};

export default { replacePlaceholders };
