/**
 * Created by jyothi on 24/3/17.
 */
var VideoService = {};

VideoService = function (db) {
    this.db = db;
};

/**
 * Upsert video
 * @param videoId {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.upsertVideo = function (videoId, success, failure) {
    //TODO:
};

/**
 * video info
 * @param videoId {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.videoInfo = function (videoId, success, failure) {
    //TODO:
};

/**
 * video liked users
 * @param videoId {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.videoLikes = function (videoId, success, failure) {
    //TODO:
};

/**
 * updates repeat count
 * @param videoId {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.updateRepeat = function (videoId, success, failure) {
    //TODO:
};

/**
 * Update like count
 * @param videoId {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.updateLike = function (videoId, success, failure) {
    //TODO:
};

/**
 * update download count
 * @param videoId {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.updateDownload = function (videoId, success, failure) {
    //TODO:
};

/**
 * trending videos based on filters
 * @param filters {Object}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.trendingVideos = function (filters, success, failure) {
    //TODO:
};

/**
 * repeated videos based on filters
 * @param filters {Object}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.mostRepeated = function (filters, success, failure) {
    //TODO:
};

/**
 * liked videos based on filters
 * @param filters {Object}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.mostLiked = function (filters, success, failure) {
    //TODO:
};

/**
 * download videos based on filters
 * @param filters {Object}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.mostDownloaded = function (filters, success, failure) {
    //TODO:
};

/**
 * related videos based on videoId
 * @param videoId {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.relatedVideos = function (videoId, success, failure) {
    //TODO:
};

/**
 * search db for videos based on query string
 * @param key {string}
 * @param success {function}
 * @param failure {function}
 */
VideoService.prototype.searchVideos = function (key, success, failure) {
    //TODO:
};

module.exports = function (db) {
    return new VideoService(db);
};