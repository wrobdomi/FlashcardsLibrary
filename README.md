
# Table of Contents 
- [Application Description](#application-description)
  * [Application features](#application-features)
  * [Performance characteristics](#performance-characteristics)
- [Application Demo](#application-demo)
  * [Application link](#application-link)
  * [Browse flashcards](#browse-flashcards)
  * [Create flashcards](#create-flashcards)
  * [Monitor your progress](#monitor-your-progress)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
  * [Architecture](#architecture)
  * [Tools](#tools)


<!-- toc -->


## Application Description

### Application features
The app is an online flashcards library I created taking my first steps in Angular and TS. User can:  
+ Sign up, Log in, Log out
+ Browse flashcards from available collections
+ Create collections and flashcards or add flashcards to existing collections
+ Monitor progress and store solved flashcards in a table

### Performance characteristics
+ Security: token-based authentication provided by firestore
+ Responsive: responsive design adjusting to all sizes of screens (flexbox)
+ Error handling: database connection error handling implemented
+ Optimization: lazily-loaded modules
+ Redux: application state partially managed by ngRX (only for learning reasons)

## Application Demo

### Application link
The app is already running on the server! Feel free to play around with all features. Sign up or log in as test@test.com (password: testing). https://flashcards-library.firebaseapp.com 

### Browse flashcards
![solving](https://user-images.githubusercontent.com/37666186/53055161-046dd380-34a7-11e9-9940-45c55ed258c1.gif)

### Create flashcards
![adding](https://user-images.githubusercontent.com/37666186/53055138-f28c3080-34a6-11e9-8ecd-d206ccf2fb8b.gif)

### Monitor your progress
![monitor](https://user-images.githubusercontent.com/37666186/53055156-fe77f280-34a6-11e9-9878-dac0d467844b.gif)


## Project Structure

* /src/app
  + /auth __user authentication__
    * /login 
      + login.component.css
      + login.component.html
      + login.component.spec.ts
      + login.component.ts
    * /signup
      + signup.component.css
      + signup.component.html
      + signup.component.spec.ts
      + signup.component.ts
    * auth-data.module.ts
    * auth-routing.module.ts
    * auth.guard.ts
    * auth.module.ts
    * auth.service.ts
    * user.model.ts
  + /flashcards - __core components and services__
    * /current-flashcards
      + current-flashcards.component.css
      + current-flashcards.component.html
      + current-flashcards.component.spec.ts
      + current-flashcards.component.ts
    * /learning-flashcards
      + completed-learning.component.ts
      + learning-flashcards.component.css
      + learning-flashcards.component.html
      + learning-flashcards.component.spec.ts
      + learning-flashcards.component.ts
      + stop-learning.component.ts
    * /new-flashcards
      + /new-collection
        * new-collection.component.css
        * new-collection.component.html
        * new-collection.component.spec.ts
        * new-collection.component.ts
      + /new-flashcard-content
        * new-flashcard-content.component.css
        * new-flashcard-content.component.html
        * new-flashcard-content.component.spec.ts
        * new-flashcard-content.component.ts
      + new-flashcards.component.css
      + new-flashcards.component.html
      + new-flashcards.component.spec.ts
      + new-flashcards.component.ts
    * /solved-flashcards
      + solved-flashcards.component.css
      + solved-flashcards.component.html
      + solved-flashcards.component.spec.ts
      + solved-flashcards.component.ts
    * flashcard.model.ts
    * flashcards-routing.module.ts
    * flashcards.component.css
    * flashcards.component.html
    * flashcards.component.spec.ts
    * flashcards.component.ts
    * flashcards.module.ts
    * flashcards.service.ts  
    * learning.model.ts
    * solved-flashcard.model.ts
    * /home
      + home.component.css
      + home.component.html
      + home.component.spec.ts
      + home.component.ts
    * /navigation
      + /header
        * header.component.css
        * header.component.html
        * header.component.spec.ts
        * header.component.ts
      + /sidenav-list
        * sidenav-list.component.css
        * sidenav-list.component.html
        * sidenav-list.component.spec.ts
        * sidenav-list.component.ts
    * /shared
      + shared.module.ts
      + ui.actions.ts
      + ui.reducer.ts
      + ui.service.ts
    * app-routing.module.ts
    * app.component.css
    * app.component.html
    * app.component.spec.ts
    * app.component.ts
    * app.module.ts
    * app.reducer.ts
    * material.module.ts
    
    
    
## Technologies
* TypeScript
* Angular7
  + @angular/material
  + @angular/fire
  + @angular/flex-layout
  + @ngrx/core
  + and other more basic packages
* HTML/CSS/JavaScript

### Architecture
* SPA (Single Page Application) - Frontend
* Firestore Cloud, NoSQL DB - Backend

### Tools
  * MS Visual Studio Code
  * Angular Augury
  * Angular CLI


