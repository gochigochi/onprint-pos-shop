module.exports = {
    testEnvironment: "jest-environment-jsdom",
    setupFiles: ['./jest.setup.ts'],    
    setupFilesAfterEnv: ['./jest-dom.setup.ts']
}