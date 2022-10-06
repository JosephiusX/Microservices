

# Deployment Commands

    list all the running deployments:
        kubectl get deployments
    
    list running pods:
        kubectl get pods

    delete pods:
        kubectl delete pod <pod_name>

as soon as we delete our pod another one starts up in its place with another id

    Delete a deployment:
        kubectl delete deployment <Depl_name>

Once we delete deployment, the pods go away 


# Cluster Ip

build an Image for the event bus:

    in event-bus dir:
        docker build -t josephiusx/event-bus .

Push the image to Docker Hub:

    in event-bus:
        docker push josephiusx/event-bus

Create a deployment for Event Bus:

    in infra/k8s touch:
        event-bus-depl.yaml
            we can copy contents from post.yaml file then replace instances of 'posts' with 'event-bus'

Create a cluster IP service for event-Bus and Posts:

    in k8s:
        kubectl apply -f event-bus-depl.yaml

    verify that it worked:
        kubectl get pods


we co-locate the config for event-bus-srv in event bus-depl.yaml 

    update event-bus-depl.yaml. In k8s:
        kubectl apply -f event-bus-depl.yaml

restart deployment:

    k rollout restart deployment event-bus-depl
