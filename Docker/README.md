# Docker

start by downloading the desktop app and signing up for an account. 

    Getting started:
        https://www.docker.com/get-started/

    Docker Hub info: 
        https://hub.docker.com/

once downloaded and logged out, restart. If we open the desktop app and login, 

    to verify run : docker version

# CLI 

    docker --help : see commands

    docker run hello-world(image name)

Overriding default startup command command

    docker run busybox echo hi there
    
    docker run busybox ls : shows folders in container
    docker run hello-world ls

    docker run <image name> <default command override>

    docker ps : shows info about running containers 

    docker ps --help

    docker run = docker create + docker start

    docker ps --all
        shows containers and id's
restarting stopped containers:

    docker start -a 05b57c4b3522
        "-a"=(attach) like watch command flag is to see information printed out
removing stopped containers:
     
    docker system prune
        when not in use prune to free up disk space

stopping containers:

    docker stop <container id>
        prefered method

    docker kill <container id>
        emergency method


562. Multi Command Containers

lets startup redis instance on this machine

    docker run redis

Execute command in running  redis container

    docker exec -it <container id> <command>

purpoose of -it

    allows us to input info into the running process and allows us to retreve info to out terminal 

Execute command prompt within a container 

    docker exec -it <container id> sh

example:

    docker exec -it 4e3d15jf8wjk sh

Starting shell immidietly upon container spinup(with nothing else in it ?)

    docker run -it busybox sh

Tagging am image

    <my Docker ID> / <Repo/Project name > : <Version>

ex:

    docker build -t josephius/redis:latest .

