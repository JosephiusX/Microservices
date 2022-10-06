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