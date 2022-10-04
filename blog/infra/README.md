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

delete our post.yaml file because thats not how weyre actually going to startup pods. Replace it with a post-depl.yaml (deployment).

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

we remove the version number from the post-depl.yaml now it defaults to the latest if we build the file.

    rebuild the posts image in the posts directory:
        docker build -t josephius/posts .

    in the k8s dir we run the yaml file again:
        kubectl apply -f posts.yaml

    back in my posts terminal:
        docker push josephius/posts