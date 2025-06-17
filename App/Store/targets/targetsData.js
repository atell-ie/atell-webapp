import isolation from "./treatment/isolation.png";
import syllables from "./treatment/syllables.png";
import singleWords from "./treatment/single_words.png";
import phrase from "./treatment/phrase.png";
import singleSentences from "./treatment/single_sentences.png";
import sentences from "./treatment/sentences.png";
import { t } from "i18next";

const iso = {
    id: 1,
    type: 1,
    exerciseNo: 5,
    media: isolation,
    block: [
        {
            index: 0,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 1,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 2,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 3,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 4,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 5,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 6,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 7,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 8,
            target: { m: 8 },
            mapped: {}
        },
        {
            index: 9,
            target: { m: 8 },
            mapped: {}
        }
    ]
};

const syl = {
    id: 2,
    type: 2,
    exerciseNo: 2,
    media: syllables,
    block: [
        {
            index: 0,
            target: {
                m: 8,
                a: 49,
                ɪ: 31
            },
            mapped: {}
        },
        {
            index: 1,
            target: {
                m: 8,
                i: 25,
                h: 19
            },
            mapped: {}
        },
        {
            index: 2,
            target: {
                m: 8,
                i: 25
            },
            mapped: {}
        },
        {
            index: 3,
            target: {
                m: 8,
                ɔ: 46
            },
            mapped: {}
        },
        {
            index: 4,
            target: {
                m: 8,
                u: 30,
                h: 19
            },
            mapped: {}
        },
        {
            index: 5,
            target: {
                m: 8,
                e: 34,
                h: 19
            },
            mapped: {}
        }
    ]
};

const sWords = {
    id: 3,
    type: 3,
    exerciseNo: 4,
    media: singleWords,
    block: [
        {
            index: 0,
            target: {
                m: 8,
                ɪ: 31,
                k: 5
            },
            mapped: {}
        },
        {
            index: 1,
            target: {
                m: 8,
                æ: 47,
                p: 1
            },
            mapped: {}
        },
        {
            index: 2,
            target: { m: 8, ʌ: 45, g: 6 },
            mapped: {}
        },
        {
            index: 3,
            target: {
                m: 8,
                ɪ: 31,
                l: 21,
                i: 25
            },
            mapped: {}
        },
        {
            index: 4,
            target: { m: 8, i: 25, t: 3 },
            mapped: {}
        },
        {
            index: 5,
            target: { m: 8, e: 34, ɪ: 31, z: 15 },
            mapped: {}
        },
        {
            index: 6,
            target: { m: 8, u: 30, n: 9 },
            mapped: {}
        }
    ]
};

const phr = {
    id: 4,
    type: 4,
    exerciseNo: 8,
    media: phrase,
    block: [
        {
            index: 0,
            sentence: "red {?}",
            target: {
                m: 8,
                ɑ: 51,
                n: 9,
                s: 15,
                t: 3,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 1,
            sentence: "orange {?}",
            target: {
                m: 8,
                ɑ: 51,
                n: 9,
                s: 15,
                t: 3,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 2,
            sentence: "yellow {?}",
            target: {
                m: 8,
                ɑ: 51,
                n: 9,
                s: 15,
                t: 3,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 3,
            sentence: "green {?}",
            target: {
                m: 8,
                ɑ: 51,
                n: 9,
                s: 15,
                t: 3,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 4,
            sentence: "blue {?}",
            target: {
                m: 8,
                ɑ: 51,
                n: 9,
                s: 15,
                t: 3,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 5,
            sentence: "purple {?}",
            target: {
                m: 8,
                ɑ: 51,
                n: 9,
                s: 15,
                t: 3,
                ə: 40
            },
            mapped: {}
        }
    ]
};

const sSent = {
    id: 5,
    type: 5,
    exerciseNo: 9,
    media: singleSentences,
    block: [
        {
            index: 0,
            sentence: "There is a {?} in the flowers",
            target: {
                m: 8,
                ɪ: 31,
                m: 8,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 1,
            sentence: "There is a {?} in the cloud",
            target: {
                m: 8,
                ɪ: 31,
                m: 8,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 2,
            sentence: "There is a {?} in the tree",
            target: {
                m: 8,
                ɪ: 31,
                m: 8,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 3,
            sentence: "There is a {?} behind the ball",
            target: {
                m: 8,
                ɪ: 31,
                m: 8,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 4,
            sentence: "There is a {?} in the playground",
            target: {
                m: 8,
                ɪ: 31,
                m: 8,
                ə: 40
            },
            mapped: {}
        },
        {
            index: 5,
            sentence: "There is a {?} behind the stairs",
            target: {
                m: 8,
                ɪ: 31,
                m: 8,
                ə: 40
            },
            mapped: {}
        }
    ]
};

const sent = {
    id: 6,
    type: 6,
    exerciseNo: 10,
    media: sentences,
    block: [
        {
            index: 0,
            sentence: "The girl is {?} the bed",
            target: {
                m: 8,
                e: 34,
                ɪ: 31,
                k: 5,
                ɪ: 31,
                ŋ: 10
            },
            mapped: {}
        },
        {
            index: 0,
            sentence: "The boy is {?} a snowman",
            target: {
                m: 8,
                e: 34,
                ɪ: 31,
                k: 5,
                ɪ: 31,
                ŋ: 10
            },
            mapped: {}
        }
    ]
};

export default [iso, syl, sWords, phr, sSent, sent];
