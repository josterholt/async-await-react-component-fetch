module.exports = {
    roots: ["<rootDir>"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    testEnvironment: "jsdom",
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    moduleNameMapper: {
        "^src(.*)$": "<rootDir>$1",
        "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub",
        "^.+.(css|sass|scss)$": "identity-obj-proxy",
    },
};
