# Redis Websockets Scaling (chatrooms)

Learning how to scale Websockets is quite fun. This project currently only supports `two Websocket servers` launched thru `docker-compose.yml`, but it is possible to adapt it to connect to a Load Balancer (ie: created with Kubernetes in Kubectl w/ Minikube) and spawn an infinite amount of servers. That is, if you have enough $$$ and hardware to host them 🐧🐧🐧🐧.

# Running
1. `docker-compose build && docker-compose up`: This launches Redis & the two Websocket servers
2. `cd ./front-end && npm i && npm start`: This will open up the React front end in your browser. Here you will be able to select between Websocket servers 1 and 2

Note: It is possible to change your name / chatroom altogether, but you will have to comment a few lines in `./front-end/src/App.js`. For faster testing, I have disabled this feature.

# Additional remarks

Yes, I did write a single freaking monolith in the back end code by placing everything in `index.js`. I won't bother splitting a 100-lines code, it's more time efficient this way.

However, when a Fortune 500 magnate will acquire this marvelous project I might reconsider this decision.