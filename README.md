## Inspiration
At first, we wanted to build a messaging app. So, we asked ourselves how can we attract users to use the application since there's so many messaging app out there. Then, we we're talking about traveling solo abroad and we realized that it's kind of difficult to meet new people to hang out with when you're shy. This is how we came with this idea.

## What it does
Travelers is a little minimalist social network for travelers that want to link up with other travelers. The user first sign in, then he/she will get a list of other travelers that are nearby, he will then be able to chat with them or look them up on the map (will be eventually changed to a heatmap / radius for privacy purpose) and that's it. 

## How we built it
We were a team of 4 so we decided to have 2 persons working on the backend using Nodejs and 2 persons on the frontend using Vue. Even though we separated the task, we were constantly helping each other. For the backend, we created an api with Nodejs and MongoDB, then we implemented Socket.io for our real time chat. Vue was kind of a learning curve for two members of our team, but we still managed to pull it off.

## Challenges I ran into
One of our big challenge was implementing the real time chat with Socket.io. Since we where saving every message in our database, we needed create a model that would contain messages in a conversation in order to get the chat history.

## Accomplishments that I'm proud of
This was our first hackathon, nobody expected anything from this. We just wanted this to be a learning experience by getting out of our comfort zone. We also wanted to create a project to add content to our Github as many of us are looking an internship in software development. 

We're also very proud as a team to accomplish a project after working on it for many hours nonstop. 

## What we learned
We learned how to create a messaging app using Socket.io 
What's most important is that we learned how to work as a team. We needed to communicate clearly and work efficiently. Nonetheless, this was a very fun and learning experience.

## What's next for Travelers
After the hackathon, we want to refactor our code in order to use the best practices. We also want to improve our usage of the map since we don't want everyone to know where your location is. 

We will eventually add more feature without adding too much.
