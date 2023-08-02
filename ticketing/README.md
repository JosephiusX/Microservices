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

116. Ingress-Nginx Setup

https://kubernetes.github.io/ingress-nginx/deploy/

        checkout the quickstart installation 

This might be the step im missing

117. Hosts File and Security Warning

In an admin terminal 

        /c/WINDOWS/System32/Drivers/etc code hosts
fill out info. 

issues with this lesson also clue me that Ingress-Nginx Setup may be required. 