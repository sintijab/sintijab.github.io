---
description: "Principle from beginner to advanced levels No. 1- problems with practical examples in code must be solved in 1h..."
pubDate: "Jul 28, 2023"
heroImage: "https://images.prismic.io/syntia/f527fcc8-4b8c-4a67-a8db-059bbde53dac_img_20230726_150309-1.webp?auto=compress,format"
author: "Syntia"
categories: "workshops, cloud infrastructure, networking, kubernetes"
subcategories: "pod troubleshooting, decentralized application, hexagonal architecture, polymorphism"
---

WeAreDevelopers World Congress is considered by many as the world’s flagship event for developers. What I enjoyed the most was the opportunity to meet the like-minded people having no setbacks on their ambitions and drive for a better future.

## Keep It Simple
What I learned from the speaker perspective is Keep It Simple principle- practical examples in code and your problem to solve in 1h timeframe must be clear to everyone-beginner to advanced levels.
From all of the workshops during the first day of the congress I decided to take a three different workshops about Kubernetes, architecture design in object oriented programming and change of the platform- building decentralised applications on blockchain as a service.
## Kubernetes troubleshooting
##### Workshop by Ahmed Gaber and Cassandra Faris
Getting detailed information about the pods is a common practice in the Web application deployment process. Because of misconfiguration, missing labels or scaling the software the troubleshooting is essential to run pods successfully on Kubernetes and ensure application’s availability. Furthermore Kubernetes main advantage is deployments to different environments ensuring the application’s security, resource management and infrastructure scalability.
For instance, most of the common errors can be found with two following commands to describe the problematic pod, where the output will indicate the root cause of the issue.
```bash
kubectl get pods
kubectl describe pod [pod-name]
```
Workshop about Kubernetes troubleshooting is available online from Kubecampus: https://kubecampus.io/kubernetes/courses/kubernetes-troubleshooting/

#### Problem: CrashLoopBackOff
Pod cannot be scheduled on a node. The node does not have sufficient resources to run the pod, or it did not succeed in mounting the volumes. The common causes are: Insufficient resources – if there are insufficient resources on the node, clusters can be scaled to ensure more nodes are available for pods and the old pods can be terminated.
Volume mounting. To solve the problem with mounting a storage volume first find which volume the pod is trying to mount and see if that storage volume is set correctly and is available.
#### Problem: ImagePullBackOff
Pod could not run because it attempted failure to pull a container image from a registry. The pod refuses to start because it cannot create one or more containers defined in its manifest.
It’s either a wrong image name or tag- this typically happens because the image
name or tag was typed incorrectly in the pod manifest.

In this workshop you will inspect the pods, verify the images, correct and apply pod definitions to the pod manifest.

