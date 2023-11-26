# Kubernetes Advanced Concepts

So far we learned what Kubernetes is, why Black Friday Sales are succesful, and how to create and deploy basic Kubernetes Applications.
Kubernetes helps managing infrastructure and development for both large organizations or collaboration in smaller teams.
Accesing and managing several Kubernetes Applciations within a cluster is much more easier once you have learned about Kubernetes Components and architecture.
In this article you will learn more about managing Kubernetes clusters and scaling infrastructure with multiple Kubernetes Applications.

## K8s Namespaces - Organising Components

In the Kubernetes cluster it is possible to organize the resources in namespaces, having multiple namespaces similar to clusters inside the cluster.
By Default Kubernetes offers namespaces by default. The minikube cluster has four namespaces:

```sh
kubectl get namespaces
# NAME                   STATUS   AGE
# default                Active   11h - resources created are located here
# kube-node-lease        Active   11h - determines the availability of node
# kube-public            Active   11h - publicly accessible data, cluster information
# kube-system            Active   11h - system master process, e.g. kubectl cluster-info
# kubernetes-dashboard   Active   5h8m - specific to minikube
```
### Create a new namespace
```sh
kubectl create a namespace my-namespace # or use configuration files
```
### Why create new namespaces?
With only default namespaces all the resources from complex applications are containing multiple deployments and creating the pods with the resources that soon becomes difficult to manage them.
#### Observability
Namespaces are generally useful for monitoring resources in these groups. When the namespace has some dedicated CPU, RAM, storage, it becomes easier to distinguish between the Applications and arrange the limits with Resource Quotas in these resource groups.
#### Organizing team’s work
It allows having different resources per namespace, for example database or nginx-ingress.

Having a namespace per Application reduces risks of having the Deployment conflicts and limits the engineering teams from accidentally overwriting the existing deployment and interrupting the work.
The namespace also gives the teams only the team access- and no other teams will have access to update, create or delete the resources from the other team namespaces.
#### Resource sharing
Namespaces are good for resource sharing. When the staging and development environments are in the same cluster nginx-ingress controller or elastic stack for login can be deployed in one cluster and used for both environments.

Another use case is Blue/Green Deployment. When the cluster needs two versions of a production, one that is active and the following a.k.a pre-prod- these namespaces might reuse the common shared resources.
### Characteristics of namespace
The resources generally cannot be shared across namespaces, except for a Service. ConfigMap can reference Service that will be used eventually in a Pod. In configMap definition the service will also specify the namespace.
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service.database #service name followed by namespace
```
Some of the resources can’t be isolated, such as the volume and node. It is going to be accessible within the cluster. Find which other resources are not assigned to a namespace:
```sh
kubectl api-resources --namespaced=false
```
### How to assign the resources to a namespace?
```sh
kubectl apply -f configmap.yaml -n=my-namespace # or –namespace=my-namespace
```
Another way is include the namespace destination in configuration files:
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
  namespace: my-namespace
data:
  database_url: mongodb-service.database #service name followed by namespace
```
After assigning the resource to the namespace you won’t be able to find it in the default group.
```sh
kubectl get configmap # won’t find anything with -n=default
kubectl get configmap -n my-namespace #finds the resource in the namespace
```
### How to change the active (default) namespace?
CLI tool kubectx installs CLI extension kubens which can edit the active namespace.
```sh
kubens my-namespace
# context “minikube” modified
# active namespace is “my-namespace”
```
Now you can execute kubectl without adding the namespace to commands.
## K8s Ingress
Ingress is responsible for mapping the external service IP address to the domain name and secure protocol.
### External service configuration
```yaml
apiVersion: v1
kind: Service
metadata:
  name: mongo-express-service
spec:
  selector:
    app: mongo-express
  type: LoadBalancer  
  ports:
    - protocol: TCP
      port: 8081 # Service port
      targetPort: 8081 # Pod container port
      nodePort: 30000 # Open external IP address port
```
### Ingress configuration
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress
  labels:
    name: myingress
