---
description: "Zero-Downtime during the Black Friday"
pubDate: "Nov 24, 2023"
heroImage: "https://images.prismic.io/syntia/17db0669-0455-46aa-a91e-a309d3a75156_yoga-kubernetes.jpg?auto=compress,format"
author: "Syntia"
categories: "workshops, cloud infrastructure, networking, kubernetes"
subcategories: "communication protocols, transmission control protocol, internet protocol, network layer, network interface, virtual network"
---

I was inspired to document this workshop by entrepreneur and yoga master Karin
Dimitrova, one of many business owners overwhelmed by Black Friday sales and the
capacity of maintaining her business while watching the market taken by the
storm.

The Black Friday marks the start of the holiday shopping sales between 23rd and
29th of November. The customers in online purchases spent a record $9.12 billion
on Black Friday last year, up 2.3% compared with 2021.

Higher prices have also resulted in consumers changing how they pay. Buy now,
pay later (BNPL) orders have increased 78% on Black Friday when compared with
the previous week (Nov. 19-Nov. 25), according to
[Adobe](https://www.digitalcommerce360.com/article/black-friday-ecommerce-sales/).

With the expectation of having the most prominent revenue during the sales,
Zero-downtime can be accomplished with Kubernetes Deployments.

In situations where the application is interrupted or in the worst scenario
experiencing downtime, Kubernetes is responsible for restoring containerised
applications before any visible impact to the customer experience.

Scaling the Service in Kubernetes load-balances the traffic only to available
instances (Pods) during the updates and has the most important role to ensure
the application’s availability.

In this first part of the workshop you will learn how to manage application
deployments with Kubernetes and set up your local testing environment.

## What is Kubernetes?

Open source container orchestration tool developed by Google. It helps manage
containerized applications, e.g. Docker containers in different environments,
e.g. physical, virtual machines, cloud, hybrid deployment environments.

### What problems does Kubernetes solve?

The container orchestration tool- rise from Monolith to Microservices which lead
to deployments of small independent applications. The need for a container
orchestration tool for managing thousands of containers across multiple
environments. What features does orchestration tools offer? High availability
with no downtime, scalability with high performance- high response rates, and
mechanism for disaster recovery- backup the latest application state and restore
it.

## Main Kubernetes Components

In Kubernetes, a worker node is a server, physical or a virtual machine. Pod is
an abstraction of the container- a Kubernetes layer to the container to manage
container runtime. Pod is usually meant to run one application container inside,
unless it is a helper or side service running in the same pod. Kubernetes offers
a virtual network where each Pod has an assigned internal IP address. Pods can
communicate with each other using its IP addresses.

In example of the Application with database- application container can
communicate to a database using a Pods IP address. Pod components in Kubernetes
are ephemeral- it can die frequently. The database container can be lost,
because an application crashed in the container, or because the server ran out
of resources, and the new pod will be recreated in its place and a new IP
address will be assigned.

Service is a permanent IP address with DNS address name that can be attached to
each pod. The application and the database will have its own service. The
lifecycle of Pod and Service isn’t connected, when the container dies- the
service endpoint stays the same. The service acts as a load balancer- it catches
the requests and forwards it to the pod.

For the application to be accessible in the browser the external service is
created, which opens communication from external sources. The internal services
are created to the pods for the database not to have public access, and ingress
which is responsible for routing the traffic to the Kubernetes cluster and
manages the domain and port forwarding to the external service address.

Pods communicate with each other using services, e.g. application will have an
endpoint called mongo-db-service to communicate to the database. If the
application name is different, then the url would have to be adjusted in
application- rebuild, pull and push a new image to the pod.

Configmap manages external configuration to your application. It contains
configuration data like URLs of databases, or other services. In Kubernetes,
Configmap is connected to a pod, and for accessing the configuration data the
rebuild of images isn’t required.

Part of external configuration of the database is username and password, which
may also change in the application deployment process. However placing it within
the configmap isn’t secure and for secret information such as credentials
Kubernetes has Component Secrets.

Secrets are passwords, certificates, credentials, and connected to the pod. The
secrets and configmap is accessible to the application from external file or
environment variables.

For data storage Kubernetes offers Volumes. Without volumes when the database
container or pod gets restarted, the data wouldn’t persist. Volumes attach the
physical storage on the hard drive to the pod. This storage can be on the local
machine on the server node where the pod is running, or the remote storage,
outside of the Kubernetes cluster, e.g. cloud storage or on premises.

Kubernetes cluster doesn’t manage any data persistence. Kubernetes administrator
is responsible for backing up data, replicating and managing it.

The advantage of containerized systems is the system availability with pod
replication. If the application dies or pod restarts the Kubernetes offers
replication of the server nodes where the clone of the application would run and
is connected to the service.

Creation of a second replica isn’t done with the pod creation but the blueprint
configuration which declares the replicas. In Kubernetes Pods are created by
Deployments, which is an abstraction of Pods.

Database pods cannot be replicated by Deployments, because the database has
state and its own data which are controlled by pods writing or reading the data
from it. This mechanism is offered by Kubernetes with a Stateful set for
Applications such as Elastic, MongoDB, MySQL. Stateful set takes care of the
replicating pods and scaling them similar to deployments.

Database applications are often hosted outside of the K8s cluster keeping only
stateless applications which are communicating with external databases.

## K8s Architecture

Kubernetes operates on two types of nodes- master and slave with roles it has
within a cluster.

### Worker node processes

The way Kubernetes manage and scale pods is through three processes that must be
installed on every node.

#### Basic setup of node with two application pods running

One of the main components of Kubernetes architecture are its worker servers or
worker nodes. Each node has multiple application pods with containers running on
each node.

#### Container runtime

The first process is container runtime, e.g. Docker or other technology, because
application pods are running in a container runtime. The process which schedules
containers is Kubelet. Kubelet Kubelet interacts with node and container runtime
both. It is responsible for starting a pod with the container and assigning
resources from the node to container. Kubernetes cluster is often made from
multiple nodes. The communication between them works with Services- load
balancer catches requests from a pod of application or database and forwards it
to another pod. The third process responsible for forwarding requests from
services to pods is Kube proxy- it is installed on every node.

#### Kube Proxy

Kube Proxy also makes sure the communication works the performant way with a low
network overhead. For example, if an application is making the request to the
database, the service will forward the request first to the replica that is
running on the same node as the pod which initiated the request.

#### How to interact with the cluster?

Do you decide on which node the application pod or the database pod will be
scheduled? If a replica pod dies, which process monitors it and then
re-schedules or re-starts it? If we add another server how does it join the
cluster to become another node with the other pods on it? All these managing
processes are done by master nodes. There are 4 processes run on every master
node. Master processes are crucial for the cluster operation.

### Master node processes

Kubernetes cluster is made up of multiple masters, where each master node runs
its master processes, where API server is load balanced and etcd store forms
distributed storage across all master nodes. Basic cluster setup of 2 master
nodes and 3 worker nodes The power and resources of Kubernetes cluster can be
easily increased based on the replication complexity and as its resource demand
increases. To add a new master/node server to the cluster the only requirements
are a new bare server with installed master and worker node processes.

#### API Server

First service is API Server. When the user wants to deploy a new application on
Kubernetes cluster, it interacts with API Server using Client, e.g. Kubelet or
Kubernetes API. API Server is a cluster gateway which gets the initial requests
of any updates into the cluster or queries from the cluster, and acts as a
gatekeeper for the authentication to make sure only authorized requests have an
entrypoint to the cluster.

#### Scheduler

Scheduler is the next process after the API Server validator which starts the
application pod on one of the worker nodes. It has information about the
resources on the worker node the application will need such as REM and GPU, and
based on the resource availability decide about the worker node on which the
next pod will be scheduled to. The process that starts the pod is Kubelet, when
it gets the request from the scheduler.

#### Controller manager

Controller manager detects the cluster state changes such as the crashing of
pods and tries to recover it as soon as possible. It makes the request to the
scheduler to reschedule the dead pods, and scheduler then decides which worker
nodes should restart the pods and makes a request on Kubelet.

#### Etcd store

Cluster brain etcd is a key value store of a cluster state. Every change on the
cluster gets updated on the key value store. It collects all information about
which resources are available on each worker node, cluster state change and
cluster health. Application data isn’t stored in etcd.

Etcd naming convention has originated from the Linux directory structure: In
UNIX, all system configuration files for a single system are contained in a
folder “/etc;” “d” stands for “distributed.”

# Minikube and Kubectl - Local Setup

In production cluster setup often is required at least two master nodes and
several worker nodes, and a separate virtual or physical machines that each
represent a node.

For testing the Kubernetes in a local environment, e.g. deploying a new
application, setup of a cluster might be impossible due to high requirements for
the resources.

### minicube

minicube open source tool provides one node cluster where the master and worker
processes run on one node with Docker container runtime preinstalled. It runs in
the Virtual Box or other hypervisor which can be used for testing Kubernetes in
local setup.

### kubectl

Kubectl is a command line tool to interact with any type of K8s cluster, such as
minicube or cloud cluster. While minicube runs both master and worker processes,
one of the master processes API Server is the main entrypoint to k8s cluster.
There are several ways to enable interaction with the cluster- UI, Kubernetes
API or CLI, and kubectl CLI is one of the most powerful of 3 Kubernetes clients.

## Local setup

Install Hypervisor such as VirtualBox
[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)
or hyperkit for Mac
[https://minikube.sigs.k8s.io/docs/drivers/hyperkit/](https://minikube.sigs.k8s.io/docs/drivers/hyperkit/)
Install Minikube (Mac, Linux and Windows)
[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
Install Kubectl
[https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)

### Start minikube

The following command configures one node cluster “minikube” and “default”
namespace by default. If you’re using another hypervisor than Virtual Box select
a different driver option:

```sh
minikube start –driver=virtualbox --no-vtx-check

# Test the commands: 
minikube kubectl -- get pods -A
kubectl version --client --output=yaml
kubectl get pod
kubectl get services
kubectl get nodes
```

## Main Kubectl Commands - k8s CLI

Find the available k8s create resources commands:

```sh
kubectl create -h
```

### Create Deployment

Create nginx k8s deployment with following command:

```sh
# kubectl create deployment NAME –image=image
kubectl create deployment nginx-depl --image=nginx
```

The deployment is a blueprint for creating pods. The most basic configuration
for the deployment is the name and image to use, and k8s defaults, for instance
replicas of the pod: kubectl get replicaset

### Abstraction of an abstraction

Deployment manages ReplicaSet. ReplicaSet manages Replicas of Pod, and Pod is an
abstraction of Container.

### Edit Deployment blueprint

Edit Deployment configuration via kubectl CLI with following command:

```sh
# kubectl edit deployment NAME
kubectl edit deployment nginx-depl
```

Now you are able to edit auto-generated configuration with default values. For
the exercise edit the nginx image version to the fixed version. The image
versions are available on Dockerhub. Select the version with the least amount of
vulnerabilities. Edit the file and save it either with command mode :wq or the
editor.
[https://hub.docker.com/\_/nginx/tags?page=1](https://hub.docker.com/_/nginx/tags?page=1)

It will look similar to this configuration:

```yaml
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "1"
  creationTimestamp: "2023-11-24T22:04:14Z"
  generation: 1
  labels:
    app: nginx-depl
  name: nginx-depl
  namespace: default
  resourceVersion: "980"
  uid: 37234dfe-47a5-4d8c-903c-44a67b957149
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: nginx-depl
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx-depl
    spec:
      containers:
      - image: nginx:1.25
        imagePullPolicy: Always
        name: nginx
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
status:
  availableReplicas: 1
  conditions:
  - lastTransitionTime: "2023-11-24T22:04:14Z"
    lastUpdateTime: "2023-11-24T22:06:46Z"
    message: ReplicaSet "nginx-depl-6777bffb6f" has successfully progressed.
    reason: NewReplicaSetAvailable
    status: "True"
    type: Progressing
  - lastTransitionTime: "2023-11-24T22:11:27Z"
    lastUpdateTime: "2023-11-24T22:11:27Z"
    message: Deployment has minimum availability.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  observedGeneration: 1
  readyReplicas: 1
  replicas: 1
  updatedReplicas: 1
```

Run the kubectl get deployment to see the newly created deployment, one which is
running and the old one terminating.

```sh
kubectl get deployment
# nginx-depl-549d9fb597-95lsl   0/1     Pending   0          1m12s
# nginx-depl-6777bffb6f-6fc95   1/1     Running   0          5m
```

Verify the newly created pod and replicaset:

```sh
kubectl get pod
# NAME                          READY   STATUS         RESTARTS      AGE
# nginx-depl-6777bffb6f-7hmls   1/1     Running        2 (75s ago)   6m

kubectl get replicaset
# NAME                    DESIRED   CURRENT   READY   AGE
# nginx-depl-549d9fb597   1         1         1       2m
# nginx-depl-6777bffb6f   0         0         0       6m
```

## Debugging pods

Kubectl logs command is useful to see what application running in the pod logs:

````sh
# kubectl logs POD_NAME
kubectl logs mongo-depl-558475c797-hz5ng
# Error from server (BadRequest): container "mongo" in pod "mongo-depl-558475c797-hz5ng" is waiting to start: ContainerCreating

If the container isn’t starting run another command describe for more detailed information about the pod:
```sh
# kubectl describe pod POD_NAME
kubectl describe pod nginx-depl-6777bffb6f-7hmls
````

Create another deployment with mongoDB to see the logs:

```sh
kubectl create deployment mongo-depl –image=mongo
kubectl describe pod mongo-depl-558475c797-jsh8g
```

From the events you will find more information about the Kubernetes scheduler
and help with debugging if application has any problems:

```sh
Conditions:
  Type              Status
  Initialized       True
  Ready             False
  ContainersReady   False
  PodScheduled      True
Volumes:
  kube-api-access-vbplb:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  82s                default-scheduler  Successfully assigned default/mongo-depl-558475c797-hz5ng to minikube
  Normal   Pulled     45s                kubelet            Successfully pulled image "mongo" in 1.628s (34.613s including waiting)
  Normal   Pulled     43s                kubelet            Successfully pulled image "mongo" in 1.352s (1.352s including waiting)
  Normal   Pulled     28s                kubelet            Successfully pulled image "mongo" in 1.404s (1.404s including waiting)
  Normal   Created    28s (x3 over 45s)  kubelet            Created container mongo
  Normal   Started    28s (x3 over 44s)  kubelet            Started container mongo
  Warning  BackOff    14s (x4 over 42s)  kubelet            Back-off restarting failed container mongo in pod mongo-depl-558475c797-hz5ng_default(bcb9b1e4-49eb-45d3-a501-3b743cc5efcb)
  Normal   Pulling    1s (x4 over 79s)   kubelet            Pulling image "mongo"
```

Another useful command for debugging pod by inspecting the container from CLI
interactive mode and executing commands:

```sh
kubectl exec -it POD_NAME – bin/bash
```

### Delete the Deployment

Deleting the deployment will delete the Pod along with its replicaSet and pod
configuration:

```sh
kubectl get deployments
# NAME         READY   UP-TO-DATE   AVAILABLE   AGE
# mongo-depl   0/1     1            0           5m
# nginx-depl   1/1     1            1           6m

# kubectl delete deployment NAME
kubectl delete deployment mongo-depl
# deployment.apps "mongo-depl" deleted
```

## Kubernetes Configuration files

Since there are so many configuration options, adding them from CLI is
impractical. The configuration for Kubernetes Components can be managed via
Kubernetes YAML files and apply command. Apply both creates and updates
Kubernetes configuration.

```sh
kubernetes apply -f nginx-deployment.yaml
```

The basic deployment configuration will look like:

```yaml
apiVersion: apps/v1
kind: Deployment # type of configuration
metadata:
  name: nginx-deployment # name of the deployment used for the Service
  labels:
    app: nginx
spec: # specification for deployment
  replicas: 2
  selector:
    matchLabels:
      app: nginx # Deployment connects all the config with an app name label
  template:
    metadata:
      labels:
        app: nginx # Pods access the label through the template
    spec: # specification for pod
      containers:
      - name: nginx 
        image: nginx:1.25 
        ports:
        - containerPort: 8080
```

Every Kubernetes configuration file has three parts: metadata of the Component
such as the application name. Specification contains configuration for the k8s
Component. Status is automatically generated by Kubernetes. It will always
compare what is actual and desired state. If the application states doesn’t
align, it will try to fix it based on Status information from etcd.

```sh
kubernetes apply -f nginx-service.yaml
```

```yaml
apiVersion: v1 # API versions are different for each k8s component
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx # Connects the Deployment label and its Pods
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

Format of the configuration files is YAML and has strict indentation rules, and
it usually is part of the infrastructure as code or a single project deployment
files.

### Labels and selectors

The connection between the k8s Components is established by the labels and
selectors. Metadata holds labels and specification holds selectors. In
specification of Service selector defines a connection between the service with
Deployment and its Pods.

### Service port

Every Service has a port where service is accessible at. If other services e.g.
DB service connects with the nginx service, it will happen on port 80. Every
Service needs to know to which Pod is should forward the request and at which
port the Pod is listening.

### Apply configuration files

```sh
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service.yaml
```

#### How to validate that the service has the correct information about Pods?

```sh
kubectl describe service nginx-service # Status information and endpoints
```

Endpoints contain IP addresses and ports of the Pods where the Service must
forward the request to. It must align with the Pods IP column.

```sh
kubectl get pod -o wide
```

Finally verify the deployment Status by updated configuration

```sh
kubectl get deployment nginx-deployment -o yaml
```

### Delete configuration files

```sh
kubectl delete deployment -f nginx-deployment.yaml
```

In the second part of the workshop I will show you in practice how to deploy two
applications with Kubernetes, where one will be a server communicating to
another Pod to access data from the database.
