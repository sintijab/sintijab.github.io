---
description: "Magic is organising chaos"
pubDate: "Jun 20, 2024"
heroImage: "https://images.prismic.io/syntia/ZnSSnZm069VX17wA_collage.jpg?auto=format,compress?auto=compress,format"
author: "Syntia"
categories: "research, information access, chaos engineering, software architecture, monitoring"
subcategories: "javascript, observability, application testing, ssr, conferences, networking events"
---

In the React Summit around 70% of the talks were about the server over client side implementations. While most of the speakers were explaining the configuration with custom or framework-fit setup like NextJS the hype about server generated components can be explained.

### Pros

*   The app has many dependencies on external APIs, loading apps directly from the server has advantages on reducing the TTI (time to interactive), which is prominent on slow internet or slow devices.
    
*   Since the content is server rendered/streamed, the search engine crawlers will rank it higher enhancing the site’s visibility
    
*    Server rendered components is less reliant on client-side code, reducing some of security vulnerabilities. One of them is [Server-side request forgery (SSRF)](https://cwe.mitre.org/data/definitions/918.html) (what fetch has reported by security audit recently). If JavaScript fails or is disabled on the client side, SSR can ensure that the essential content and functionality remain accessible.
    
*   Network boundary- outlining which UI parts are client or server rendered is allows to combine different UI loading strategies.
    

### Cons:

*   Composability - orchestrating which components has to be requested first before rendering anything else (e.g. with promises). Remix, for instance, has promises with actions and loaders on the route level, but not on components. React Suspense boundary can display UI with loading states and there is more control over the loading states. Also the React hook `useDeferredValue` allows to defer updating a part of the UI with pending data.
    
*   Server side components aren’t suitable for large applications/or static, serverless due to the increased usage of CPU which can result on the higher costs of the infrastructure. Also [worker-threads](https://nodejs.org/api/worker_threads.html) for co-locating data and handling JavaScript operations in parallel isn’t recommended
    

Kent.C.Dodds explained the concepts of the Server Components with custom built RSC framework - And Now You Understand React Server Components, React Summit, [link](https://github.com//epicweb-dev/react-server-components) to the workshop.

## Introducing Chaos to Your Frontend

Thibaud Courtoison was explaining “Magic is organising chaos while oceans of the mystery remain” and introducing concepts of Chaos Engineering with Chaos Frontend Toolkit browser extension [https://chaos-frontend-toolkit.web.app/](https://chaos-frontend-toolkit.web.app/) It involves the different areas of perturbations such as:

*   Request delaying (like network throttling but with the max/min or randomly delays http requests for up to 15000 milliseconds)
    
*   Request failing or Deny list (Fails every http requests from this regex list)
    
*   Localisation tests (i18n, right to left, fonts, spacing) with pseudo-localization
    
*   Timer throttling- when web site is out of focus for a long time, timeouts or intervals are slowed down
    
*   Randomly navigates backward or forward in the app history every 60 seconds.
    
*   Time traveling- testing form submits and client storage with with history API by navigating backward/forward on browser history every X seconds
    
*   Testing form validations with input double click or gremlins- simulates random user actions with mouse and keyboard
    
*   Accessibility- replacing the colors with black and white
    

## Enhancing React Ecosystems with Observability

Enhancing React Ecosystems with Observability: A Deep Dive into React with OpenTelemetry by Jan Peer Stöcklmair.If you ever got a bug ticket from a customer displaying a blank screen, and you have found no good ways of debugging it.

### Monitoring vs Observability

**Monitoring** is collecting, analysing and using info for the tracking program’s progress towards **reaching its objectives**, and to **guide management decisions**.  
**Observability** is to **understand** a system’s **internal state**, by analysing the data it generates, such as logs, metrics and traces.  
**OpenTelementry** focuses on generating and processing the data logs, metrics and traces. Storing and analysing is depending on the vendors.  
**Logs** or LogRecords are important for Request Trace and Span Ids, Timestamp and Body.  
Metrics or Meters & **Instruments** where one instrument is one data point in specific time, e.g how much CPU your software runs at the moment.  
**Meter** is grouping multiple instruments, and **Trace** is a usage journey of a one specific event, e.g. API call with trace ID for the event which consist of span IDs, like a database calls, or another function call. Each Span ID can hold other attributes and **Span Events** which is useful on the tracing the errors and debugging.

### Client tracking
One trace ID would be too hard for debugging 2 to 3h user sessions, therefore a trace ID could be assigned to:

*   e.g. browser reload, browser global events & loading different files (html/css/js)
    
*   random background polling with some endpoint
    
*   user interactions, e.g. onclick event handlers which request APIs
    

Merging the traces is possible with the Instance ID key attributes, which can be added to each of these traces.

### Complexity in Web Server Components

The user cannot experience difference between Server or Client rendered components, because both returns an HTML. If the user navigates to the layouts page, it isn’t fetched as an HTML, but a fetch POST request.  
Server can access database or other vendors directly, e.g. Redis, for retrieving the keys. In another scenario it would call an endpoint on NGINX proxy that will consist of Python event or a new service which would then also have access to the database. With no configuration established for error boundaries and error handling on server level will make the application debugging troublesome.**Distributed tracing**  
Distributed tracing is connecting a trace for a different services, e.g. React and NGING with context propagation via [W3C Trace Context header](https://www.w3.org/TR/trace-context/).  
There is one Trace ID over both services via trace parent header defined by W3C Trace Context or any others. It consist of four components- version, trace ID which connect both services, and the span ID which is the last part of the React app’s span ID and it makes also the first part of the span ID from the connected service, and the trace flags if it’s sampled or not.  
Demo about instrumenting OpenTelemetry for JavaScript on NextJS app: [https://github.com/JPeer264/reactsummit24/commit/0b05c89950d89f26564e90acaca5c1bf5ed491e4](https://github.com/JPeer264/reactsummit24/commit/0b05c89950d89f26564e90acaca5c1bf5ed491e4)

### How to limit the costs on the traces?

Tracing everything in your application will add up in data storage which is limited for free tiers. On Grafana Cloud storage it is 50GB with 14 days of retention and only 3 users.  
OpenTelemetry collector, a receiver can have multiple instances, and NextJS can be a receiver to send the data to the collector. Processors then filter, redact and batch the data which is then transferred to the Loki for collecting the error logs or put into a file. Processing is one of the most important stages along with the context propagation for cloud storage cost savings and planning.

Photo reference- creative coding in handwritten WebAssembly, using the WebAssembly .wat text format. Mentioned in JSNation Justin Schroeder's talk- "Say WAT Now!? Turbocharged JavaScript With Hand Crafted WASM" in JSNation 2024. Repository- [austintheriot/hand-crafted-wasm](https://github.com/austintheriot/hand-crafted-wasm/tree/master).