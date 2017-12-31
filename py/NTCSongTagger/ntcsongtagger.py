import Algorithmia
import pyrebase

config = {
    "apiKey": "AIzaSyBARXYzxKrIY-BWTngNANwunVQS7nScDAI",
    "authDomain": "ntcsongparse.firebaseapp.com",
    "databaseURL": "https://ntcsongparse.firebaseio.com",
    "projectId": "ntcsongparse",
    "storageBucket": "ntcsongparse.appspot.com",
    "messagingSenderId": "955827220203"
}


print 'NTC Song Tagger v1.0.0'

client = Algorithmia.client('simUXZcdt48mrcxs3P5rgieTfxQ1')
algo = client.algo('nlp/AutoTag/1.0.1')

firebase = pyrebase.initialize_app(config)
db = firebase.database();
songslist = db.child("song_list").get()
print songslist
for song_entry in songslist.each():
    song = song_entry.val()
    song_number = song.get('SongNumber')
    song_text = song.get('SongText')
    print song_number

    tags = algo.pipe(song_text).result
    db.child('song_list').child(song_number).update({'Tags': tags})

print 'Completed tagging for all songs'