\---  
description: "Kubernetes Networking 101"   
pubDate: "Apr 21, 2023"   
heroImage: "beb170e5-c363-43b6-bab1-8fd52a6f1fa8_dns.webp?auto=compress,format"   
author: "Syntia"   
categories: "workshops, cloud infrastructure, networking, kubernetes"   
subcategories: "communication protocols, transmission control protocol, internet protocol, network layer, network interface, virtual network"   
\---  

In our previous Networking Workshop [Measure Twice, Cut Once- Dive into Network Foundations Workshop](https://syntia.org/2023/04/21/measure-twice-cut-once-dive-into-network-foundations-workshop/) we learned about how Kubernetes maps to the Networking layers in the infrastructure that provides the compute infrastructure and basis of the Networking interface.

Surviving Day 2 – **How to Troubleshoot Kubernetes Networking** – thanks to Thomas Graf, Isovalent for the demo of the **Cilium**!

## **Kubernetes Networking rules:**

1.  In Kubernetes Networking all pods have an **IP address**.
    
2.  All Pods can **talk** to each other in a **flat layer network** structure (without the use of Network Address Translation (NAT).
    
3.  Every Pod has **PodCIDR\[s\]** (Classless Inter-Domain routing) per node.The cluster’s Pods CIDR Block constrains the maximum total number of network addresses available for allocation to pods running on all the nodes, where Kubernetes assigns a /24 CIDR block (256 addresses) to each of the nodes where pod IPs is part of that IP range. To change the pods CIDR you need to configure kube-proxy.
    
4.  Kubernetes uses services for **load-balancing** layer of kubernetes. Load balancing is what allows us to have multiple replicas of a pod addressing to a single service name or single cluster IPs and Kubernetes will load balance on any of those replicas. Pod replicas prevent users from losing access to their application when a Pod fails or is inaccessible. It brings up a new instance of a Pod, scales it up when the running instances are not up to the specified number, and scales down or delete Pods.
    
5.  Kubernetes uses **DNS** for **service-discovery**. You can address service by its name and not hardcoding IP addresses into applications.
    
6.  **Network Policies** for segmentation. Network Policy is what allows to define which pods are allowed to connect to the other pods, e.g. via the same namespace communication is allowed, but across namespaces not.
    

### **Kubernetes Networking CNI and kube-proxy**

![](https://images.prismic.io/syntia/000f4741-0374-4258-b8eb-bf0b3f49ad66_screenshot-2023-04-21-at-12.38.03.jpg?auto=compress,format)

We’re having a multiple nodes in the cluster, pods running on the nodes, and containers running inside the pods. Networking CNI runs as an agent or daemon set on all the nodes and CNI spans the Network plane which allows the pods to talk to each other.

**Kubenet CNI** plugin is responsible to:

*   Network devices
    
*   IP Address Management
    
*   Intra-node connectivity
    
*   Inter-node connectivity
    

**Kube Proxy** is responsible to:

*   Services
    
*   Iptables or ipvs
    
*   Service discovery
    

## **Kubernetes Networking with Cilium**

With other CNI plugins such as Cilium the Kubernetes Networking is similar- Cilium provides a networking data path which takes over the implementation of eBPF and is forwarding the package or implementing the network policy rules. eBPF was built on top of the Berkeley Packet Filter (cBPF).

Cilium works not only as a CNI but a proxy on every node, and provides Kubernetes Networking Observability with Hubble, built on top of Cilium, which is “tcpdump for Kubernetes”. It is configurable with native Prometheus & Grafana Integration to collect logs and metrics.

Grafana based panels, how many packets are being forwarded, what is the drop rate by the network layer, total amount of traffic being forwarded, and cross-region traffic distribution.

Hubble UI service map with all the services that are running, individual network connections and hubble of request/response latency of API calls for application protocols HTTP, gRPC, Kafka, Cassandra- all the connectivity data.

## **Kubernetes Services**

Cluster IP provides an ability to expose multiple pod replicas via single Cluster IP. Instead of managing hundreds of pod replicas, Kubernetes allocates a service name and makes it available as a DNS name via core DNS, so your application connects to the service app name and Kubernetes takes care of the pod scaling.

### **How to troubleshoot Network Policies?**

An example of the Network Policies, let’s assume we’re allowing from the frontend the egress outbound rule to the backed pod via Kubernetes NetworkPolicy _egress_ label. 

_podSelector_ specifies what traffic is allowed to and from the pod that match the selector _(egress: – to: – podSelector: matchLabels: app: backend)_

Both pods are on one namespace, however from the observability logs we see the constant rate Network Policy drops from frontend, the packets are attempting to go to the kube-dns pod. 

Inspecting the namespace by querying the hubble:

 _hubble observe -n kubecon-simple_

_bck-i-search: hu\__

Hubble CLI shows all the network jobs and forward flows are happening in this namespace, and the policy drops are happening from frontend to kube-dns. 

> > **“It’s not DNS, There’s no way it’s DNS, It was DNS”**

Kubernetes DNS is used for service discovery, and it is usually implemented with CoreDNS.

### **Kubernetes DNS troubleshooting**

Hubble UI service map with the view on namespace communication from one namespace to another, e.g. frontend to kube-dns. We can see the lower part dropped flows and the reason description that the policy has been denied.

Now when applying the new Network Policy on top of the policy we have allows to access Kubernetes name server coreDNS _kube-dns_ with: _k apply -f kubecon-simple-allow-dns.yaml_

_cat kubecon-simple-allow-dns.yaml_

_apiVersion:_ [cilium.io/v2](//cilium.io/v2)

_kind: CiliumNetworkPolicy_

_metadata:_

  _name: allow-kube-dns_

_spec:_

  _egress:_

*   _toEndpoints:_
    

*   _matchLabels:_
    

_k8s:io.kubernetes.pod.namespace: kube-system_

_K8s:k8s-app: kube-dns_

_toPorts:_

*   _ports:_
    
*   _port: “53”_
    

_Protocol: ANY_

_endpointSelector:_

_matchLabels: {}_

The problem was not only to allow backend Network Policy rules to frontend (to app=backend) but also kube-dns or coreDNS pod (to ns:contains-coredns pod:k8s-app=kube-dns), applications failed egress outbound because of crossing the kube-system namespace.

Prometheus monitoring for DNS errors is part of DNS observability on Hubble. With hubble CLI:

_hubble observe -n kubecon-debug-dns_ 

Hubble traces the communication to kube-dns via UDP, and the actual DNS request and responses, where pod is attempted to resolve ipv6 and ipv4, and paths of DNS resolution in the namespace.

### **Learn How To Create Network Policies for Kubernetes**

Editor that visualizes Kubernetes Network Policies:

[https://editor.networkpolicy.io/?id=zVzZxN60deKeWdOf](https://editor.networkpolicy.io/?id=zVzZxN60deKeWdOf)

## **Troubleshooting Service Latency**

### **Golden Signal Dashboard**

Service latency is measurable by performance of the deploying applications. It has a standard **Golden Signal Dashboard**, created by Google SRE team, standard way of **monitoring services that are publicly available**.

**Four main golden signals are:**

*   Latency
    
*   Traffic
    
*   Errors
    
*   Saturation
    

More information: [https://sre.google/sre-book/monitoring-distributed-systems](https://sre.google/sre-book/monitoring-distributed-systems) 

![](https://images.prismic.io/syntia/2beaaec2-b396-429c-905f-514b0af5f907_screenshot-2023-04-21-at-14.23.10.png?auto=compress,format)

![](https://images.prismic.io/syntia/506cc33c-b34f-4e00-9b3e-52b016df9a18_screenshot-2023-04-21-at-14.47.16.png?auto=compress,format)

Hubble provides a dashboard for four golden signals. It consist of:

*   **Incoming Request Volume**: Rate of how many requests are incoming per second
    
*   **Request Duration**: HTTP request to response latency in seconds (P50 is the average from the worst half of the latency number, P95 is the average number of the worst 5% of connections that take the longest time, and P99 is the worst 1%). P95 and P99 matter more, because on average it often looks good, but sometimes requests experience latency problems where duration peaks up to 2 seconds.
    
*   **Incoming Request Success Rate** (and non 5xx responses) by source: rate of HTTP errors that are returned by application. When there is a problem with latency, there are sources of problems when requests are taking too long or service is crashing.
    
*   **HTTP Request Duration by Source** In order to debug the Errors we need to correlate the Request Duration with saturation from the CPU Usage by Source. This measures both source (CPU) and destination (Request Duration) nodes to monitor clusters broadly.
    
*   **CPU Usage by Source** availability of resources cpu.
    

Spike of latency is comparable on source and destination nodes at the point of time allowing us to analyze the service errors and how fast and performant it is. This data is available as OpenTelemetrics and traces to visualize on other tooling. This isn’t application instrumentation but the observance of Kubernetes cluster and its resources.