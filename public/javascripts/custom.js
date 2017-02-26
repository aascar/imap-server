var REPEAT_MODE = 'repeat';
var AUTOPLAY_MODE = 'autoplay';

var downloadFile = function(itag, id, fileName){
    var url = '/download/' + id + '/' + itag;
    window.location.assign(url);
};

function isValidUrl(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}

function getVideoId(url){
    var videoId = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    return videoId != null? videoId[1] : videoId;
}

function renderBlobType(element, format, info){
    var li = $('<li />', {'class': "list-group-item"}).appendTo(element);
    var row = $('<div />',{'class' : "row"}).appendTo(li);
    var title = $('<div />',{'class' : "col-md-5 col-sm-5 col-xs-6"}).appendTo(row);
    $('<span />', {
        'class': 'title',
        'text': format.title
    }).appendTo(title);
    var quality = $('<div />',{'class' : "col-md-2 col-sm-2 hidden-xs"}).appendTo(row);
    $('<strong />', {
        'class': 'quality label label-info',
        'text': format.container
    }).appendTo(quality);
    var resolution = $('<div />',{'class' : "col-md-3 col-sm-3"}).appendTo(row);
    $('<span />', {
        'class': 'title',
        'text': format.resolution
    }).appendTo(resolution);
    var download = $('<div />',{'class' : "col-md-2 col-sm-2"}).appendTo(row);
    var button = $('<a />', {
        'class': 'btn btn-success download-button',
        'href': 'javascript:void(0)',
        'title': 'Download ' + format.container,
        'itag': format.itag,
        'video_id': info.id,
        'video_name': info.title + "." + format.container
    }).appendTo(download);
    $('<i />', {'class': 'fa fa-download'}).appendTo(button);

}

function renderResults(element, info){
    var row = $('<div />',{'class' : "row"}).appendTo(element);
    var colLeft = $('<div />', {'class': 'col-md-3 col-sm-3'}).appendTo(row);
    var colRight = $('<div />', {'class': 'col-md-9 col-sm-9 info-container'}).appendTo(row);
    var aForImage = $('<a />', {
            'class': 'text-center',
            href: info.url,
            target: "_blank"
        }).appendTo(colLeft);
    var image = $('<img />', {
        'class': 'img-responsive image-thumbnail',
        'src': info.thumbnail_url,
        'alt': info.title,
        'title': info.title
    }).appendTo(aForImage);
    //renderShareButton(colLeft); TODO: Share buttons
    var h4 = $('<h4 />', {
        'class': 'media-heading',
        'text': info.title
    }).appendTo(colRight);
    $('<br />', {}).appendTo(colRight);
    var listGroup = $('<div />', {
        'class': 'list-group custom-group'
    }).appendTo(colRight);
    info.formats.forEach(function(format){
        renderBlobType(listGroup, format, info);
    });
}

function toggleDownloadIcon(element){
    $(element).find("i.fa").toggleClass('fa-download');
    setInterval(function(){
        $(element).find("i.fa").toggleClass('fa-spinner fa-pulse');
    }, 1000);
}

var regretsMessage = "Regrets..! This video cannot be downloaded.! ";
var invalidURLMessage = "Oops..! It's not a valid URL. Try again.";

function renderRegretsMessage(element, message, more){
    var container = $(element);
    $(container).html();
    var alert = $('<div />', {
        'class': 'alert alert-warning alert-dismissible text-center',
        'role': 'alert',
        text: message
    }).appendTo(container);
    var button = $('<button />', {
        'class': 'close',
        'data-dismiss': 'alert',
        'aria-label':'Close'
    }).appendTo(alert);
    $('<span />', {
        'aria-hidden': 'true',
        'text': "x"
    }).appendTo(button);
    if(more) {
        var learnMore = $('<a />', {
            href: "/failures",
            text: "Learn More.."
        }).appendTo(alert);
    }
}

function loadSubmitIcon(){
    $('#submit-button').html('<i class="fa fa-pulse fa-spinner"></i>');
}

function unLoadSubmitIcon(){
    $('#submit-button').html('Download.!');
}

$(document).on('click', '.download-button-left', function(e){
    //toggleDownloadIcon($(this));
    e.preventDefault();
    var itag = $(this).attr("itag").trim();
    var video_id = $(this).attr('video_id').trim();
    var fileName = $(this).attr('video_name').trim();
    downloadFile(itag, video_id, fileName);
    updateDownloads(video_id);
    //toggleDownloadIcon($(this));
});

// animate growth
$("#result-container").animate({
    'opacity':1,
    'height': $(this).height() + 'px'},
    3000);


//fb button genarator

