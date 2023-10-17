
111. Auth Service Setup

        mkdir ticketing
        cd ticketing
        mkdir auth
        cd auth
        npm init -y
        npm install typescript ts-node-dev express @types/express
        tsc --init
        mkdir src
        touch src/index.ts
after setting up basic express logic

        setup package.json start command:
                "start": "ts-node-dev src/index.ts"
                        npm start(test in auth)

112. Auth K8s Setup

In auth dir

        touch Dockerfile
                fill out the config
        mkdir .dockerignore
        code .dockerignore
                input node_modules to be ignored
after closing down the open terminal process in auth

        docker build -t josephiusx/auth .

in ticketing dir

        mkdir infra
        cd infra
        mkdir k8s
        cd k8s
        touch auth-depl.yaml
fil out the config

113. Adding Skaffold

In Ticketing:

        touch skaffold.yaml
fill out config 

to test in ticketing dir:

        skaffold dev
now we should be able to see changes made to index.ts in the console.

Note on code reloading

        if I did not see my server restart after changing the file do the following:

         update auth package.json start script to:
                ts-node-dev --poll src/index.ts

115. Ingress v1 API Required Update
116. Ingress-Nginx Setup

https://kubernetes.github.io/ingress-nginx/deploy/

        checkout the quickstart installation 


This might be the step im missing

117. Hosts File and Security Warning

In an admin terminal 

        /c/WINDOWS/System32/Drivers/etc code hosts
fill out info. 

issues with this lesson also clue me that Ingress-Nginx Setup may be required. 

# sec6 Leveraging a cloud environment for development

118. Note on Remote Development

The optional nature of dev environment via cloud is explained as nessessary likely for older versions of windows that might crash later on in the development proccess. According to this I should be able to skip this section for now. 

# sec7 Response Normalization Strategies
130. Creating Route Handlers

in auth/src/

        mkdir routes
        cd routes
        touch signin.ts signout.ts signup.ts current-user.ts

131. Scaffolding Routes
132. Adding Validation

133. Handling Validation Errors

this is a good lesson to see how validation process is working before we refactor. 

134. Postman HTTPS Issues

                        Hi!

        Got an error when testing the route handler in the last video? If so, do the following:

        Open the Postman preferences. On MacOS, the hot key for this is CMD + ,

        Find the setting called ‘SSL certificate verification’

        Change this setting to ‘off’, as shown in the screenshot below

135. Surprising Complexity Around Errors

We need our data structures for handleing errors to have the same structures.

136. Other Sources of Errors
There are also senarios other than express validator that require consistant inputs in this way.

137. Solution for Error Handling
138. Building an Error Handling Middleware

in src

        mkdir middlewares
        cd middlewares
        touch error-handler.ts

needed to reset skaffold before successful testing of this. 

139. Communicating More Info to the Error Handler
140. Encoding More Information In an Error

Sign we need a subclass

        Any time we want something like x but want to add in special properties 

141. Subclassing for Custom Errors

in src
144. Converting Errors to Responses

        mkdir errors
        cd errors
        touch request-validation-error.ts

142. Determining Error Type
143. Property 'param' does not exist on type 'AlternativeValidationError'

        havent got this yet

144. Converting Errors to Responses

Common response structure:

        {
                errors: {
                        message: string, field?: string
                }[]
        }

getting error refered to in 143.

145. Moving Logic Into Errors
146.  serializeErrors' not assignable to the same property in base type 'CustomError'

147. Verifying Our Custom Errors
148. Final Error Related Code

in errors dir

        touch custom-error.ts

149. How to Define New Custom Errors

in errors dir

        touch not-found.ts

150. Uh Oh... Async Error Handling

To make sure we listen whenever express throws an async error:

        within auth
                npm install express-async-errors --save

Database Management and Modeling

151. Creating Databases in Kubernetes

in auth

        npm i mongoose

in k8s

        touch auth-mongo-depl.yaml
                fill out

may have to reset skaffold

to test in auth

        kubectl get pods
                we should see 2 pods: auth-depl-.., and auth-mongo-depl-...

152. Connecting to MongoDB

        if we delete or restart the pod running MongoDB, we will lose all of the data in it

        we will talk about that more later and will introduce a fix.

in auth 

        npm i @types/mongoose

153. Understanding the Signup Flow
154. Getting TypeScript and Mongoose to Cooperate
155. Creating the User Model

in auth/src

        mkdir models
        cd models
        touch user.ts
                input mongo logic

right now ts and mongodb aren't working together. any data or type can be input without being registered via ts

156. Type Checking User Properties
158. Defining Extra Document Properties
159. Whats That Angle Bracket For?

they provide types to functions as arguments. they allow us to customize the types in classes and objects as well. 

160. User Creation

We now have a fully functioning user model. Now we want to get started with our signup process. 

