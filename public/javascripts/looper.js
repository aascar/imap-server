/**
 * Created by Araja Jyothi Babu on 07-Oct-16.
 */
var auto_repeat = true;
var isPolling = false;
var id = $("#video-container");

function watchPage(){
    var html5 = $(id).contents().find('video.video-stream');
    //var flash = document.getElementById("movie_player");
    return html5;
}


function checkCompletion(){ //this is the key part
    var html5 = $(id).contents().find('video.video-stream');
    var video = $(html5)[0];
    //var flash = document.getElementById("movie_player");
    if(video){
        if(video.currentTime == html5[0].duration) video.play();
    }/*else if(flash){
        if(flash.getCurrentTime() == flash.getDuration()) flash.playVideo();
    }*/
}


function startPolling(){
    if(!isPolling) doPoll();
}

function doPoll(){ //feels needlessly complex
    isPolling = true;
    if(auto_repeat){
        checkCompletion();
        setTimeout(doPoll, 420);
    }else isPolling = false;
}

function createUI(){
    var label = document.createElement('label');
    label.setAttribute('for', 'x-yt-repeat');
    label.innerHTML = 'Repeat';
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function(){
        if(auto_repeat = checkbox.checked){
            startPolling();
        }
    }
    checkbox.id = 'x-yt-repeat';
    var container = document.createElement('div');
    container.appendChild(label);
    container.appendChild(checkbox);
    return container
}


function appendUI(){
    var sidebar = document.querySelector('#watch-description-extra-info');
    var ui = createUI();
    if(sidebar){ //insert before sidebar
        ui.className = 'watch-module';
        sidebar.insertBefore(ui, sidebar.firstChild);
    }else{ //PlanB
        ui.style.position = 'absolute';
        ui.style.top = '50px';
        ui.style.left = '10px';
        document.body.appendChild(ui);
    }
}

setTimeout(function(){
    if(watchPage()) startPolling();
},100);

