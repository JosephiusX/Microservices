steps for adding more services

# for 'moderation'

Update urls:

    -in index.js replace "localhost" with "event-bus-srv"

Build images in moderation dir and push:

    docker build -t josephiusx/moderation .
    docker push josephiusx/moderation

create deployment + cluster service:

    in k8s dir:
        moderation-depl.yaml
            fill out the config file



update event bus to:

    kubectl apply -f . to apply all files in dir