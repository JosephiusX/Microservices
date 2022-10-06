configure the file in infra/k8s touch and configure "event-bus-depl"

    set version to latest

in k8s apply the config file:

    kubectl apply -f event-bus-depl.yaml

in event-bus build event-bus:

    docker build -t josephiusx/event-bus .

in event-bus push to docker hub:

    docker push josephiusx/event-bus

in event-bus rollout new deployment:

    kubectl rollout restart deployment event-bus-depl

test my work:

    kubectl get deployments
    kubectl get pods