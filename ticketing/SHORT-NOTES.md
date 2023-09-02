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
