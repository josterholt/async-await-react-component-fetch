module.exports = {
    roots: ["<rootDir>"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    moduleDirectories: ["node_modules", "<rootDir>/node_modules", "."],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub",
    },
    moduleNameMapper: {
        "^src(.*)$": "<rootDir>$1",
        "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "jest-transform-stub",
        "^.+.(css|sass|scss)$": "identity-obj-proxy",
    },
};
