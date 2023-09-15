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