# KAES-TV-Show-explorer
Build with AngularJS application that lists episodes for TV shows. 
## Features: 
The basic idea is that a user should be able to enter the name of a TVshow,
for example: Silicon Valley, Game of Thrones or Breaking Bad. Then a list of episodes from the first season of the show should appear. 
Use the API that is described above. For each episode various information should be available, such as episode number, title, plot and poster image.

1. The user should be able to enter the name of whatever TVshow
they want. But let the default value be ‘Silicon Valley’ and on document load show the episode list for this show. Fetch the episodes of the first season and show them.

2. For each episode show:
##### a. The episode number, for example: 1
##### b. The episode title, for example: Minimum Viable Product
##### c. The episode plot, for example: Richard is a computer programmer. He has to
choose between a $10 million deal with Gavin Belson and a $200.000 deal
with Peter Gregory, in exchange for his cooperation to make the idea of a
super compressing algorithm change the world.
##### d. The episode poster image.
##### For example:
http://ia.mediaimdb.com/images/M/MV5BMTY5MTg3OTY5NF5BMl5BanBnX
kFtZTgwNTE3Mzc5MjE@._V1_SX300.jpg
e. The month that the episode was released in text (not using digits), for
example: April
f. The IMDb rating, for example: 7.8

3. When an episode has a IMDb rating of 8.5 or higher it should be visually different. For example a different border or background color for that episode.

4. Calculate the average IMDb rating for the shown episodes. Show the number with exactly 2 decimals. For example 6.80

5. The user should be able to remove or hide episodes. only remove the episode on the client side.

## API
https://www.omdbapi.com/ provides a JSON API to get information
about movies and tvshows from IMDb.
##### Example:
Get the first season of Silicon Valley:
https://www.omdbapi.com/?t=Silicon%20Valley&Season=1
###### Get the first episode of season one of Silicon Valley (imdbID value tt3222784):
https://www.omdbapi.com/?i=tt3222784&plot=short&r=json
Note that the API is available in HTTPS.

## Quick Start 
Manual: download latest from here 
#### Bower:
bower install ng-file-upload --save
#### NuGet: PM> Install-Package angular-file-upload
#### NPM: npm install ng-file-upload

## Version
Kaes TVshow explorer 1.0

## Current Version
Kaes TVshow explorer 1.0
###Release date Version 1.0 -- 11th May, 2017

## License

MIT

## Author

### Lotfar kaes 