161. Proper Error Handling

in errors dir

        touch bad-request-error.ts

162. Note on Password Hashing
Recomends skipping next 4 lessons to save time if im familiar with hashing. 

163. Reminder on Password Hashing

when the user creates a password it is converted into a token unique to the password but can only be decoded back to the password with the proper key. This way , on the we only have access to the hash representation keeping actual passwords safe in case of a db breach.

164. Adding Password Hashing

in auth/src

        mkdir services
        cd services
        touch password.ts

static methods can be used outside a class or class instance

165. Comparing Hashed Password
166. Mongoose Pre-Save Hooks

when I signup a new user in postman i get the hashed password as expected.

# sec9 Authentication Strategies and Options

167. Fundamental Authentication Strategies

Authentication with microservices is a challange. Because theres no one easy way we are going to explore some of the different solutions for this.

Option 1:

        allow individual services to relie on a central authentication service
                * nore convient to build but if that auth service that everything else depends on goes down it's a bad day. 

Option 2:  

        each individual service decides weather the user is authenticated
                * no outside dependancy but, a lot of reusing of logic(we overcome this). 
These are fundimental options with variations of each.

168. Huge Issues with Authentication Strategies

Option 2s main pitfall is that it requires web tokens which aren't as secure

169. So Which Option?

We are going with option #2 to emphasize the idea of independent services

170. Solving Issues with Option #2 (optional)

we could solve the issue with tokens partially with expiration time spans
We can plug the rest of the hole by having all the services communicated to by an event buss connecting them to a central auth service. This way the auth service can have a temporary list that overrides the tokens for their duration. 

171. Reminder on Cookies vs JWT's

Cookies: Transport mechanism, Moves any kind of data between browser and server, Automatically managed by the browser.

        arbitrary information stored in the browser from a server response. (Response Headers Set-Cookie)

        every request the server makes to that browser subsiquently can see that cookie. (Request, Headers, Cookie)

JWT's: Authentication/Authorization mechanism, Stores any data, managed manually.

        the payload(arbitrary information) is then Tokenized into a representation of the infomation. The JWT can be decoded back into the original object. 

        there are a few ways the information gets used:

                Request
                        Headers
                Authorization: MY JWT

                Request
                        Body
                token: MY JWT

                Request
                        Headers
                Cookie: MY JWT

172. Microservices Auth Requirements
173. Issues with JWT's and Server Side Rendering

Giant Issue! The first request cannot be customized in any way. Has something to do with why we are using a JWT stored inside a cookie.

174. Cookies and Encryption

in auth

        npm install cookie-session @types/cookie-session

        import into index.ts

176. Generating a JWT

in auth

        npm install jsonwebtoken @types/jsonwebtoken

177. JWT Signing Keys

https://www.base64decode.org/

        a tool to decode our cookie into the object containing our jwt

https://jwt.io/

        we can us this to extract the information from the jwt 

178. Securely Storing Secrets with Kubernetes
179. Creating and Accessing Secrets


        kubectl create secret generic jwt-secret --from-literal=jwt=asdf

                this is an example of a imparative approach as opposed to using configuration files. We don't want any information stored with this security related info

Command we are using for now in ticketing:

        kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

see list of secrets

        kubectl get secrets

TEST: 

        in my auth dpl change the jwt seceret ref name to something random instead of what we previously set. 

        skaffold returns an error about a not found string

in ticketing 

        kubectl get pods

Next I can get more info about a pod in question

        kubectl describe pod <pod-id>

180. Accessing Env Variables in a Pod
181. Common Response Properties

Auth is setup in a way where the informatin is included in the response that is good for development feedback but bad for production.

Moving forward we also want to do some formatting of mongo db response conventions as we may want to use other databases.

182. Formatting JSON Properties

We can override how javascript turns json into a ovject

183. The Signin Flow
183. The Signin Flow

in middlewares

        touch validate-request.ts

184. Common Request Validation Middleware

we are going to be using this middleware in many places in the future.

185. Sign In Logic
186. Quick Sign In Test

        POST https://ticketing.dev/api/users/signup
        body:
        {
                "email": "test@test.com",
                "password": "password"
        }

        Response:
                {
                "email": "test@test.com",
                "id": "64ce2b15871042a34b64d3e2"
                }

next try to signin with the same creds. It should show me the same email and id as generated in sign up

we can also test:

        empty password
        valid incorrect password
        email that hasn't been signed up.
                all return "Invalid credentials"

187. Current User Handler


        does user have a req.session.jwt set ?
        If it is not set, or if the JWT is invalid, return early
        If yes, and JWT is valid, send back the info stored inside the JWT (the payload)

188. Returning the Current User

current-user.ts

Testing went swell!

189. Signing Out

Signout test passed

190. Creating a Current User Middleware

in middlewares

        touch current-user.ts

