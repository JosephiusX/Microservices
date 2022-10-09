    - mkdir blog
    - cd blog
    - npx create-react-app client

open another terminal in blog

    - mkdir posts
    - cd posts
    - npm init -y
    - npm install express cors axios nodemon

open 3rd terminal window in blog

    - mkdir comments 
    - npm init -yP
    - npm install axios cors express nodemon

open a shell into each :

    client, posts, comments

setup express app for commemts

setup express app for posts

setting up react app(from the create react app earlier)

    - cd client
    - npm install axios
    - erase everything in source
    - cd src
    - touch index.js
    - touch App.js
    - npm start
    
create PostCreate component

install cors in comments and posts for setting header

# steps for adding more services

    
update urls:

    in query/index.js change "localhost" to "event-bus-srv"


build images:


create deployment + cluster service: 


update event bus to: 

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

# 69. Creating a pod (using config file)

    apiVersion: v1
    kind: Pod
    metadata:
      name: posts
    spec:
    containers:
      - name: posts
        image: josephius/posts:0.0.1

# 78 Preferred method for Updating Deployments

The deployment must be using the latest tag in the pod spec section

Make an update to the code

Build the image

Push the image to docker hub

Run the command:

    kubecti rollout restart deployment <depl_name>

# 88. Adding Query, Moderation and comments

# 90 Load ballancer server

load Ballancer Service:
    Gets traffic in single pod

Ingress or Ingress Controller:
    A pod with a set of routing rules to distribute traffic to other services

make sure we have documentation for ingress nginx NOT nginx ingress

main docs: 
    https://kubernetes.github.io/ingress-nginx/

deployment docs:
    https://kubernetes.github.io/ingress-nginx/deploy/

follow instructions based on my os

# 95. writing ingress config files

    in k8s touch:
        ingress-srv.yaml

        apiVersion: networking.k8s.io/v1

        kind: Ingress
        metadata:
        name: ingress-srv
        annotations:
            kubernetes.io/ingress.class: nginx
        spec:
        rules:
            - host: posts.com
            http:
                paths:
                - path: /posts
                    pathType: Prefix
                    backend:
                    service:
                        name: posts-clusterip-srv
                        port:
                        number: 4000

    apply changes:
        kubectl apply apply -f ingress-srv.yaml

# 97. Hosts File Tweak

open my ect/hosts file

    navigate to:
        C:\Windows\System32\Drivers\etc\hosts

        add and associate ip and associate with posts like so:

            127.0.0.1 posts.com