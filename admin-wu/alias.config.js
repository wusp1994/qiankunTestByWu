/*此文件与项目无关，只是为了让idea可以识别实际位置*/
const path = require("path");

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    resolve: {
        alias: {
            "@": resolve("src"),
            // "_c": resolve("src/components")
        },
    },
};
