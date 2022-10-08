

steps for adding more services

# for 'comments'

Update urls:

    -in index.js replace "localhost" with "event-bus-srv"

Build images in comments dir:

    docker build -t josephiusx/comments .
    docker push josephiusx/comments


create deployment + cluster service:

    in k8s dir:
        comments-depl.yaml
            fill out the config file

    in k8s dir: 
        kubectl apply -f . to apply all files in dir

update event bus to:

test our work:

    kubectl get pods
    k get deployments
    k get services

update route in event bus

