const dotenv = require("dotenv");
dotenv.config({ path: "./App/config/.env" });

module.exports = {
    automock: false,
    globals: {
        __DEV__: true,
        window: {},
    },
    setupFiles: ["fake-indexeddb/auto"],
    transformIgnorePatterns: ["<rootDir>/node_modules/?!(@material-ui)"],
    setupFilesAfterEnv: ["<rootDir>/jest-test/setupFiles.js"],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/fileMock.js",
    },
    transform: {
        "^.+\\.js$": "babel-jest",
    },
};
