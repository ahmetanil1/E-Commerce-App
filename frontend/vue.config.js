// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // Backend URL'i
                changeOrigin: true,
            },
        },
    },
};
