in k8s apply the config file:

    kubectl apply -f posts-depl.yaml

in posts build posts:

    docker build -t josephiusx/posts .

in posts push to docker hub:

    docker push josephiusx/posts

in posts rollout new deployment:

    kubectl rollout restart deployment posts-depl

test my work:

    kubectl get deployments
    kubectl get pods