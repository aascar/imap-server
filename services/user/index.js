/**
 * Created by jyothi on 24/3/17.
 */
var UserService = {};

UserService = function (collection) {
    this.collection = collection;
};

UserService.prototype.login = function (user) {
    //TODO:
};

UserService.prototype.register = function (user) {
    //TODO:
};

/**
 * maintains users videos with repeat count
 * @param userId
 * @param videoId
 */
UserService.prototype.updateRepeat = function (userId, videoId) {
    //TODO:
};

UserService.prototype.updateDownload = function(userId, videoId){
    //TODO:
};

UserService.prototype.updateLike = function (userId, videoId) {
    //TODO:
};

UserService.prototype.createPlaylist = function (userId, playlistName) {
    //TODO:
};

UserService.prototype.updatePlaylistWithVideo = function (userId, playlistName, videoId) {
    //TODO:
};

UserService.prototype.updatePlaylistRemoveVideo = function (userId, playlistName, videoId) {
    //TODO:
};

UserService.prototype.updatePlaylistName = function (userId, oldPlaylistName, newPlaylistName) {
    //TODO:
};

UserService.prototype.deletePlaylist = function (userId, playlistName) {
    //TODO:
};

module.exports = function(collection){
    return new UserService(collection);
};