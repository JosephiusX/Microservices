steps for adding more services

# for 'query'

Update urls:

    -in index.js replace "localhost" with "event-bus-srv"

Build images in query dir:

    docker build -t josephiusx/query .
    docker push josephiusx/query


create deployment + cluster service:

    in k8s dir:
        query-depl.yaml
            fill out the config file

update event bus to:

    kubectl apply -f . to apply all files in dir
