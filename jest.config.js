module.exports = {
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/**/*.spec.ts",
        "**/**/*.e2e-spec.ts"
    ],
    testEnvironment: "node",
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
        "^~(.*)$": "<rootDir>/src/$1"
    },
    roots: ["<rootDir>/"],
    modulePathIgnorePatterns: ["<rootDir>/build/"],
    coveragePathIgnorePatterns: ["<rootDir>/build/"]
};
