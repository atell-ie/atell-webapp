import watch from "./assessment/watch_opt.png";
import gloves from "./assessment/gloves_opt.png";
import sock from "./assessment/sock_opt.png";
import media from "./assessment/media.png";
import bridge from "./assessment/bridge.png";
import dinosaur from "./assessment/dinosaur.png";
import finger from "./assessment/finger.png";
import helicopter from "./assessment/helicopter.png";
import lightbulb from "./assessment/lightbulb.png";
import mushroom from "./assessment/mushroom.png";
import teeth from "./assessment/teeth.png";
import unicorn from "./assessment/unicorn.png";

const taskData = {
    entries: [
        {
            id: 1,
            index: 0,
            text: "Watch",
            media: watch,
            // sounds: [
            //     { id: 24, ipa: "w" },
            //     { id: 52, ipa: "ɒ" },
            //     { id: 20, ipa: "tʃ" }
            // ],
            sounds: {
                24: "w",
                52: "ɒ",
                20: "tʃ"
            },
            mapped: {},
            data: media
        },
        {
            id: 2,
            index: 1,
            text: "Gloves",
            media: gloves,
            // sounds: [
            //     { id: 6, ipa: "g" },
            //     { id: 22, ipa: "l" },
            //     { id: 45, ipa: "ʌ" },
            //     { id: 12, ipa: "v" },
            //     { id: 16, ipa: "z" }
            // ],
            sounds: {
                6: "g",
                22: "l",
                45: "ʌ",
                12: "v",
                16: "z"
            },
            mapped: {},
            data: media
        },
        {
            id: 3,
            index: 2,
            text: "Sock",
            media: sock,
            // sounds: [
            //     { id: 15, ipa: "s" },
            //     { id: 52, ipa: "ɒ" },
            //     { id: 5, ipa: "k" }
            // ],
            sounds: {
                15: "s",
                52: "ɒ",
                5: "k"
            },
            mapped: {},
            data: media
        },
        {
            id: 4,
            index: 3,
            text: "Finger",
            media: finger,
            // sounds: [
            //     { id: 11, ipa: "f" },
            //     { id: 31, ipa: "ɪ" },
            //     { id: 10, ipa: "ŋ" },
            //     { id: 6, ipa: "g" },
            //     { id: 40, ipa: "ə(ɹ)" }
            // ],
            sounds: {
                11: "f",
                31: "ɪ",
                10: "ŋ",
                6: "g",
                40: "ə(ɹ)"
            },
            mapped: {},
            data: media
        },
        {
            id: 5,
            index: 4,
            text: "Dinosaur",
            media: dinosaur,
            sounds: {},
            mapped: {},
            data: media
        },
        {
            id: 6,
            index: 5,
            text: "Mushroom",
            media: mushroom,
            sounds: {},
            mapped: {},
            data: media
        },
        {
            id: 7,
            index: 6,
            text: "Teeth",
            media: teeth,
            sounds: {},
            mapped: {},
            data: media
        },
        {
            id: 8,
            index: 7,
            text: "Helicopter",
            media: helicopter,
            sounds: {},
            mapped: {},
            data: media
        },
        {
            id: 9,
            index: 8,
            text: "Unicorn",
            media: unicorn,
            sounds: {},
            mapped: {},
            data: media
        },
        {
            id: 10,
            index: 9,
            text: "Lightbulb",
            media: lightbulb,
            sounds: {},
            mapped: {},
            data: media
        },
        {
            id: 11,
            index: 10,
            text: "Bridge",
            media: bridge,
            sounds: {},
            mapped: {},
            data: media
        }
    ]
};

export default taskData;