function renderShareButton(element){
    var container = $('<div />', {
        'class': 'share-buttons text-center'
    }).appendTo(element);
    var div = $('<div />', {
        'class': "fb-share-button",
        'data-href': window.location.href,
        'data-layout': "button_count",
        'data-size': "large",
        'data-mobile-iframe': "true"
    }).appendTo(container);
    var a = $('<a />', {
        'class': "fb-xfbml-parse-ignore",
        target: "_blank",
        href: "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href + "&src=sdkpreparse"
    }).appendTo(div);
}

$(document).on('submit', "#contact-form", function(e){
    e.preventDefault();
    $("#form-submit").val("Submitting...");
    var isIssue = $("#form-url").val();
    var channel = isIssue ? '#uryoutube_issues' : '#uryoutube_inbox';
    var name = $("#form-name").val() + " (" + $("#form-email").val() + ")";
    var text = "*Message:* " + $("#form-content").val();
    if(isIssue) text += "\n`" + isIssue + '`';
    var obj = {};
    obj.channel = channel;
    obj.username = name;
    obj.text = text;
    obj.icon_emoji = ":four_leaf_clover:";
    $.ajax({
        url : "https://hooks.slack.com/services/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",
        method : "POST",
        dataType: 'text',
        async: true,
        data: JSON.stringify(obj),
        timeout : 30000     //30 seconds timeout
    }).done(function(status){
        $("#message").text("Thank you, we will get back to you shortly.");
    }).fail(function(){
        $("#message").text("Something went wrong. Please try again..!");
    }).always(function(){
        $(".alert").removeClass("hide");
        $("#form-submit").val("Submit");
    });

});

function updateRepeats(id){
    $.getJSON("/repeat/" + id, function(res){ //increments in server
        var el = $("#video-repeats");
        var presentCount = $(el).text().trim();
        if(res)
            $(el).text(+presentCount + 1);
    });
}

function updateDownloads(id){
    $.getJSON("/download/" + id, function(res){ //increments in server
        var el = $("#video-downloads");
        var presentCount = $(el).text().trim();
        if(res)
            $(el).text(+presentCount + 1);
    });
}

function updateLikes(id, step){
    $.getJSON("/repeat/" + id, function(res){ //increments in server
        var el = $("#video-likes");
        var presentCount = $(el).text().trim();
        if(res)
            $(el).text(+presentCount + 1);
    });
}

$(document).ready(function() {
    $("[data-toggle='tooltip']").tooltip();
    $('input#url').focus(function() {
        $(this).attr('placeholder', 'https://www.youtube.com/watch?v=rEggfqcRsPw')
    }).blur(function() {
        $(this).attr('placeholder', 'Paste your Youtube URL here..!')
    });
    $(".download-collapse").click(function () {
        $(this).find("i.fa").toggleClass("fa-angle-down");
        $(this).find("i.fa").toggleClass("fa-angle-up");
    });

    $("#uryoutube, #uryoutube-mobile").autocomplete({
        source: function(request, response){
            var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
            var query = request.term;
            $.ajax({
                url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",
                dataType: 'jsonp',
                success: function(data, textStatus, request) {
                    response( $.map( data[1], function(item) {
                        return {
                            label: item[0],
                            value: item[0]
                        }
                    }));
                }
            });
        },
        select: function( event, ui ) {
            window.location = "/search?q=" + ui.item.label;
            //$.youtubeAPI(ui.item.label);
        }
    });

    var fs = $("#fs");

    if(localStorage.getItem('mode')){
        fs.prop('checked', localStorage.getItem('mode') === AUTOPLAY_MODE);
    }else{
        localStorage.setItem('mode', REPEAT_MODE);
    }

    $(fs).click(function () {
        localStorage.setItem('mode', ($(this)[0].checked ? AUTOPLAY_MODE : REPEAT_MODE));
    });

});
var dataTypes = {
    repeated: "repeated",
    downloaded: "downloaded",
    trending: "trending"
};

var dataVersion = 1;
var dataEnd = false;
var defaultDataSize = 10;
function getPaginatedData(dataType){
    if(!dataEnd) {
        $.getJSON("/versioned/" + dataType + "/" + dataVersion, function (res) {
            if (res) {
                $("#" + dataType).append();
                dataEnd = res.length < defaultDataSize;
                dataVersion++;
            }
        });
    }
}

function renderLargeVideoItem(data) {
    //TODO:
}

function renderSmallVideoItem(data) {
    //TODO:
}

function managePlay(player, videoId, nextVideoId) {
    var nextVideo = $(".trending-item:first").attr("id");
    if(localStorage.getItem('mode') === AUTOPLAY_MODE && nextVideo) {
        window.location = '/watch?v=' + nextVideo;
    }else{
        player.playVideo();
        updateRepeats(videoId);
    }
}

function isDefined(value) {
    return typeof value !== 'undefined' && value !== '' && value != null;
}