spec:
  rules:
  - host: <Host> # example.com, # map the domain name to Node’s IP address entrypoint. It would be an IP address of Node inside the cluster, or a configured server host outside the cluster.
    Http: 
      paths:
      - pathType: Prefix
        path: "/"
        backend: # forward request to the internal service
          service:
            name: <Service> # redirects to internal service, e.g. mongo-express-service
            port: 
              number: <Port> # Internal service port e.g. 8081
```
### How to configure ingress?
Ingress routing routes require the ingress controller, which is another set of Controller pods which does evaluation and processing of ingress rules and manages redirection.
There are many ingress controllers, but one commonly used in Kubernetes is Nginx Ingress Controller
List of others https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/.

Cloud native environments often have Cloud Load Balancer implemented by cloud providers. Advantage is minimal effort in setup to forward the requests to Kubernetes cluster.

In a bare metal environment there are different ways to configure it along with an entrypoint- in a cluster or the server running outside the cluster. One approach is an external proxy server that will take the role of a Load Balancer. It is a more secure approach as the ports and IP addresses are open for communication to the Proxy server but aren't accessible from outside of the cluster. 
#### Setup Nginx ingress on ingress controller on Minikube
```sh
minikube addons enable ingress 
```
It automatically implements and configures the Nginx controller on Minikube cluster.
```sh
kubectl get pod -n kube-system
```
Now create an ingress rule that the controller can evaluate. It will be created for the Kubernetes dashboard component.
### Setup minikube dashboard with URL domain name
For this example we will set up a small ingress configuration to forward requests to internal service.

minikube has integrated support for the Kubernetes Dashboard UI. It already has an internal service and Pod created https://github.com/kubernetes/dashboard 

```sh
kubectl get ns
kubectl get all -n kubernetes-dashboard
# NAME                                             READY   STATUS    RESTARTS        AGE
# pod/dashboard-metrics-scraper-7fd5cb4ddc-n4d2t   1/1     Running   2 (6m15s ago)   6h41m
# pod/kubernetes-dashboard-8694d4445c-jcs2q        1/1     Running   3 (6m15s ago)   6h41m

# NAME                                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
# service/dashboard-metrics-scraper   ClusterIP   10.110.99.160   <none>        8000/TCP   6h41m
# service/kubernetes-dashboard        ClusterIP   10.104.219.39   <none>        80/TCP     6h41m
```
Create the ingress configuration file
```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: dashboard-ingress
  namespace: kubernetes-dashboard
  labels:
    name: kubernetes-dashboard
spec:
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - backend:
          serviceName: kubernetes-dashboard
          servicePort: 80
```
Apply the configuration
```sh
kubectl apply -f nginx-ingress.yaml
# ingress.networking.k8s.io/dashboard-ingress created
kubectl get ingress -n kubernetes-dashboard
# NAME                CLASS   HOSTS               ADDRESS        PORTS   AGE
# dashboard-ingress   nginx   k8s-dashboard.com   192.168.66.2   80      46s
```
Add the IP address to map it to the host domain name locally
```sh
sudo vim /etc/hosts
# 192.168.66.2    k8s-dashboard.com
```
Now you are able to access the k8s dashboard by external ingress with an address k8s-dashboard.com.

![](https://images.prismic.io/syntia/6031298c-bb94-4f5a-a897-f73f1a32154b_dashboard.png?auto=compress,format)
#### Ingress default backend
Maps to default kubernetes-dashboard to http port 80. Whenever a request comes into K8s cluster which isn’t mapped to any backend service, the default backend will handle those requests.

For instance, a path not configured http://k8s-dashboard.com/test will return “404 page not found”. To create a custom response you would create a Pod and service that is referenced by ingress:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubernetes-dashboard # Service name from ingress
spec:
  selector:
    app: default-response-app
  ports:
    - protocol: TCP
      port: 80 # Service port from ingress
      targetPort: 8080 
```
### Configuration of the default ingress
```sh
kubectl describe ingress dashboard-ingress -n kubernetes-dashboard
# Name:             dashboard-ingress
# Labels:           name=kubernetes-dashboard
# Namespace:        kubernetes-dashboard
# Address:          192.168.66.2
# Ingress Class:    nginx
# Default backend:  <default>
# Rules:
  # Host               Path  Backends
  # ----               ----  --------
  # k8s-dashboard.com  
  #                   /   kubernetes-dashboard:80 (10.244.0.33:9090)
# Annotations:         <none>
# Events:
#  Type    Reason  Age                    From                      Message
#  ----    ------  ----                   ----                      -------
#  Normal  Sync    9m30s (x2 over 9m48s)  nginx-ingress-controller  Scheduled for sync
```
## Define routing for Applications in Kubernetes cluster
### Multipaths
Defining multiple paths for the same host. For the different paths it is possible to forward requests to different internal services and multiple applications accessible from one ingress:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  labels:
    name: kubernetes-dashboard
