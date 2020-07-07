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
4. 


### Routes
Authentication (4) 
1. /Auth 
2. /Profile
3. /Register
4. /login


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

#### Models
  
  * `author`
    * Attributes: `firstName`, `lastName`, `bio`
    * Associations: Has many articles
  * `article`
    * Attributes: `title`, `content`, `authorId`
    * Associations: Belongs to one author

## User Stories

* As a user, I want to comment on an article in order to express my opinions.
* As a user, I want to view comments on an article in order to see my community's opinions about an article.
Map-Box (2)
 1. App.get / Home
 2. /images/mapbox.ISS.Icon

 Cloudinary (2)
 1. App.get / home
 2. App.post / render
 

 Picture Upload and Comment (5)
 1. Router Post / home/userId/
 2. Router Get   /New
 3. Router Get   /:id
 4. pictures    /show
 5. router Post /id/comments

 Total Routes 13. 


## :memo: Getting Started

### Step 1: Planning 

- [x] Create a  HackMD README (this one!)
- [x] Create Wire Frame
- [x] Create E.R.D
- [x] Make list of Routes, NPM files and Backend Requirments. 
- [x] Make and Show Posts
- [x] Comment on Space posts
- [x] Show Mapbox
- [x] Style
- [ ] Get ISS API and Connect to MapBox Api
- [ ] Login Authentication connect to app routes
- [ ] Attach pictures to main page from the Cloudinary APi
- [ ] Delete Pictures
:rocket: 





### Routes: Backend Data

- [x] Articles: Title(string), content(text), Author id.
- [x] Comment: name(string), content(text) ArticleId
- [x] User ( Authentication)





## WireFrame
![](https://i.imgur.com/xrlfRpF.jpg)
:::

> Drag-n-drop image from your file system to the editor to paste it!





### Code Examples


- Code block with color and line numbers show some code like this：
```javascript=16
var s = "JavaScript syntax highlighting";
alert(s);
.
```



### Sample Pictures 

- SkyTrack allows users to keep track of the location of the ISS, weather on Mars and get great pictures of space. 

- Some of the pictures to be included in the app can be seen in this youtube slideshow example. 

{%youtube loXDVGi_lK0 %}


- Table of Content
[ToC]

