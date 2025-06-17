import "@testing-library/jest-dom";
import "jest-canvas-mock";
const imageCompression = require("browser-image-compression");
const image = require("@/jest-test-data/Camera/image");
const dotenv = require("dotenv");
dotenv.config({ path: "./App/config/.env" });

process.env.HOST = "local";

class LocalStorageMock {
    constructor() {
        this.store = {};
    }
    clear() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock();

// mocking image compress module
async function mockedCompressedFunc() {
    return {};
}
mockedCompressedFunc.getFilefromDataUrl = () => jest.fn();
mockedCompressedFunc.getDataUrlFromFile = () => image;

// need to mock compression, otherwise test failing
jest.mock("browser-image-compression", () => ({
    __esModule: true, // this property makes it work
    default: mockedCompressedFunc,
}));
