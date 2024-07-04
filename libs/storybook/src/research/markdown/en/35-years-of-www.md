# 35 Years of WWW

![](https://images.prismic.io/syntia/ZnIUWJm069VX13H8_IMG_20240615_081400_344.jpg?auto=format,compress?auto=compress,format)

JSNation is the main JavaScript conference from 13 to 17th of June in Amsterdam
with 50 speakers, 1.5K attendees and unforgettable social and networking events.
Kromhouthal venue was transformed into a dance floor,💃karaoke 🎤 and outdoor
yard connecting the Likeminds Podium to host C3 dev festival workshops.

While I was highly focused on my speaker’s role during the conference, I
connected with other bright minds that have invested into the Web since the
early 90s. The opportunity to see and introduce ourselves in person shouldn’t be
replaced with anything else, as simple as that. Erick Wendel outlined a vision
about the future of JS events with extended reality and WebXR, that will be a
great challenge along with the manifestations with AI technologies.

![](https://images.prismic.io/syntia/ZnIUaZm069VX13H-_IMG_20240615_163903_740.webp?auto=format,compress?auto=compress,format)
In photo- Who’s Faster at Building an Energy Generation Data Visualisation
Platform: ChatGPT or a Developer? Let is take on this challenge with Chloé Caron

In this article I would like to share a few references about how the Web today
is shaping the technologies that motivates us to study reverse engineering
against the evolutionary increasing JS ecosystem complexity and getting back to
the basics.

If we look into what’s new in AstroJS, for instance, View Transitions is a new
definition for the CSS animated transitions that can be done with a plain HTML &
CSS. Understanding the basics of the Web helps unrevealing the abstractions of
modern JS frameworks. If you’re about to install a new framework or package on
your _node\_modules_, clone the dependencies first and inspect the code you’re
using.

Another example to inspect minified code with the dev tools and overwrite the JavaScript runtime explains Mikhail Korolev in JSNation with "Reverse-Engineering Everything to Get Rid of Trust Issues".

Any Web application can be stopped with "XHR/fetch breakpoints" from the dev tools, and then navigating through the call stack, inspecting the file through IDE to debug desired function and modifying it with "Override content" on dev tool options. In this way any business logic or secrets send to the client can be easily found and exploited through browser.

## Refactoring JavaScript projects
The top 5 issues in all JavaScript projects is that complexity of the functions is too high. Luckily Phil Nash explains how to reduce complexity in code with talk "Conquering Complexity: Refactoring JavaScript projects."

### How to measure complexity?

In 1976 cyclomatic complexity was invented to determine the stability and level of confidence in a program. It scores functions when there is a breaking flow, that is loop or conditionals.

Let's have a look on the example to sum all primes:

```js
function sumOfPrimes(max) { // +1
    let total = 0;
    for (let i = 2; i <= max; i++) { // +1
        let prime = true;
        for (let j = 2; j < i; ++j) { // +1
            if (i % j == 0) { // +1
                prime = false;
            }
        }
        if (prime) { // +1
            total += i;
        }
        return total;
    }
}
// cyclomatic complexity scores 5
```
```js
function getWords(number) { // +1
    switch(number) {
        case 1: // +1
            return "one";
        case 2: // +1
            return "a couple";
        case 3: // +1
            return "a few";
        case 4: // +1
            return "many";
        case 5: // +1
            return "lots";
    }
}
// cyclomatic complexity scores 5
```
Cyclomatic complexity measures the number of paths through a function, but it doesn't measure understandability.

### How to measure understandability?

The cognitive complexity was defined in 1955 for targetting code understandability. It creates score by incrementing "for" breaks in flow (loops/conditionals) and incrementing nesting score.

#### The cognitive complexity within nested loops

```js
function sumOfPrimes(max) {
    let total = 0;
    for (let i = 2; i <= max; i++) { // for loop +1
        let prime = true;
        for (let j = 2; j < i; ++j) { // for loop +1, (nested) +2
            if (i % j == 0) { // conditional +1 (nested) +2
                prime = false;
            }
        }
        if (prime) { // conditional +1
            total += i;
        }
        return total;
    }
}
// cognitive complexity scores 8
```

#### The cognitive complexity for switch statement

```js
function getWords(number) { // +1
    switch(number) {
        case 1: // +1
            return "one";
        case 2: // +1
            return "a couple";
        case 3: // +1
            return "a few";
        case 4: // +1
            return "many";
        case 5: // +1
            return "lots";
    }
}
// cognitive complexity scores 1
```
switch statement adds 1 to the complexity. Each case statement: Adds 0 for each case because we are looking for the one value at the time.

### Dev tools

SonarLint helps users understand complicated code through Cognitive Complexity scoring. Whether you look at the issue in your IDE with SonarLint or in SonarCloud or SonarQube, you can see each of the points in the function that impacts your overall score. 
Find more examples about [Reducing Cognitive Complexity with Sonar](https://www.sonarsource.com/blog/5-clean-code-tips-for-reducing-cognitive-complexity/)
Configure [ESLint](https://eslint.org/) with [eslint-plugin-sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs) or automate code quality (and complexity score) scans with with the [SonarQube](https://www.sonarsource.com/).

### Pop it off the brain stack with refactoring
Reduce nested data structures- invert condition and early exit; structural collapse by reducing nested structures with conditionals; extract helper methods to avoid repetitions and for the testing and naming behavior; other language features such as optional chaning or nullish assignment operator.

![](https://images.prismic.io/syntia/ZnIUgZm069VX13H__IMG_20240615_124156.jpg?auto=format,compress?auto=compress,format)
In photo- Christian Heilmann's talk: 35 Years of WWW: Working as a Content
Creator, Designer and Developer With the Coolest Medium Ever

## Witnessing the death of the web as a news medium

### Christian Heilmann

[Cool URIs don’t change](https://www.w3.org/Provider/Style/URI). The powers of
the web were: being able to link to other resources; remixing, and bookmarking
for later use. Fact is that indexing has become less important.
[38% of web pages that existed in 2013 are no longer accessible now.](https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/)

In other words, the web was about retention and accumulation of content. An ever
growing library that by its very nature was self-indexing and cross-referencing.
And this is what is being actively killed these days.” 

“Back in the late 90s, I worked as a radio newscaster and used computers as a
hobby,” says Christian. Nowadays the job market requires circling around the
technologies that maybe 30 years from now on will be diminished. Witnessing the
strong statement “the death of the web as a news medium” resonated to someone
shouting from the corner of the conference room “why are all of these people
here to listen to?” made me rethink how information conveys are destroyed and
people are not able to find or read what they want due to economy and profit-
centered strategies that are manipulative and have lost the realm of
user-focused, community driven content with high interest in quality of
information and educational or academic purpose.

“It got trickier when news outlets did the same. I remember when the Guardian
and the BBC had full access to the archives. I even remember when other
newspapers and news aggregator content was available to remix. But soon any news
content from the past 30 days was deleted from the web and you had to rely on
Google Cache or The Internet Archive’s WayBackMachine to quote content made a
month ago. Publishers started realizing that throwing out more and short-lived,
dramatic content is how you get the clicks. And this is what it was all about.”

Reference to the full article:
[https://christianheilmann.com/2024/06/03/witnessing-the-death-of-the-web-as-a-news-medium/](https://christianheilmann.com/2024/06/03/witnessing-the-death-of-the-web-as-a-news-medium/)

![](https://images.prismic.io/syntia/ZnIXPpm069VX13IZ_IMG_20240613_110718.jpg?auto=format,compress?auto=compress,format)
Photo from the Andrey Sitnik's talk, Privacy-First Architecture

## Superwebapps: Rethinking Desktop Applications 

### Introduction to Progressive Web Apps by Nico Martin

We need to store data in application logic in a more structured way to cache
entries. Session storage for one session, local storage for a longer time, but
they’re limited with 5mb. IndexedDB is a low level browser API that allows
applications to store and update large amounts of structured data.

Origin private file system allows to create, read and update files in a private
file system. It is part of the users file system, but not visible by other
origin than web application.

Persistent storage API allows request permission to store the data. Typically
web applications can store the data as much as the browser allows for the
available memory left on the browser. File system access API allows web apps to
read and save changes directly to the files and folders on the user's device.
Read file handles “showOpenFilePicker” asks for permissions for a session and
are serializable and can be stored in IndexedDB, and the “createWritable()”
method stores the file. The file handling API allows to register an app as a
file handler within an operating system.

[https://developer.chrome.com/docs/capabilities/web-apis/file-handling](https://developer.chrome.com/docs/capabilities/web-apis/file-handling)

With launchQueue API to receive incoming files. File handling API triggers
action endpoint and launchQueue API consumes the file. It is extremely
convenient for the users.

Project Fugu is a cross-organisation project to bring capabilities to web apps
similar to native device apps.
[https://fugu-tracker.web.app/](https://fugu-tracker.web.app/) Some of the APIs
are particularly useful, for instance, Local Font APIs allow users to access
locally installed fonts and obtain low-level details about it.
[https://developer.chrome.com/docs/capabilities/web-apis/local-fonts](https://developer.chrome.com/docs/capabilities/web-apis/local-fonts)

Adobe, VSCode provides their service and application access directly in Web
browser thanks to the Service Workers and browser APIs. With Progressive Web
APIs are accessible via URL, integrated into OS, works offline and are
incredibly small in comparison with the other cross-platform solutions such as
Tauri, Electron or Java.

Presentation demo: [https://md.nico.dev/](https://md.nico.dev/)

## LIVE CODING

Workshops about digital sound creation and processing with Mercury and Hydra By
[Saskia Freeke](https://sasj.nl/portfolio/) and
[Timo Hoogland](http://www.timohoogland.com/).

Live coding performances at JSNation were an essential activity of the
conference, it was the highlight of the C3 festival and closing event of
JSNation. The collaborative power by engineers and artists from
cross-disciplines working together was unrevealing and liberating.

During the 5h workshop I learned to code in collaborative mode with Mercury and
Hydra by using the amazing Flok live coding environment for the browser
developed by Damián Silvani.

There are 3 options to use Flok with Mercury:

Use Flok to combine Mercury with Hydra visuals (or other languages like Tidal,
Foxdot and SuperCollider) on a localhost

Collaborate together in the same physical room with 1 computer to run Mercury

Collaborate remotely over a network

#### References

[https://github.com/tmhglnd/live-coding-101](https://github.com/tmhglnd/live-coding-101)

[https://blog.toplap.org/](https://blog.toplap.org/)

[http://mercury.timohoogland.com/](http://mercury.timohoogland.com/)

[https://tonejs.github.io/](https://tonejs.github.io/)

[https://github.com/munshkr/flok?tab=readme-ov-file](https://github.com/munshkr/flok?tab=readme-ov-file)

[https://www.youtube.com/@Eulerroom](https://www.youtube.com/@Eulerroom)

<iframe width="560" height="315" src="https://www.youtube.com/embed/4d-5Ox9sELs?si=4kJ19cF3jjFEjn1g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Open source awards

Repeating the tradition, JSNation hosted JavaScript Open Source Awards this year
to highlight one of the most exciting open source projects of 2024 in the JS
ecosystem. The candidate projects were grouped into following categories:

Projects contributing to the JS ecosystem, adding new dimensions to it and
possibilities for further development. New concepts/ideas with big future
potential and good realization in 2023.

rspack - [](https://github.com/web-infra-dev/rspack)
[https://github.com/web-infra-dev/rspack](https://github.com/web-infra-dev/rspack)

solid-start - [](https://github.com/solidjs/solid-start)
[https://github.com/solidjs/solid-start](https://github.com/solidjs/solid-start)

WinterJS - [](https://github.com/wasmerio/winterjs)
[https://github.com/wasmerio/winterjs](https://github.com/wasmerio/winterjs)

Mitosis - [](https://github.com/BuilderIO/mitosis)
[https://github.com/BuilderIO/mitosis](https://github.com/BuilderIO/mitosis)

Projects with on-standard practical JS usage. Mix with non traditional software
and technologies, that makes JS shine boosting development/maintenance
qualifiers.

Effect-TS - [](https://github.com/Effect-TS)
[https://github.com/Effect-TS](https://github.com/Effect-TS)

PartyKit - [](https://github.com/partykit/partykit/)
[https://github.com/partykit/partykit/](https://github.com/partykit/partykit/)

Elysia - [](https://github.com/elysiajs/elysia)
[https://github.com/elysiajs/elysia](https://github.com/elysiajs/elysia)

Hono.js - [](https://github.com/honojs/hono)
[https://github.com/honojs/hono](https://github.com/honojs/hono)

Javy - [](https://github.com/bytecodealliance/javy)
[https://github.com/bytecodealliance/javy](https://github.com/bytecodealliance/javy)

Project/tool that affected the development productivity, making a big difference
and deserves to be adopted.

Biome - [](https://github.com/biomejs/biome)
[https://github.com/biomejs/biome](https://github.com/biomejs/biome)

Nitro - [](https://github.com/unjs/nitro)
[https://github.com/unjs/nitro](https://github.com/unjs/nitro)

Typescript Eslint - [](https://github.com/typescript-eslint/typescript-eslint)
[https://github.com/typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

Vanilla Extract - [](https://github.com/vanilla-extract-css/vanilla-extract)
[https://github.com/vanilla-extract-css/vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)

Node.js Test Runner - [](https://nodejs.org/api/test.html)
[https://nodejs.org/api/test.html](https://nodejs.org/api/test.html)

Projects integrated with use of AI:

Screenshot-to-code [](https://github.com/abi/screenshot-to-code)
[https://github.com/abi/screenshot-to-code](https://github.com/abi/screenshot-to-code)

Draw-a-ui [](https://github.com/SawyerHood/draw-a-ui)
[https://github.com/SawyerHood/draw-a-ui](https://github.com/SawyerHood/draw-a-ui)

Web LLM [](https://github.com/mlc-ai/web-llm)
[https://github.com/mlc-ai/web-llm](https://github.com/mlc-ai/web-llm)

LangChain.js [](https://github.com/langchain-ai/langchainjs)
[https://github.com/langchain-ai/langchainjs](https://github.com/langchain-ai/langchainjs)

Ollama.js [](https://github.com/ollama/ollama-js)
[https://github.com/ollama/ollama-js](https://github.com/ollama/ollama-js)

![](https://images.prismic.io/syntia/ZnIUtJm069VX13IB_IMG_20240613_180926_0.jpg?auto=format,compress?auto=compress,format)
Thanks Inga for joining the event and taking great captures!:)
