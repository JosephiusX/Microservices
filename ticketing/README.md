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