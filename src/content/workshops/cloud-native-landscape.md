---
description: 'Provisioning Cloud Native Landscape'
pubDate: 'May 16, 2022'
heroImage: 'https://images.prismic.io/syntia/ad567817-7719-48c2-bf83-545944c8b2bd_bliss.jpg?auto=compress,format'
author: 'Syntia'
categories: 'workshops, cloud infrastructure, devops'
subcategories: 'cloud infrastructure, provisioning platform, infrastructure as code, virtualization, infrastructure security, containerization, key encryption, cloud native storage, cloud runtime environment, infrastructure orchestration'
---

# **Cloud native Landscape**

![](https://images.prismic.io/syntia/ad567817-7719-48c2-bf83-545944c8b2bd_bliss.jpg?auto=compress,format)

**_Bliss_** is a virtually unedited photo of a green hill and blue sky with clouds in the Carneros AVA, California. Charles O’Rear took the photo in January 1996 and Microsoft bought the rights in 2000. It is estimated that billions of people have seen the picture, possibly making it the most viewed photograph in history.

The cloud native space evolves rapidly. End-users now are expecting to build complete solutions within Kubernetes in order to build applications accessible from any device and deploy them in scalable, secure and isolated environments. It increases complexity when operating across clouds, ecosystems and infrastructure. Access to industry requires specific capabilities specific to domain such as Gaming, Entertainment, Medical, Energy, Manufacturing or Fintech. Operators that synthesise human operators are paramount this scaling effort.

![](https://images.prismic.io/syntia/efe603ef-3b81-4763-800d-329dd099b308_screenshot-2022-05-16-at-21.03.44.png?auto=compress,format)

Prevalent telemetry types are accessible from the top layers of infrastructure context starting from end-user device and IoT

### The Cloud Native Computing Foundations CNCF’s provides [Cloud Native Trail Map](https://landscape.cncf.io/?license=open-source) recommended path. It helps developers to navigate through the cloud native landscape to better understand the structure of it with available cloud native tools.

It organise all cloud native open source projects and proprietary products into categories, providing an overview of the current ecosystem. _Projects_ are open source or CNCF-hosted open source projects. The new projects are continuously becoming part of the CNCF, categorised as incubation phase (light blue/purple frame), or graduated projects (dark blue frame). The layers of the CNCF Landscape built within layers:

## [Provisioning](https://landscape.cncf.io/card-mode?category=provisioning)

Provisioning is the first layer in the cloud native landscape. It encompasses tools that are used to _create_ the foundation on which cloud native apps are built and find tools to automatically configure, create, and manage the infrastructure, as well as for scanning, signing, and storing container images. It also extends to security with tools that enable policy setting and enforcement, embedded authentication and authorisation, and the handling of secrets distribution.

Provisioning layer focuses on building the foundation of your cloud native platforms and applications:

*   Automation & Configuration
    
*   Container Registry
    
*   Security and Compliance
    
*   Key Management
    

### [Automation & Configuration](https://landscape.cncf.io/card-mode?category=automation-configuration)

To deliver on rapid development and release cycles, infrastructure must be provisioned dynamically. Tools in this category either handle different parts of the provisioning process or try to control everything end-to-end. It speeds up the creation and configuration of compute resources. Automated tools like Terraform reduce the level of effort required to scale tens of servers and networks with hundreds of firewall rules.

### [Container Registry](https://landscape.cncf.io/card-mode?category=container-registry)

Cloud native applications are packaged and run as containers. A container is a running process with resource and capability constraints managed by a computer’s operating system. Container registries categorise and store repositories, and provide the container images needed to run applications. By centrally storing all container images in one place, they are easily accessible for any developer working on that app.

### [Security and Compliance](https://landscape.cncf.io/card-mode?category=security-compliance)

To run containers securely, containers must be scanned for known vulnerabilities and signed to ensure they haven’t been tampered with. Kubernetes has extremely permissive access control settings by default that are unsuitable for production. The result: Kubernetes clusters are target for anyone looking to attack systems. Security and compliance tools help monitor and enforce platform and application security.

### [Key Management](https://landscape.cncf.io/card-mode?category=key-management)

Cloud native environments are highly dynamic, requiring on-demand secret distribution. That means it has to be entirely programmatic and automated. The tools and projects in this category cover everything from how to securely store passwords and other secrets (sensitive data such as API keys, encryption keys, etc.) to how to safely eliminate passwords and secrets from your microservices environment. A key is a string of characters used to encrypt or sign data. 

### [Runtime](https://landscape.cncf.io/card-mode?category=runtime,runtime)

The runtime layer provides all the tools containers need to run in a cloud native environment:

*   Cloud native storage gives apps easy and fast access to data needed to run reliably
    
*   The container runtime which creates and starts containers executing application code
    
*   Cloud native networking provides connectivity for containerized apps to communicate.
    

In contrast of provisioning, the runtime layer encompasses container control to run in a cloud native environment. That includes the code used to start or stop the container, referred to as a container runtime; tools to make persistent storage available to containers; and those that manage the container environment networks.

### [Cloud Native Storage](https://landscape.cncf.io/card-mode?category=cloud-native-storage)

The Kubernetes clusters must be managed independently on different locations to build the scaling capabilities and operating it autonomously. For hybrid or on-premise cloud environments to scale up and down containerized apps are continuously created and deleted, changing the locations over time which makes the portability difficult. Therefore the cloud native storage must be provided node-independently. To function reliably, applications need to have easy access to storage that uses a cloud native compatible container storage interface and which can be provisioned automatically, enabling autoscaling and restore by eliminating the human bottleneck. 

### [Container Runtime](https://landscape.cncf.io/card-mode?category=container-runtime)

The container runtime is the software that executes containerized (or “constrained”) applications.

Container images (the files with the application specs) must be launched in a standardized, secure, and isolated way. Standardized because you need standard operating rules no matter where they are running. Secure, well, because you don’t want anyone who shouldn’t access it to do so. And isolated because you don’t want the app to affect or be affected by other apps (for instance, if a co-located application crashes). Isolation basically functions as protection. Additionally, the application needs to be provided resources, such as CPU, storage, and memory. Containerd as Docker and CRI-O are standard container runtime implementations.

### [Cloud Native Network](https://landscape.cncf.io/card-mode?category=cloud-native-network)

Cloud native networking provides connectivity for containerized apps to communicate. Distributed apps have multiple components that use the network for different purposes. Tools in this category create a virtual network on top of existing networks specifically for apps to communicate privately, referred to as an overlay network.

Container network needs to assign IP addresses to pods where containerized apps run in Kubernetes, allowing other processes to access it. Cloud native networking uses software for controlling, inspecting and modifying data flows. It makes easier to manage, secure and isolate connections between containers by predefining policies and rules that allow an app to connect to services running outside the container network.

## **Orchestration and management**

Kubernetes itself, is of the key enablers of cloud native development to the infrastructure layers responsible for internal app and external communication. Inherently scalable, cloud native apps rely on automation and resilience, enabled by these tools.

### [Scheduling and orchestration](https://landscape.cncf.io/card-mode?category=scheduling-orchestration)

Orchestration and scheduling refer to running and managing containers across a cluster. A cluster is a group of machines, physical or virtual, connected over a network. Container orchestrators (and schedulers) are somewhat similar to the operating system (OS) on your laptop. The OS manages all your apps as Slack and Zoom; executes them, and schedules when each app gets to use your laptop’s hardware resources like CPU, memory and storage. Most applications today requires more resources than one OS can handle. Therefore it requires a cluster to group pods according to its namespace and manage containers with orchestration tools such as Kubernetes.

Kubernetes _namespaces_ help different projects, teams, or customers to share a Kubernetes cluster. Each namespaces has its own:

1.  resources (pods, services, replication controllers, etc.)
    
2.  policies (who can or cannot perform actions in their community)
    
3.  constraints (this community is allowed this much quota, etc.)
    

A cluster operator may create a Namespace for each unique user community.

The Namespace provides a unique scope for:

1.  named resources (to avoid basic naming collisions)
    
2.  delegated management authority to trusted users
    
3.  ability to limit community resource consumption
    

Containers and Kubernetes are both central to cloud native architectures. along with other container orchestrators like Docker Swarm and Mesos,iIt enables declarative configuration management in which is handled via control loops, a pattern in which a process running in Kubernetes monitors the Kubernetes store for a particular object type and ensures the actual state in the cluster matches the desired state. It is called a state reconciliation. The desired state is specified by the engineer (e.g. ten instances of service A running on three nodes, i.e. machines, with access to database B, etc.) and continuously compared against the actual state. If the desired and actual state is not compatible, Kubernetes reconciles them by creating or destroying objects. For example, if a container crashes, Kubernetes will spin up a new container on different node to replace it or retrieve it when scaling application with replicas- availability of a specified number of identical Pods.

### [Coordination and service discovery](https://landscape.cncf.io/card-mode?category=coordination-service-discovery)

Since there is no one place where a particular service is and the location of everything is constantly changing, service discovery tools keep track of services within the network. There are mostly two types of tools in this category:

1.  **Service discovery engines**: database-like tools that store information on all services and how to locate them
    
2.  **Name resolution tools**: tools that receive service location requests and return network address information (e.g. CoreDNS)
    

In Kubernetes, to make a pod reachable a new abstraction layer called “service” is introduced. Services provide a single stable address for a dynamically changing group of pods. In Kubernetes, creating a service (abstraction), creates a group of pods which together provides a service (functionality within one or more containers) with a single end point (entry point) which is the Kubernetes service.

#### **Service discovery in distributed systems**

Traditional DNS processes and traditional load balancers were often unable to keep up with changing endpoint information. To make up for these shortcomings, service discovery tools handle individual application instances rapidly registering and deregistering themselves. Some options such as CoreDNS and etcd are CNCF projects and are built into Kubernetes. Others have custom libraries or tools to allow services to operate effectively.

### [Service proxy](https://landscape.cncf.io/card-mode?category=service-proxy)

A service proxy is a gate between the user and services or between different services. It intercepts traffic to or from a given service, applies some logic to it, then forwards that traffic to another service. It can be as simple as serving as a load balancer that forwards traffic to individual applications or as complex as an interconnected mesh of proxies running side by side with individual containerized applications handling all network connections.  service proxies are also building blocks for other systems, such as API gateways or service meshes. Proxies gather critical data, manage routing (spreading traffic evenly among services or rerouting if some services break down), encrypt connections, and cache content (reducing resource consumption).

Service proxies allows administrators to accomplish several things: It can gather detailed metrics about inter-service communication, protect services from being overloaded, and apply other common standards to services, like mutual TLS. Service proxies are fundamental to other tools like service meshes as they provide a way to enforce higher-level policies to all network traffic.

### [API Gateway](https://landscape.cncf.io/card-mode?category=api-gateway)

An API gateway allows organizations to move key functions, such as authorizing or limiting the number of requests between applications, to a centrally managed location. It simplifies how organizations manage and apply rules to all interactions and functions as a common interface to (often external) API consumers.

An API gateway serves as a common entry point for a set of downstream applications while at the same time providing a place where teams can inject business logic to handle authorization, rate limiting or chargeback.

### [Service meshes](https://landscape.cncf.io/card-mode?category=service-mesh)

A service mesh is an infrastructure layer that manages inter-service communications by providing command and control signals to a network of service proxies. It binds all services running on a cluster together via service proxies creating a mesh of services.

Service meshes allow platform owners to perform common actions or collect data on applications without having developers write custom logic. It enable platform teams to add reliability, observability, and security features uniformly across all services running within a cluster.

Some service meshes use a general-purpose service proxy (see above) for their data plane. Others use a dedicated proxy; Linkerd, for example, uses the Linkerd2-proxy “micro proxy” to gain an advantage in performance and resource consumption. These proxies are uniformly attached to each service through so-called sidecars. Sidecar refers to the fact that the proxy runs in its own container but lives in the same pod.

It also applies to general-purpose proxies and API gateways. Service meshes and API gateways solve that very issue as they are implemented by the platform owners and applied universally across all services.

## **App Definition and Development**

The application development layer focuses on the tools that enable engineers to build apps. Application definition and image build tools include a variety of technologies that improve the developer and operator experience. CI/CD helps engineers catch any errors early on, ensuring code is ready for deployment with the best quality.

### [Database](https://landscape.cncf.io/card-mode?category=database)

Databases provide a common interface for applications to store and retrieve data. In general, there are two common types: Structured query language (SQL) databases and no-SQL databases. Most common databases MySQL and Postgres run successfully and effectively in Kubernetes clusters and aim to bring the scaling and availability benefits of Kubernetes.

### [Streaming and messaging](https://landscape.cncf.io/card-mode?category=streaming-messaging)

Messaging and streaming systems provide a central place for choreographed systems to communicate. The message bus provides a common place where all apps can go to tell others what they’re doing by publishing messages, or see what’s going on by subscribing to messages.

Messaging and streaming tools have been around long before cloud native became a thing. To centrally manage business-critical events, organizations have built large enterprise service buses. But when we talk about messaging and streaming in a cloud native context, we’re generally referring to tools like NATS, RabbitMQ, Kafka, or cloud provided message queues.

### [Application definition and image build](https://landscape.cncf.io/card-mode?category=application-definition-image-build)

Kubernetes tools standardise and simplify application build and deployments. Application definition and build tools encompass a huge range of functionality. At a high level, tools in this space solve either developer-focused concerns, like how to correctly write, package, test, or run custom apps, or operations-focused concerns, such as deploying and managing applications. Helm is the only graduated project in this category and underpins many app deployment patterns. It allows Kubernetes users to deploy and customize apps, and is often used by organisations for the internal releases.

![](https://images.prismic.io/syntia/0ebabfad-7ecf-4a66-90bb-756890d6e4e4_screenshot-2022-05-16-at-21.11.15.png?auto=compress,format)

![](https://images.prismic.io/syntia/4e0eeaa8-48ac-44d1-9de1-3b2b29eb476e_screenshot-2022-05-16-at-21.11.46.png?auto=compress,format)

Path traversal vulnerability in Argo CD- exploiting the Helm Chart field parsing to access the restricted information such as API keys or passwords (CVE-2022-24348)

Helm chart yaml manifests can contain a reference to value yaml files outside of the scope of the intended application. It can lead to sensitive data exposure from other applications when residing on the same server.

Path traversal was suspected to happen by mechanism implementing a built-in function that lead to the vulnerabilities. It can be prevented by unit testing and more advanced testing mechanisms when covering all the scenarios.

##### **Long term remediation suggestion**

*   Flat permission-wise access as a culprit when dealing with security
    
*   Implement file level permission model
    
*   Organizations to audit file access and integrity
    

### [Continuous Integration and Delivery](https://landscape.cncf.io/card-mode?category=continuous-integration-delivery)

CI tools ensure that any code change or updates developers introduce are built, validated, and integrated with other changes automatically and continuously. The longer a developer works on a piece of software without integrating it into the codebase, the longer it will take to identify an error and the more difficult it will be to fix.

When developer changes the code for a web app, the CI system sees the code change, then builds and tests a new version of it. The CD system takes that new version and deploys it into a dev, test, pre-production, and finally production environment. It does that while testing the deployed app after each step in the process. All together these systems represent a CI/CD pipeline.

Some traditional CI tools like Jenkins is a good fit into Kubernetes ecosystem. Flux and Argo have pioneered a new way of doing continuous delivery called GitOps, which the OpenGitOps project is working to define as a vendor-neutral standard.

## **Observability and Analysis**

*   “Observability” is a buzzword for modern monitoring and telemetry analytics
    
    *   Term borrowed from the “modern control system theory”, interestingly lost the “controllability” twin concept on the way
        
*   Setting the record straight:
    
    *   Monitoring is the act of collecting and processing the telemetry data (not just metrics)
        
    *   Observability is a property of a system; usually you must monitor the system for it to be observable
        

Observability is a system characteristic describing the degree to which a system can be understood from its external outputs and ensuring it stays operational even under tough conditions. Measured by CPU time, memory, disk space, latency, errors, etc., logging tools capture event messages emitted by app logs and metrics, where tracing follows the path of individual requests. When combined, these tools ideally provide an overview of systems health. Analysis is an activity in which developers look at this observable data and make sense of it.

Tools in this category are broken down into logging, monitoring, tracing, and chaos engineering.

### [Monitoring](https://landscape.cncf.io/card-mode?category=monitoring)

#### **The network effect of monitoring**

*   Issues _spread_ from one system to another
    
*   Need holistic view of dependencies among systems to understand
    
    *   How issues propagate
        
    *   Impact on end-users
        
*   Monitoring has a _network effect_
    
    *   The more you monitor together, correlate, contextualise…
        
    *   … the more insights you have
        

Good monitoring allows operators to respond quickly, and even automatically, when an incident arises. It provides insights into the current health of a system and watches for changes.

Monitoring refers to instrumenting an app to collect, aggregate, and analyze logs and metrics to improve our understanding of its behavior. While logs describe specific events, metrics are a measurement of a system at a given point in time — they are two different things but both necessary to get the full picture of the system’s health.

![](https://images.prismic.io/syntia/71ffaf64-8a72-4314-a91a-69fa001f12aa_screenshot-2022-05-16-at-20.53.20.png?auto=compress,format)

Prevalent telemetry types are accessible from the top layers of infrastructure context starting from end-user device and IoT

### [Logging](https://landscape.cncf.io/card-mode?category=logging)

Logging tools collect, store, and analyze these messages to track error reports and related data. Along with metrics and tracing, logging is one of the pillars of observability- logging tools aim at helping organizations gain control over their log messages to understand what an application was communicating at any given time.

Over time collecting and retaining log messages is an extremely powerful capability that help teams diagnose issues and meet regulatory and compliance requirements. In a cloud native environment, log collection tools like Fluentd run alongside application containers and collect messages directly from the applications.

### [Tracing](https://landscape.cncf.io/card-mode?category=tracing)

Tracing, a specialized use of logging, allows to trace the path of a request as it moves through a distributed system by adding a unique identifier to messages sent by the application. That unique identifier allows to follow (or trace) individual transactions as they move through the system.

Tracing is a powerful debugging tool that allows to troubleshoot and fine tune the behaviour of a distributed application. Application code needs to be modified to emit tracing data and any spans (a representation of individual units of work done in a distributed system) need to be propagated by infrastructure components (e.g. service meshes and their proxies) in the data path of application. Jaeger and Open Tracing are CNCF projects in this space.

### [Chaos engineering](https://landscape.cncf.io/card-mode?category=chaos-engineering)

Chaos engineering refers to the practice of intentionally introducing faults into a system in order to test its resilience and ensure applications and engineering teams are able to withstand turbulent and unexpected events.

The traditional approach to maintaining high availability for applications is referred to as optimizing for [mean time between failures](https://en.wikipedia.org/wiki/Mean_time_between_failures), or MTBF. You can observe this practice in organizations that use things like “change review boards” and “long change freezes”.  High performing IT organizations achieve high availability by optimizing for mean time to recovery, or MTTR, instead. Instead of waiting for something to happen and find out, place it under duress in controlled conditions to identify weaknesses and fix them beforehand.

##### **Capture the Flag (CTF) event**

Capture-the-Flag events are computer security competitions. Participants compete in security-themed challenges. Flags are usually embedded strings. It help develop the essential skills required to follow a career path in cybersecurity.

Exercise: complete the Capture the Flag (CTF) from the KubeCon Cloud Native Security Day [https://controlplaneio.github.io/kubecon-2021-sig-security-day-ctf/](https://controlplaneio.github.io/kubecon-2021-sig-security-day-ctf/)

Containers are used to isolate the workspaces. The user namespace and cgroups is a way for a container as a set of isolated processes to have a different set of permissions than the system itself. However processes can have root privilege within its user namespace without having it in other user namespaces. Running a privileged container enables access to the root file system from that machine.

![](https://images.prismic.io/syntia/15e7cab4-84fd-4150-b169-47f284dc38e1_screenshot-2022-05-16-at-21.13.59.png?auto=compress,format)

SSH Into a K8 Pod From Outside the Kubernetes Cluster

## **Platform**

While there is no single best tool for all use cases, there certainly is an optimal tool for the needs of organisation based on the control over Kubernetes adoption, the workloads and needs to offload operational tasks. Vendor opinions about what’s important and appropriate are built into the solution.

### [Certified Kubernetes – Distribution](https://landscape.cncf.io/card-mode?category=certified-kubernetes-distribution)

Kubernetes distributions provide a trusted and reliable way to install Kubernetes and provide defaults that create a better and more secure operating environment. A Kubernetes distribution gives vendors and projects the control and predictability they need to provide support for a customer as they go through the lifecycle of deploying, maintaining, and upgrading the Kubernetes clusters and makes it easier to use.

### [Certified Kubernetes – Hosted](https://landscape.cncf.io/card-mode?category=certified-kubernetes-hosted)

Hosted Kubernetes is a service offered by infrastructure providers like AWS, Digital Ocean, Azure, and Google, allowing customers to spin up a Kubernetes cluster on-demand. The cloud provider takes responsibility for managing part of the Kubernetes cluster, usually called the control plane. They are similar to distributions but managed by the cloud provider on their infrastructure. Managed clusters provide stricter limits on configuring Kubernetes clusters.

### [Certified Kubernetes – Installer](https://landscape.cncf.io/card-mode?category=certified-kubernetes-installer)

Kubernetes installers automate the Kubernetes installation and configuration process and may help with upgrades. Open source Kubernetes relies on installers like kubeadm to get Kubernetes clusters up and running. Kubernetes installers like [kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker) allow to get a Kubernetes cluster with a single command. kubeadm is considered so fundamental to the Kubernetes ecosystem that it’s included as part of the CKA, certified Kubernetes administrator exam. Minikube, kind, kops, and kubespray are all CNCF-owned Kubernetes installer projects.

### [Paas/ Container Service](https://landscape.cncf.io/card-mode?category=paa-s-container-service)

A Platform-as-a-Service, or PaaS, is an environment that allows users to run applications without taking control over the underlying compute resources. Tools like Cloud Foundry Application Runtime help organizations get up and running with new applications quickly. However any PaaS comes with its own set of trade-offs and restrictions. Stateless applications tend to do very well in a PaaS but stateful applications like databases usually don’t.

##### **References and further reading:**

CNCF’s full guide: [https://landscape.cncf.io/guide](https://landscape.cncf.io/guide)

Prometheus overview: [https://prometheus.io/docs/introduction/overview/](https://prometheus.io/docs/introduction/overview/)

Kubernetes simulator: [https://github.com/kubernetes-simulator/simulator](https://github.com/kubernetes-simulator/simulator)

CNCF’s channel: [https://cloud-native.slack.com/](https://cloud-native.slack.com/)

Argo CD tools: [https://argoproj.github.io/](https://argoproj.github.io/)

Zinc tools: [https://github.com/jnsgruk/zinc-k8s-operator](https://github.com/jnsgruk/zinc-k8s-operator)

Canonical tools:

*   [https://charmed-kubeflow.io/](https://charmed-kubeflow.io/)
    
*   [https://charmed-osm.com/](https://charmed-osm.com/)
    
*   [https://charmhub.io/topics/canonical-observability-stack](https://charmhub.io/topics/canonical-observability-stack)
    
*   [https://github.com/canonical/template-operator](https://github.com/canonical/template-operator)
    
*   [https://github.com/canonical/charming-actions](https://github.com/canonical/charming-actions)
    

Kubernetes Patterns: Reusable Elements for Designing Cloud Native Applications: [https://developers.redhat.com/books/kubernetes-patterns](https://developers.redhat.com/books/kubernetes-patterns)