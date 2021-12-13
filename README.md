# Foodstagram

Web platform that features DevOps to help users find what foods they like!

## Installation

1. Clone repo using `git clone https://github.com/hen-chen/Mini-Steam.git`
2. CD to the appropiate repository.
3. Make sure you have [docker](https://docs.docker.com/get-docker/) installed.

## Local Deployment

To run the web app locally, follow these commands:

1. Run `docker build -t [name] .`, where `[name]` is the name of the image.
2. Run `docker run --name [otherName] -p 3000:3000 [name]`
3. Go to [localhost:3000](localhost:3000) to view the app!

## Remote Deployment

To run the web app remotely, follow these commands:

1. Run `docker build -t [name] .`, where `[name]` is the name of the image.
2. Run `kubectl delete all --all` (if you made changes)
3. Run `kubectl apply -f k8s/`
4. Go to [henchen.cis188.org](https://henchen.cis188.org) to view the app!