191. Augmenting Type Definitions
192. Requiring Auth for Route Access

In middlewares

        touch require-auth.ts

in errors

        touch not-authorized-error.ts

# SEC 10

193. Scope of Testing
194. Testing Goals
195. Testing Architecture
196. Index to App Refactor

in ticketing src directory

        touch app.ts

197. Replacing --only=prod Install Flag

198. A Few Dependencies

        npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server

199. Required MongoMemoryServer Updates

200. Test Environment Setup
        
        ??? why all the errors on setup.ts

201. Our First Test

to run the test we created, in auth:

        npm run test
202. An Important Note
207. Testing Sign Out
208. Issues with Cookies During Testing

        understanding the issue testing current user is usefull for problems we are likely to encounter.

209. Easy Auth Solution

213. Starting the React App
214. Reminder on Server Side Rendering

explains why we are using server side rendering

215. Suggestion Regarding a Default Export Warning

216. Basics of Next JS

in ticketing dir

        mkdir client
        cd client
        npm init -y
        npm i react react-dom next
        mkdir pages
In the past I have used react router to define the routes of my page. wit next.js however the routes will be defined by the file structure we create. 

        cd pages
        touch index.js

217. Building a Next Image

in client 

        touch Dockerfile .dockerignore

to test build, in client directory

        docker build -t josephiusx/client .

218. Running Next in Kubernetes

        docker push josephiusx/client

in k8s dir

        touch client-depl.yaml

dont forget to bypass chrome error if encountered:

        thisisunsafe

219. Small Update for Custom Webpack Config

218. Running Next in Kubernetes

in client

        touch next.config.js

220. Note on File Change Detection

222. Adding a Sign Up Form

By defining an auth folder with a signup.js file in side of it in the context of next.js that creates an auth/signup route.

222. Adding a Sign Up Form

223. Handling Email and Password Inputs

223. Handling Email and Password Inputs

in client

        npm i axios

224. Successful Account Signup

Now when I sign up with a test email and password I can see my object in the console. I can also find a cookie I created on the network tab under sign up. after clicking on signup I select the header tag and can scroll to find the cookie. 

225. Handling Validation Errors

226. The useRequest Hook

228. An onSuccess Callback

Now Im getting redirected to landing page when signup is entered correctly.

229. Overview on Server Side Rendering

230. A note about ECONNREFUSED errors

231. Fetching Data During SSR

232. Why the Error?

Explained diagram of how our project is working thus far. It also explains an error caused by the client seeking port 80 in the wrong context. 

233. Two Possible Solutions
" "
234. Cross Namespace Service Communication

in the client kubernetties pod we are trying to access Ingress Nginx on localhost:80. The problem is that the client pod has a different context. localhost in client isin't the same as the Ingress Nginx localhost location.

in ticketing get the client     

        kubectl get namespace

get services from default namespace

        kubectl get services

get the service from a spicific namespace

        kubectl get services -n ingress-nginx

                ingress-nginx-controller

So the route from inside client to localhost:80 on my pc is:

        http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

Or we could use a external name service to simplify though we wont as it would complicate the course objectives. 

235. When is GetInitialProps Called?

236. On the Server or the Browser

238. Specifying the Host

240. A Reusable API Client

241. Content on the Landing Page

242. The Sign In Form

243. A Reusable Header

244. Moving GetInitialProps

245. Issues with Custom App GetInitialProps

246. Handling Multiple GetInitialProps

247. Passing Props Through

248. Error: Invalid <Link> with <a> child

249. Building the Header

250. Conditionally Showing Links

251. Signing Out

AUTH IS SETUP

252. React App Catchup & Checkpoint

# Sec 12 : Code Sharing and reuse between Services

253. Shared Logic Between Services

255. NPM Organizations

256. Publishing NPM Modules

257. Project Setup

259. An Easy Publish Command

260. Relocating Shared Code

        npm install express express-validator cookie-session jsonwebtoken @types/cookie-session @types/express @types/jsonwebtoken


  * for some reason the pub command is failing to actually publish so Im doing it manually

261. Updating Import Statements

262. Updating the Common Module

Fixed problem on 260 by updating the clean script:

        "clean": "del-cli ./build/*"

# Sec 13 Create-Read-Update-Destory Server Setup

263. Ticketing Service Overview

Routes

/api/tickets 

        GET body:"" goal: Retrieve all tickets

/api/tickets/:id GET  

        body:"" goal: retreve ticket with specific ID

/api/tickets

        POST body: {title: string, price:string} goal: Create a ticket

/api/tickets 

        PUT { title: string, price: string } goal: Update a ticket

PROJECT OVERVIEW:

        npm init -y
        Write dockerfile
        Create index.ts to run project
        Build image, push to docker hub
        Write k8s file for deploymenmt, service
        Update skaffold.yaml to do file sync for tickets
        Write k8s file for Mongodb deployment, service

