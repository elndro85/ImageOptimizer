const sharp = require("sharp");
const logger = require('./logger');

/**
 * This function receives a readable stream as a parameter
 * Then converts the stream into a .png image
 * Finally it returns a readableStream image
 * @param {stream} readableStream
 * @returns {stream}
 */
function optimize(image, config) {

    let width = config.size.width || undefined;
    let height = config.size.height || undefined;
    let transform = sharp();

    transform.on('finish', err => {
        logger.log("info", `Succesfully compressed ${config.filename}.png ${err}`);
    })

    transform.on('error', err => {
        logger.log("error", `Failed to compress ${config.filename}.png ${err}`);
    })

    transform.toFormat(config.format, {
        progressive: true,
        quality: config.quality
    });

    // transform.png({
    //     progressive: true, 
    //     quality: config.quality
    // })

    if (config.size) {
        transform.resize(width, height, {
            fit: config.mode,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        });

        if(config.resizeMethod === "MaxFit"){
            transform.max();
        }
    }

    return image.pipe(transform);

}

module.exports = {
    optimize: optimize
};