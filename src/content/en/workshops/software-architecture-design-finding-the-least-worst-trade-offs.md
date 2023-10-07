---
description: 'Software architecture design- finding the least worst trade-offs'
pubDate: 'May 13, 2022'
heroImage: 'https://images.prismic.io/syntia/0956969c-64e0-47bf-9c70-7900606555fe_sustain-ops.png?auto=compress,format'
author: 'Syntia'
categories: 'workshops, cloud infrastructure, software architecture design'
subcategories: 'software scalability, domain driven design, devops, service distribution'
---

Software Architecture: The Hard Parts, Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani

Businesses must be agile to survive in today’s fast paced and ever changing market, meaning their underlying architectures must be agile as well. The goal is to investigate how to do trade-off analysis in distributed architectures.

“There is no single development, in either technology or management technique, which itself promises even one order of magnitude \[tenfold\] improvement within a decade in productivity, in reliability, in simplicity”. – Fried Brooks from “No Silver Bullet”

The software development ecosystem constantly shifts and grows. The predominant style for large enterprises years ago was centralised and orchestration driven, service-oriented architecture. Since the open source and Linux became viable, it has evolved the software development ecosystem fostering an architectural transition to microservices and quickly emerging infrastructure of containers and orchestration tools like Kubernetes.

The microservices by the definition has adherence to its bounded context from Domain-Driven-Design as a way of limiting the scope of implementation detail coupling.

To maintain a good internal structural integrity in the codebase and to respond to the changes efficiently in either ecosystem or domain there must be measurable characteristics that contribute to agility, such as deployments, maintainability and software testability.

The higher competitive advantage is achieved through speed-to-market combined with scalability to support increased user activity and overall application availability. The fault tolerance, the ability of an application to fail and to continue to operate, is necessary to ensure that as parts of the application fail, others will be still able to function as normal, minimising the overall impact to the end user.

When the data is the most important asset in the company one important distinction to cover is separation between operational and analytical data.

In the early 2000s the incremental feedback and automation became an intersector between software development and operations, spawning the new role of DevOps and automating manual operations. Thus, automation and feedback became key enablers in software development productivity and efficiency.

Illustrating an example of an anti-pattern that aspires to avoid is arbitrarily importing classes or components. The network of components forming the cyclic dependencies destroys architecture modularity towards a big ball of mud- a software system that lacks a perceivable architecture. Such systems are common in practice due to business pressures, developer turnover and code entropy.

While ultimately architects must understand how to implement solutions, they must first understand why one choice has better trade-offs than another. Settling architectural concepts can avoid numerous implementations of it. It can be only done by defining a scope of static and dynamic coupling in architectures.

Static coupling refers to the way architectural parts are wired together: dependencies, coupling degree and its connection points. Dynamic coupling refers to how the architecture parts call one another as a transport layer with details about the contract and information passed.

A monolithic architecture deployed as a single unit is by definition a single quantum architecture. Within a distributed architecture such as microservices developers tend toward the ability to deploy services independently, often in a highly automated way. Therefore service within a microservices architecture represents an independently deployable asset that serves several purposes as an architecture quantum.

First, the boundary represented by an architecture quantum serves a useful common language and scope among architects, developers and operations, and understanding it its own way: architects understand coupling characteristics, developers- the scope of behavior, and the operations team acknowledge the deployable characteristics.

Second, the architecture quantum represents one of the forces (static coupling) architects must consider when striving for proper granularity of services within a distributed architecture. Often, in microservices architectures, developers face the difficult questions of what service granularity offers the optimum set of trade-offs. Some of it revolves around deployability: what release cadence does the service require, what other services might be affected, what engineering practices are involved.

Third, independent deployability forces the architecture quantum to include common coupling points. Many distributed systems that would qualify fail it if they share the common database with its own deployment cadence. Considering the deployment boundaries doesn’t solely provide a useful measure and the high functional cohesion should be considered to limit the architecture quantum to a useful scope.

Ideally in microservices architecture, each service models a single domain or workflow, and therefore exhibits high functional cohesion. Cohesion in this context isn’t about how services interact to perform work, but rather how independent and coupled one service is to another.

High degrees of decoupling allow teams working on a service independently without worrying about breaking other dependencies. In micro frontend architecture, each service tied with a user interface component forms an architecture quantum: each of these services may have different architecture characteristics.

The static coupling of a system provides valuable insight, even in complex systems with integrations. A common technique for understanding the “legacy” architecture involves creating a static quantum diagram of how things are “wired” together, which helps determine what systems will be impacted by change and offers a way of decoupling the architecture.