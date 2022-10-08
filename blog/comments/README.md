

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

update route in event-bus and rebuild event-bus from the directory:

    docker build -t josephiusx/event-bus . 

    push:
        docker push josephiusx/event-bus

restart deployment:

    k rollout restart deployment event-bus-depl

check that pods are updated:

    k get pods

test in postman. inpute node new nodeport in the url after posts

    get node port. In k8s :
        kubectl get services

check logs in event bus

    get id in event-bus:
        k get pods

    kubectl logs <pod-id>
    k logs comments-depl-55775c58c-ml25d