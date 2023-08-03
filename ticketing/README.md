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
        