![Kubernetes Workshop](https://images.prismic.io/syntia/f527fcc8-4b8c-4a67-a8db-059bbde53dac_img_20230726_150309-1.webp?auto=compress,format)
![Kubernetes Workshop](https://images.prismic.io/syntia/6af4ba85-205f-4484-8f1e-e6f1262b186f_img_20230726_150607-1.webp?auto=compress,format)
![Kubernetes Workhop](https://images.prismic.io/syntia/13ed9948-cb59-493b-91c0-3c61d338458d_img_20230726_150743-1.webp?auto=compress,format)

## Build Web3 Apps Like It’s Web2
##### Workshop by David Dal Busco
Ethereum was the first blockchain that could host Turing complete smart contracts, which are secure units of code that process and store data on the blockchain itself.

Although Ethereum smart contracts can be used to create a DeFi service, they are not capable of serving interactive web experiences that enable end users to interact with them.

A cloud computing infrastructure is used to provide the user experience, and often also to perform the vast majority of data processing and storage – especially where Web3 services are involved. This exposes them to all manner of vulnerabilities, including being censored by the cloud operator, getting hacked, and the transfer of legal liability for the otherwise decentralized service to the developers operating the cloud accounts involved.

Eventually realizing the Ethereum project’s path was incompatible with applied cryptography and distributed computing math capable of speeding up blockchains, and allowing them to scale infinitely.
For this new concept “World Computer” the Dfinity Foundation had to build the largest research and development operation in blockchain, which currently employs more cryptographers than any other organization in tech.

The Internet Computer blockchain – the first true realization of the World Computer vision – has been launched on May 10th 2021.
In order to implement protocols that would allow it to establish chain key cryptography material on nodes in a decentralized network setting, it could be only achieved using a non-interactive distributed key generation and key re-sharing protocol, devised by Jens Groth cryptographer from DFINITY.

There are many ways decentralized exchange running on Ethereum are getting improved:
The interactive web experience, through which users place orders and manage their accounts, can be created using smart contracts which can process HTTP requests.

Expensive data processing and storage can be offloaded to Internet Computer smart contracts. For example, the Internet Computer can manage user profile information to log all their trades and enable them to continuously buy and sell goods with multiple sellers and buyers.

Internet Identity can be leveraged. This is an anonymizing blockchain authentication framework the Internet Computer provides to allow end users to securely create sessions with Web3 services using special hardware, such as the fingerprint sensor on their laptop, or Face ID on their phone.
Front-end built on the Internet Computer can map Internet Identity anchors to Ethereum public keys, and then allow end users to securely and conveniently authenticate themselves to the DeFi service using their fingerprint sensor.

David Dal Busco during WeAreDevelopers 2023 World-congress in less than hour guided us through how to build decentralized “dapp” by creating a service that allows users to authenticate anonymously, store and retrieve data entries and upload files.
This example is explained in detail https://juno.build/blog#build-a-dapp
The source code of this tutorial is available in GitHub https://github.com/buildwithjuno/workshops, as well as other code samples for applications and microservices built with well-known web software frameworks such as react, nextjs, vue, angular, nodejs. https://github.com/buildwithjuno/examples

Juno is a new open-source Blockchain-as-a-Service solution that allows flexibility to build decentralized apps and host as a static website on the Internet Computer.
Juno supports authentication through Internet Identity and NFID, datastore programming model for storing data on the blockchain, eliminating the need to write backend, and storage for building dynamic dapps to store assets such as images, documents, videos, etc. The limit for the storage is currently 2GB data, but it is going to be increased to 64GB in near future.

Unlike traditional BaaS (Backend-as-a-Service) platforms such as Google Firebase or AWS Amplify, Juno runs entirely on the blockchain.
Developing a JavaScript application that runs entirely on blockchain with Juno does not differ in terms of architecture compared to traditional Web2 serverless solutions. However, when it comes to security, resource optimization and reusability of components, Web3 brings developers a different perspective on applications architecture.

An example Web3 (and Web2) dapp architecture explained by David Dal Busco: https://juno.build/blog/exploring-a-juno-web3-dapp-architecture

![Web3 dapp application](https://images.prismic.io/syntia/06dfe52a-8fa3-4303-be9d-24306c16fb30_screenshot-2023-07-28-at-21.39.42.webp?auto=compress,format)
![David Dal Busco](https://images.prismic.io/syntia/515fafd6-7d51-4b67-b517-4e8cf3ab5338_img_20230726_160352.webp?auto=compress,format)
## Six-Sided Web Pages? Hexagonal frontend architecture!
##### Workshop by Marco Emrich
Component + Strategy allows you to configure a subsystem to fit into slightly different environments. Hexagonal Architecture aka Ports & Adapters is a specific version of it that allows you to isolate a system from external technologies, vary those external technologies, and test the system in isolation.
You quite naturally pass an object into a function so that the function can ask that object for more information or tell it to do something. This is normal object-oriented design.
For example, suppose you are programming a coffee machine that operates from recipes, you might pass in a recipe object to the drink-maker, so that the drink maker can get from it the sequence of ingredients to dispense.

Your code would look something like:

```js
recipe = RecipeLibrary.find( "mochaccino" );
drinkmaker.make( recipe )
```
and inside the drinkmaker:

```js
foreach step in recipe {
  dispenser = step.ingredient
  quantity - step.quantity
  dispenser.dispense( quantity )
}
```
First of all, we have parameterized the recipes, meaning, we choose which one to use according to the argument we pass in to the function. This is a really basic way to program, and should be fairly understandable. The main reason I mention it is that I want to be able to say in a bit: “parameterize the secondary actors.” All I mean with that is that you pass in an argument that identifies which one to use.
It turns out we have just implemented the Strategy pattern. Many programmers don’t use Strategy consciously, because it seems complicated in the Design Patterns book. So although they might use it reflexively, they don’t describe their designs this way.

What’s cool about Strategy is that that polymorphism not only saves a bunch of ‘if’
statements, but the Context doesn’t know or care which it has at the time of the call.
Context may have calculated which one it needed earlier – for example, it may earlier have decided to use a time-optimal search or a space-optimal search, and obtained the appropriate search algorithm from somewhere, stuffed that search algorithm object into a safe place, and when needed, invoked whatever it had stored away.
Or, the Context object might never know which concrete strategy object it is calling. Something, somewhere else, made that decision, and passed it in as a parameter. This is what we did with the recipe object.
Because driver passes the recipe into the drinkmaker, the drinkmaker knows nothing about those other objects at programming time. It has no code-level dependencies on them. All knowledge it needs it obtains as needed during program execution. We like this, from a maintenance, testing, and reuse perspective.

To apply this Strategy concept in hexagonal frontend architecture Marco Emrich showed an example of a space-ship on sale:
https://github.com/illyrica/hexa-space
Similar to the coffee-machine in Alistair Cockburn’s Component-plus-Strategy generalizes Ports-and-Adapters, 2022. UML contains a thing called Component, which has a Provided Interface or API on the driver side, and a Required Interface on the collaborator side. Further, Component has a thing called a Port, which is just a requirement that anything that plugs into the component must honor a protocol.
The UML spec says a Component is, “a modular unit with well-defined Interfaces that is replaceable within its environment”.
Furthermore, components are the well defined interfaces in the main app which connects one or more bounded contexts implementing reusable adapters.

The Adapter pattern is a special case of the Strategy pattern in which the concrete strategy will make some adjustments for interface compatibility and then call another service to take care of the request. The big difference between the two is that Adapter has an additional level of indirection. The strategy may or may not do all its work itself, but we intend the adapter to connect to something else.
In this spacecraft shop code structure, adapters are sublevel of its bounded contexts, Space Ship Store Front and Weapon inventory. Each of those contain reusable http interfaces for API adapters, UI adapter for the reusable components and domain interfaces for the business specific requirements.

A Strategy object- the application can, of course, do all this – that is outside the pattern definition – but we expect the Adapters to do this. One of the benefits of using Component and Strategy is that by declaring the component boundary explicitly, you can supply a test double as the strategy for one of external actors and thus test the component in isolation. Then for production use, supply an adapter to do the real connection.

And now our Strategy-Adapter discussion becomes relevant. The interfaces might not be connected to a database. If it is not, then the definition fits a Strategy object. If it is connected to a database, then it is arguably an adapter.

However we are not fussed about which way to call it. In the end having a well designed architectural pattern with Component and Strategy or the Component and Adapter makes it easier to scale the application to the different domains. It backfires in the maintenance when introducing more business requirements which increase application’s complexity, furthermore refactoring efforts in the future and testing in separate isolated units.
![Hexagonal frontend app](https://images.prismic.io/syntia/151eca4e-45eb-414c-85e2-41112c8b4b72_screenshot-2023-07-26-at-18.08.55.webp?auto=compress,format)
![Marco Emrich](https://images.prismic.io/syntia/73a2206e-5d1f-4eb4-b408-cc97c964012a_img_20230726_170704.webp?auto=compress,format)