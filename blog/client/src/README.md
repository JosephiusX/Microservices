In all the component files in the src directory, change the port from localhost:400x to 'posts.com'

tag and rebuild docker image then push:

    docker build -t josephiusx/client .

    docker push josephiusx/client

in k8s build out client-depl.yaml

    apply new file:
        kubectl apply -f client-depl.yaml