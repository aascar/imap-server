/**
 * Created by Araja Jyothi Babu on 25-Sep-16.
 */

/**
 * Constants
 */

var FORMAT_LABEL = {
    '18': {type: 'MP4', resolution: '360p'},
    '22': { type: 'MP4', resolution: '720p (HD)'},
    '34': { type: 'FLV', resolution: '360p'},
    '35': { type: 'FLV', resolution: '480p'},
    '37': { type: 'MP4', resolution: '1080p (HD)'},
    '38': { type: 'MP4', resolution: '4K (HD)'},
    '43': { type: 'WebM', resolution: '360p'},
    '44': { type: 'WebM', resolution: '480p'},
    '45': { type: 'WebM', resolution: '720p (HD)'},
    '46': { type: 'WebM', resolution: '1080p (HD)'}
};
var FORMAT_TYPE = {'18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm','46':'webm'};
var FORMAT_ORDER = ['18','34','43','35','44','22','45','37','46','38'];
var FORMAT_RULE = {'flv':'max','mp4':'all','webm':'none'};

var ogTitle = "UrYouTube - It's your own YouTube.!";
var ogDescription = "Ultimate YouTube Video Repeater and Downloader. Listen to any Video repeatedly and Download with single click. Maintain your custom YouTube..!";
var ogUrl = "https://www.uryoutube.com";
var ogImage = "/images/BrandLogo.png";

module.exports = {
    openGraph: {title: ogTitle, url: ogUrl, description: ogDescription, image: ogImage},
    ogTitle: ogTitle,
    ogDescription: ogDescription,
    ogUrl: ogUrl,
    ogImage: ogImage,
    formatType: {'140': 'mp4', '36': '3gp', '17': '3gp', '18':'mp4','22':'mp4','34':'flv','35':'flv','37':'mp4','38':'mp4','43':'webm','44':'webm','45':'webm','46':'webm'},
    checkITAGValue: function (itag) {
        return FORMAT_ORDER.indexOf('' + itag) > -1 ? itag : 18;
    },
    getInfo : function(info){
        if(!info) return {};
        var properInfo = {}, formats = info.formats, properFormats = [], format;
        properInfo.author = info.author;
        properInfo.title = info.title;
        properInfo.description = info.description;
        properInfo.url = info.loaderUrl;
        properInfo.id = info.video_id;
        properInfo.thumbnail_url = info.iurl;
        var titlesMap = {
            "hd720" : "High Quality",
            "medium" : "Medium Quality",
            "small" : "Low Quality"
        };
        function getTitle(quality, resolution){
            if(resolution == "144p") return "Very Low Quality";
            else if(quality == null) return "Audio Only";
            else return titlesMap[quality];
        }
        var itags = ["22", "18", "36", "17", "140", "101"];
        formats.forEach(function(item){
            format = {};
            if(itags.indexOf(item.itag) > -1 || item.itag < 103){
                format.resolution = item.resolution || item.audioBitrate + " kbps";
                format.url = item.url;
                format.quality = item.quality;
                format.container = item.container;
                format.itag = item.itag;
                format.title = getTitle(item.quality, item.resolution);
                properFormats.push(format);
            }
        });
        properInfo.formats = properFormats;
        return properInfo;
    },
    downloadFailureReasons: {
        "fa fa-chain-broken": "No Internet Connection.",
        "fa fa-user-secret": "May be Private Video.",
        "fa fa-trash": "May be deleted.",
        "fa fa-ban": "The Video has constraints to download.",
        "fa fa-money": "It's a Paid Video.",
        "fa fa-child": "Age restricted Video.",
        "fa fa-frown-o": "Anything remaining is our fault."
    },
    filterSearchResults: function (data, options) {
        var items = data.items || [];
        return items.map(function (item) {
            var video = {};
            var thumbnails = item.snippet.thumbnails;
            video._id = typeof item.id === 'object' ? item.id.videoId : item.id;
            video.title = item.snippet.title;
            video.img = thumbnails && thumbnails[options.quality].url; //can also use high, default in place of medium
            video.description = item.snippet.description;
            video.channel = item.snippet.channelTitle;
            return video;
        }).filter(function(item){
            return !!item._id;
        });
    }
};