spec:
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: kubernetes-dashboard
            port: 
              number: 80
      - pathType: Prefix
        path: "/account"
        backend:
          service:
            name: account-service
            port: 
              number: 80
```
### Subdomains
Application can have subdomains to forward request to different applications from subdomain URL host address:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  labels:
    name: kubernetes-dashboard
spec:
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: kubernetes-dashboard
            port: 
              number: 80
  - host: account.k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: account-service
            port: 
              number: 80
```

### Configuring TLS Certificate
Https forwarding in ingress is simply done in ingress configuration.
Two requirements are tls hosts and secret name above the rules. Secret name is the reference to the Secret created in the cluster that holds the TLS certificate. 
```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  labels:
    name: kubernetes-dashboard
spec:
  tls:
    - hosts:
      - k8s.dashboard.com
      secretName: k8s-dashboard-tls
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: kubernetes-dashboard
            port: 
              number: 80
```
The secret must be created in the same namespace as the Ingress Component to be able to reference it.
```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: k8s-dashboard-tls
type: kubernetes.io/tls
data:
  tls.crt: base64 encoded cert
  tls.key: base64 encoded key
```


## Helm package manager
Helm is package manager for Kubernetes. It’s convenient to package YAML files and distribute them in Helm repositories. YAML files are created once as Helm Charts, so it could be reusable to other team members for deployments in the Kubernetes cluster.
Commonly used deployments are frontend applications, database applications, Elasticsearch, MongoDB, MySQL, Monitoring Apps with Prometheus.
Using a one command
```sh
helm install CHART_NAME
```
Helm install command reuse the configuration that has been already created before for other applications from shared chart files on Helm repository.

There are also public registries for the Helm charts available to reuse:
https://helm.sh/docs/helm/helm_search_hub/ 
### Templating engine
Helm is a templating engine, where the deployment and service configurations can be almost the same, except that the application name and the version are different, Docker image name and version tags.
There is a common configuration blueprint for the deployments written in the templates. The values which are going to change have placeholders instead of values. 
```yaml
# template YAML config
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.Name }}-configmap
spec:
  containers:
  -name: {{ .Values.container.name  }}
   image: {{ .Values.container.image }}
   port: {{ .Values.container.port }}

# Values.yaml
name: my-app
container:
  name: web-app
  image: some-image
  port: 8001
```
https://helm.sh/docs/chart_template_guide/values_files/ 
The same configuration files can be used to deploy applications across different clusters for different environments by labeling staging, development, production environments.

### Helm repository structure
Helm will expect a structure that matches this:
```markdown
helm_repository/
  Chart.yaml          # A YAML file containing information about the chart
  LICENSE             # OPTIONAL: A plain text file containing the license for the chart
  README.md           # OPTIONAL: A human-readable README file
  values.yaml         # The default configuration values for this chart
  values.schema.json  # OPTIONAL: A JSON Schema for imposing a structure on the values.yaml file
  charts/             # A directory containing any charts upon which this chart depends.
  crds/               # Custom Resource Definitions
  templates/          # A directory of templates that, when combined with values,
                      # will generate valid Kubernetes manifest files.
  templates/NOTES.txt # OPTIONAL: A plain text file containing short usage notes
```
More information about Helm Chart Templates https://helm.sh/docs/chart_template_guide/ 

