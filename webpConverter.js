const sharp = require("sharp");
const fs = require('fs');
/**
 * This function receives a readable stream as a parameter
 * Then converts the stream into a .webP image
 * @param {stream} readableStream
 * @returns {stream}
 */
function optimize(readableStream, config) {

    var transformer = sharp();
    transformer.webp();
    
    if(config.size){
        transformer.resize(config.size.width, config.size.height);
    }
    transformer.toFile(config.filename);
    
    readableStream.pipe(transformer);
}

module.exports = {
    optimize: optimize
};