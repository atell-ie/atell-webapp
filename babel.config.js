module.exports = {
    env: {
        test: {
            plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-transform-modules-commonjs",
            ],
        },
    },
    presets: [
        [
            "@babel/preset-env",
            {
                targets: ">0.2%, not dead, not op_mini all",
                useBuiltIns: "usage",
                corejs: 3,
            },
        ],
        "@babel/preset-react",
        "@babel/preset-flow" // optional, remove if not using Flow
    ],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-shorthand-properties",
        "@babel/plugin-proposal-logical-assignment-operators",
        "@babel/plugin-transform-runtime",
        // (Optional) Transform imports for MUI without esm hack
        [
            "babel-plugin-transform-imports",
            {
                "@mui/material": {
                    "transform": "@mui/material/${member}",
                    "preventFullImport": true
                },
                "@mui/icons-material": {
                    "transform": "@mui/icons-material/${member}",
                    "preventFullImport": true
                },
                "@mui/lab": {
                    "transform": "@mui/lab/${member}",
                    "preventFullImport": true
                }
            }
        ]
    ],
    exclude: [/\/core-js\//]
};
