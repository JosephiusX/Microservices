# 69. Creating a pod (using config file)

in blog

    mkdir infra
    cd infra
    mkdir k8s
    cd k8s
    touch post.yaml

configure the yaml file with approipriuate indentation along with the image we want to use:

    apiVersion: v1
    kind: Pod
    metadata:
      name: posts
    spec:
    containers:
      - name: posts
        image: josephius/posts:0.0.1

in k8s dir:

creating a pod via config file:

    kubectl apply -f posts.yaml

to see running pods:

    kubectl get pods

open shell inside container inside pod:

    kubectl exec -it posts sh
        exit : to exit sh

get logs out of a pod:
    
    kubectl logs posts

print out ingormation about the pod:

    kubectl logs posts

delete pod manually:
    
    kubectl delete pod posts

get information about the running pod

    kubectl describe pod posts

setting up aliases for kubernetties

    alias dps="docker ps"
    alias k="kubectl"
    