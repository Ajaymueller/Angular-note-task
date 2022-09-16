# AngularNoteTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.

Author: Aidan Mueller

## To run the application

Clone the project using SSH or HTTPS

Once cloned down, install dependencies - npm intall

Run the project - npm start 

Run the json server - json-server --watch db.json

Run the tests - npm test 

## How to use the application

Before running, feel free to manually add any data to the db.json file. 

Click on a note to update it. 
Click create a note to create a new note. 
Change user button reveals a dropdown to change a user, then calls the notes associated with that user. 
Search notes filter allows you to search for a note by title or body. 

## The brief

The aim of this assignment was to create a note taker app with the ability to add, create, open, delete and view notes. 
Also to include some unit testing. 

## Tools and technologies Used

Angular
TypeScript
Scss

## The approach

You will see the note-page component is where most of the functionality logic lies. Following the seperation of concerns priciple, I wanted to 
make sure there was only one main container component that interacted with the service, and have the other components as purely 
presentational components. I didn't want to have child components changing the state or data. This way, I was only getting the data from one source. You can see the way I interracted with them was via inputs and outputs.

As for getting the data, you will see I created a model to type to the data being returned, and then pushed it to the model. I like doing this because it allows the code to be cleaner and more modular as you can then have any methods on the model class, so the data is given to the component in the form that you want, rather than having to manipulate it within the component class itself. I could have even had the service methods within the note class itself (add, update, delete), perhaps returning a promise or an observable within the class, and then fulfilling or subscribing to it within the component class. 


## What more could I have done, Struggles and next steps 

I could have definitely worked on the styling more. You can see that I won't be winning any style awards for this!

However, being time limited, I wanted to make sure the app did the important things first (the functionality). 
Although I couldn't have used bootstrap, I was thinking about using something like Angular material UI or Ionic. However, I just wanted to keep 
the app as simple and lightweight as possible without using any css framework. This also allowed me to have a bit of fun with pure scss too.
I did try to utilise the powers of scss with things like global mixins and properties. Again, this would also help in future - for example changing a button styling would only require changing the mixin, rather than every component scss file that uses a button. 

I could have also tried to make the app more mobile friendly. You can see a component that I didn't end up using, but I kept it in so you can see. The logic behind it was to have that component show below a certain screen size, possibly using a hostListener to listen to a certain screen size on the card component, as opposed to the modal. If I had more time, I could have implemented that. I just ended up using a media query to adjust the size of the modal below a certain screen size. 

Although you can switch between users using the button and usersdropdown, the current functionality doesn't allow a user to be added to a note when creating one. Implementing this would have been relatively simple, with just another input field on the modal binded to the userID.
By default, the user ID is 0. But please feel free to add different user ids to see how the userdropdown works. 

As for testing, it took a bit of research for me to understand more as, before this, I hadn't tested in a while.
I could have probably tested more, probably the service in particular. 
I think I could have organised the test files a bit cleaner. I did try to use the arrange, act, assert method when testing.

I did definitely enjoy learning more about testing. Although I probably made some mistakes with testing, I will definitely look to 
improve my testing abilities. 

Thank you for viewing my application and I look forward to any feedback that I can put into action in the future. 
