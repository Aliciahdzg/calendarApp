module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.cjs'],
	transformIgnorePatterns: [],

    // ModuleNameMapper solo si ocupamos imprtar CSS en nuestros componentes para el testing 
    moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/tests/mocks/styleMock.js',
    }, 
}
