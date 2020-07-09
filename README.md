# Luke Myers Project 2 
## Application Name: SkyTrack
### Tecknologies Used:
1.HTML:5
2.CSS:3
3.Node.JS
4.Express.JS 
5.EJS templates
6.Sequelize ORM
7.PSQL DataBase 
8.JavaScript

### Api's Used
1. MapBox
2. NASA ISS Tracker Api
3. Cloudinary Photo's Upload Api


### Routes
Authentication (4) 
1. /Auth 
2. /Profile
3. /Register
4. /login


 Cloudinary (1)
 1. App.get /profile
 

  Map-Box (2)
 1. App.get / main
 2. get /images/mapbox.ISS.Icon

 
 Journal Post Routes  (9)

| Method | Path | Purpose |
| ------ | -------------- | -------------------------------- |
| GET | `/` | home page that lists all articles |
| GET | `/authors` | authors page that lists all authors |
| POST | `/authors` | creates a new author, then redirects back to `GET /authors` |
| GET | `/authors/new` | page that has a form for creating a new author |
| GET | `/authors/:id` | page that shows a specific author and their articles |
| POST | `/articles` | creates a new article, then redirects back to `GET /` |
| GET | `/articles/new` | page that has a form for creating a new article |
| GET | `/articles/:id` | page that shows a specific article and the author |
| POST| `'/:id/comment',`| Post a comment on the articles show page

 Total Routes 16.
  Total Controllers 4 ( Articles, Auth, Authors, Profile)

#### Models
  
  * `author`
    * Attributes: `firstName`, `lastName`, `bio`
    * Associations: Has many articles
  * `article`
    * Attributes: `title`, `content`, `authorId`
    * Associations: Belongs to one author
  * `comments`
    * Attributes: `name`, `comment`, `articleId`
    * Associations: Belongs to one article

## User Stories

* As a user, I want to write journal comments about the ISS and space. 
* As a user, I want to write a comment on a public Journal Article in order to express my opinions.
* As a user, I want to view comments on an article in order to see my community's opinions about an article.
* As a user, I want to view pictures of space and get the live location of the ISS. 



## :memo: Getting Started

### Step 1: Planning 

- [x] Create a  HackMD README (this one!)
- [x] Create Wire Frame
- [x] Create E.R.D
- [x] Make list of Routes, NPM files and Backend Requirments. 
- [x] Make and Show Journal Posts
- [x] Comment on Space posts
- [x] Show Mapbox
- [x] Style
- [x] Get ISS API and Connect to MapBox Api
- [x] Login Authentication connect to app routes
- [x] Attach pictures to main page from the Cloudinary APi

:rocket: 


### Routes: Application file layout

1. DB / PSQL  to sequelize
2. Migrations and Models
3. index.js for all requirments and main route
4. Controllers and attached functions and Routes to Templating views.ejs
5. Public folder to hold css style, pictures ect. 




## WireFrame
![](https://i.imgur.com/xrlfRpF.jpg)
:::

> Drag-n-drop image from your file system to the editor to paste it!



### Sample Pictures 

- SkyTrack allows users to keep track of the location of the ISS, weather on Mars and get great pictures of space. 

- Some of the pictures to be included in the app can be seen in this youtube slideshow example. 

{%youtube loXDVGi_lK0 %}


- Table of Content
[ToC]

