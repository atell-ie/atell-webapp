import moment from "moment";
import i18next from "../i18n";

const dateFormats = {
    date: "D MMM YYYY",
    dateTime: "lll",
    shortDate: "L",
    time: "LT",
};

export default {
    /**
     * Audit Completion String Format
     * @param {number} assigned
     * @param {number} required
     * @param {number} alt
     */
    auditCompletion: (assigned, required, alt) => {
        const count = alt + assigned > 1 ? "other" : "one";
        return `${assigned} / ${required} ${alt ? `+ ${alt} ` : ""}${i18next.t(
            `asset_${count}`
        )}`.toLowerCase();
    },
    /**
     * Date Time String Format
     * @param {Date|string} date
     * @param {string} format
     */
    dateTime: (date, format = "date") =>
        date ? moment(date).format(dateFormats[format] || format) : "",
};
