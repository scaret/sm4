module.exports = {
    mode: "production",
    entry: "./SM4.ts",
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        library: "SM4",
        libraryTarget: "umd",
        filename: 'SM4.js',
    }
}