264. Project Setup

in root dir

        mkdir tickets
inside tickets we copie files from auth to get a head start:

        .dockerignore
        Dockerfile
        package-lock.json
        package.json
        tsconfig.json

still in tickets

        mkdir src

from auth/src copy into ticketing/src:

        /test
        app.ts
        index.ts

change the name in tickets package.json from auth to tickets

        npm install

Building docker image. (inside tickets)

        docker build -t josephiusx/tickets .

push image

        docker push josephiusx/tickets

265. Running the Ticket Service

in our infra directory 

266. Mongo Connection URI

267. Quick Auth Update
 
        Repeat process of previous lesson with auth instead. 

268. Test-First Approach
269. Creating the Router
270. Adding Auth Protection

        Landing page has appeared
        client tickets and auth are logging 
        tests are working

273. Building a Session

        tests passing

274. Testing Request Validation


275. Validating Title and Price

276. Reminder on Mongoose with TypeScript

277. Defining the Ticket Model

278. Creation via Route Handler

279. Testing Show Routes

one failed test expected by the end of this one. 

280. Unexpected Failure!

281. What's that Error?!

282. Better Error Logging

We made a change to our common module. to update that change we need to rebuild and republish the common module

        stop tests
        navigate to common directory
        npm run pub
        navigate to tickets dir
        npm update @jqgtickets/common

now we are able to better understand errors  that we dont yet have a custom error build for a given situation.

282. Better Error Logging

283. Complete Index Route Implementation
284. Ticket Updating
285. Handling Updates

286. Permission Checking

        update.test.ts
        setup.ts
        update.ts

287. Final Update Changes

288. Manual Testing

Now that everything is complete, the course tests it out manually with postman. To do this we have to update our ingress-srv.yaml file

MANUAL TESTING

Sign In or up Test:

        POST https://ticketing.dev/api/users/signin 
        on Body select raw > JSON
        input:
                {"email": "test@test.com", "password": "password"}
In another tab test:

        GET https:ticketing.dev/api/users/currentuser

Should result in a response body "currentUser" with an id , email and iat

Create Ticket Manual Test:

        POST https://ticketing.dev.api/tickets
        in headers
                Content-Type application/json
        in Body params
                raw > JSON
                        title: concert
                        price: 10
Should result in a response with a title , price , userId , __v, and id

I Can test It was saved using a GET request and the id from the step before like so.

        GET https://ticketing.dev/api/tickets/<id from previous step>
                for a given ticket
or without an id to get all the tickets. 

Update Manual Test:

        PUT https://ticketing.dev/api/tickets/< id of ticket to be updated>
        we can update the title and the price in the body with a json object.

should recieve a confirmation response

# Sec 14

289. What Now?

290. NATS ALTERNATIVES.

        - RabbitMQ
        - Kafka
        - ...

About why we are using nats for the context of this course, why.

Also metions other more professionally viable 


291. Three Important Items

High level Notes (Overview)

There is NATS and NATS STREAMING SERVER. In the context of this course NATS will refer to the streamimg server option. We will always be using NATS STREAMING SERVICE. Never strictly NATS.



292. Creating a NATS Streaming Deployment

        https://hub.docker.com/_/nats-streaming

start by writing out a depl file in our k8s dir.

learning about configure custom command line options.

293. Big Notes on NATS Streaming

        https://www.npmjs.com/package/node-nats-streaming

High level on how nats streaming server differes from our original event buss implementation. 

294. Building a NATS Test Project

SHORT TERM GOAL

        Create new sub-project with typescript support.

        Install node-nats-streaming library and connect to nats streaming server

        One npm script to run code and emit events , and one to run code to listen for events

        This program will be ran outside of kubernetes!

In ticketing dir

        mkdir nats-test
        cd nats-test
        npm init -y
        npm install node-nats-streaming ts-node-dev typescript @types/node
        mkdir src
        touch src/publisher.ts
        touch src/listener.ts
Add scripts to run each

        tsc --init
        
295. Port-Forwarding with Kubectl

At this point we get an error when we run npm publish we get an error. this is expected. This part of the project is outside of Ingress-Nginx.

2 options towards a solution are discussed

in nats-test

        kubectl get pods
                gets names of running pods

        kubectl port-forward <nats depl pod name> <Port#1><Port#s2>     
                Port#1 : Port on my local machine
                Port#1 : Port on the pod that im trying to access. 

        Course Example:
                kubectl port-forward nats-depl-79476d5b95-sglgl  4222:4222
This is however a very temporary solution. 


leave that running and in another terminal window in nats-test

        npm run publish

296. Publishing Events
working

297. Small Required Command Change

update scripts in nats-test

298. Listening For Data

299. Accessing Event Data
