https://hub.docker.com/search?q=node

once Dockerfile is setup along with index.js

    docker build .

    tag it: 
        docker build -t josephius/simpleweb . 

    run it:
        docker run josephius/simpleweb

run with port mapping: stop running container first
    
    docker run -p 8080:8080 josephius/simpleweb
        (ports dont need to be identical)

run with shell so we can do some debugging

    docker run -it josephius/simpleweb sh

we can insert shell into running instance if we have id

    docker exec -it 5700239458 sh

If we want to make changes to the code, we need top rebuild after to translate changes.
