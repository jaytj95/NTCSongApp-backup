
$(document).ready(function() {
    //init
    //getting HTML views
    var newSongButton = $("#getSongButton");
    var titleView = $("#title");
    var lyricsView = $("#lyrics");
    var getSongButton = $("#getSongButton");
    var formSubmitButton = $("#submit")
    var loadingView = $("#loading")

    titleView.hide();
    lyricsView.hide();
    getSongButton.hide();
    var songList = [];

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBARXYzxKrIY-BWTngNANwunVQS7nScDAI",
      authDomain: "ntcsongparse.firebaseapp.com",
      databaseURL: "https://ntcsongparse.firebaseio.com",
      projectId: "ntcsongparse",
      storageBucket: "ntcsongparse.appspot.com",
      messagingSenderId: "955827220203"
    };

    firebase.initializeApp(config);
    var database = firebase.database().ref("song_list").orderByChild("SongNumber");
    database.on('value', function(snapshot) {
      loadingView.hide();
      snapshot.forEach(function(childSnapshot) {
        var edited = childSnapshot.val();
        edited.SongText = edited.SongText.split('[chorus:').join('<i>')
        edited.SongText = edited.SongText.split(']').join('</i>')
        songList.push(edited);
      })
      getSongButton.show();
      titleView.show();
      lyricsView.show();
      getRandomFirebaseSong();
    })


    // all custom jQuery will go here
    newSongButton.click(getRandomFirebaseSong);
    formSubmitButton.click(submitTagsForSong);

    //get random song from firebase
    function getRandomFirebaseSong() {
      let index = Math.round(Math.random()*songList.length) + 1
      let song = songList[index];
      $("#title").html(song.SongTitle + " (" + song.SongNumber + ")");
      $("#lyrics").html(songList[index].SongText);
    }

    function submitTagsForSong() {
      alert('yo!')
    }
});
