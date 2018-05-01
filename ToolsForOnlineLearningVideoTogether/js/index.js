var config = {
  apiKey: "AIzaSyDmaOpC67Mh29_hXAFp0iNV1gQ5HxD-mns",
  authDomain: "yumeibackend.firebaseapp.com",
  databaseURL: "https://yumeibackend.firebaseio.com",
  projectId: "yumeibackend",
  storageBucket: "",
  messagingSenderId: "698593728514"
};
// Initialize the default app
var defaultApp = firebase.initializeApp(config);
// You can retrieve services via the defaultApp variable...


var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '590',
    width: '840',
    videoId: 'X_EGzJM8Rv4',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if(event.data === 0){
    alert("You have finished this video. Now I am guiding you to the quiz page!")
    window.location.href = 'modal_quiz_with_radio_button.html'
  }
}
function stopVideo() {
  player.stopVideo();
}


var app = angular.module('myApp', []);
app.controller('myCtrl', function($http, $scope, $window, $q) {
    var self = this;
    self.followupMap = {};

    self.init = function(){
      var promise = firebase.database().ref('/users').once('value')
      promise = promise.then(function(snapshot) {
        self.questions = snapshot.val();
        angular.forEach(snapshot.val(), function(value, key) {
          self.followupMap[key] = "";
        });
        $scope.$apply();
      });

      setTimeout(function(){
        jQuery('#myModal').modal('show');
      }, 0);
    }

    self.writeUserData = function(userName, Question, isPoster, description) {

    }

    self.submitQuestion = function(){
      var id = self.guidGenerator()
      defaultApp.database().ref('users/' + id).set({
        username: self.username,
        question: self.question,
        isPoster: true,
        description: self.description
      });
      alert("your question has been saved!")
      $window.location.reload();
    }

    self.submitFollowup = function(key){
      var id = self.guidGenerator()
      defaultApp.database().ref('users/' + key + '/followup/' + id).set({
        username: self.username,
        followup: self.followupMap[key],
      });
      alert("your followup has been saved!")
      $window.location.reload();

    }

    self.guidGenerator =  function(){
      var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    self.getLength = function(input){
      if (input) {
        return Object.keys(input).length
      }
      return 0;
    }
    self.init();

});
