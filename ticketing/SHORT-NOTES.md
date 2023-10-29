116. Ingress-Nginx Setup

https://kubernetes.github.io/ingress-nginx/deploy/

        checkout the quickstart installation 

234. Cross Namespace Service Communication

in the client kubernetties pod we are trying to access Ingress Nginx on localhost:80. The problem is that the client pod has a different context. localhost in client isin't the same as the Ingress Nginx localhost location.

in ticketing get the client     

        kubectl get namespace

get services from default namespace

        kubectl get services

get the service from a spicific namespace

        kubectl get services -n ingress-nginx

                ingress-nginx-controller

So the route from inside client to localhost:80 on my pc is:

        http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

an tickets index.ts we need to 

        install mongoose as a dependancie.
        we will also need a unique mongo database requiring an update to the mongodb srv
        in app.ts we have a lot of references to routes that don't actually exist. 

265. Running the Ticket Service

We create in infra/k8s 

        tickets-depl.yaml

Next we update the skaffold.yaml file for file syncing.

Next we write out k8s file for Mongodb deployment, service. 

        we can copy the auth-mongo-deploy

in k8s

        touch tickets-mongo-depl.yaml

command for creating a secret key in ticketing for now

                kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf

can run tickets test in ticket:

        npm run test

ticketing url for dev

        https://ticketing.dev/

Port forwarding temporaraly

                kubectl get pods
                        gets names of running pods

        kubectl port-forward <nats depl pod name> 
                <Port#1><Port#s2>     
                        Port#1 : Port on my local machine
                        Port#2 : Port on the pod that im trying to access. 

        Course Example:
                kubectl port-forward nats-depl-6c55b9b8b9-84gnl 4222:4222

        run scripts for publisher and listener

        nats-test

kubectl port-forward nats-depl-79476d5b95-sglgl 8222:8222

CreateContainerConfigError

        jwt-secret --from-literal=JWT_KEY=asdf
