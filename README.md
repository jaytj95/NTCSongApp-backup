# NTC Song App
App for NTC Songs, built using React Native and Firebase. This app aims to house all of the songs in the NTC database into an easily searchable list, which can theoretically be searched by name, song number, song phrase, or theme/topic (love, worship, fast, slow, etc). 

The first step is getting all of the NTC Songs into a backend service that this (or any future) app can call upon. For this, we are using Firebase, but any NoSQL database can probably do the trick (It's probably in our best interest to migrate this into our own database). I took the songs from a 2016 backup of Melodie and converted them into a JSON format on Firebase. It is viewable at this link: https://ntcsongparse.firebaseio.com/

The next step is creating the app. I am new to React Native and web development in general. Any experts please reach out. The code in this repository is the app code, built using React Native (https://facebook.github.io/react-native/). As of August 3rd, I have a working song list, where the user can click on the song and view the song. We have plans to add chords (with a transpose option), a search box for the list view, a music player to play records of the song (I understand we have recordings for every song?), as well as many other features which we can document. 

The final piece of the puzzle is the song tagger. Currently, none of the songs in Melodie are "tagged." That is to say, there is no way for our app to know what songs are about love, which songs are about praise, which songs are fast, etc. So I built a very simple web app that allows a user to go in and write custom tags for a song. With this, many people can go in and enter tags for songs. If we enough people to contribute, the tagging would be very simple. Another option would be to employ some machine learning to each song that would be able to parse the songs into respective categories, but we think that's a bit overkill.

Build Questions? Want to get involved? Contact Jason John (jasontjohn95@gmail.com)

[Python code for parsing the db](https://gist.github.com/jaytj95/7a7fa249bc106b2d9d62cd208b6dc35e)
