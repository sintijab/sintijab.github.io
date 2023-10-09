# Open Source CMS with Storybook & Remirror

Build fully customizable **CMS for creating, storing, and publishing digital content**. In this project Astro JS framework has built-in MD and MDX file support. [Markdown](https://daringfireball.net/projects/markdown/) is commonly used to author text-heavy content like blog posts and documentation.

## Editing bulk content with Astro JS

[Content collections](https://docs.astro.build/en/guides/content-collections/) helps organizing content, validate your frontmatter, website preliminary matter, and provide automatic TypeScript support while working with content.

**Building Web application multi lingual context** with [Astro JS](https://docs.astro.build/en/getting-started/), Remirror and Storybook has enabled fast and scalable content management. Managing only one file source held in mono-repository with powerful editing via [Visual Studio Code](https://code.visualstudio.com/) and [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) allowed me to make hundreds of file changes with a single search and replace pattern. It also allows to setup multiple packages in a way to **automate the development workflow** and run **one command to install and manage all** of them in a single pass.

## Blow up by collaborative editing

Remirror is a HTML rich text editor adopting [Prosemirror](https://prosemirror.net/) and TypeScript. ProseMirror is a standard toolkit for building rich text editors. [Remirror](https://remirror.io/docs) provides extensions, that abstract over various **ProseMirror concepts** such as schemas, commands and plugins, making it much simpler to **build extensions** and **connect visual editing with UI elements**.

Model highlights/comments as marks instead of annotations allows **collaborative editing for undo, copy and paste, and edit** or move already formatted rich text elements across the web.

Writing text in the editor is typically the central use case when building rich-text editors. Yet, working with text is equally important. For example, highlight important snippets with a color, font style or add comment to discuss a paragraph with someone else.

## **Automated workflows**

The web’s universality is pushing more complexity into the frontend and User Interfaces. It began with responsive web design, which turned every user interface from one to thousand of different user interfaces. Over the time with additional requirements like devices, browsers, accessibility, performance, and async states, **the Web development is more demanding**.

Component-driven tools like React, Vue, and Angular help break down complex UIs into simple components but they’re not silver bullets. Mature projects can contain **hundreds of components that yield thousands of discrete variations**. To complicate matters further, those UIs are painful to debug because they’re entangled in **business logic, interactive states, and app context.**

Nevertheless the content creation for bulk editing is always linked with the User Interface which grows in complexity in two directions- one is all-in-one Content Management System interface controlling the domain. The second is the mirroring source code platform, a domain adapter or class that wraps a domain and provides additional methods to enhance testability.

**The breadth of modern frontends overwhelm existing workflows.** Developers must consider countless UI variations, yet aren’t equipped to develop or organize them all. You end up in a situation where UIs are tougher to build, less satisfying to work on, and brittle.

Storybook is packaged as a small, development-only, [workshop](https://bradfrost.com/blog/post/a-frontend-workshop-environment/) that lives alongside your app. It provides an isolated iframe to render components **without interference from app business logic and context**.

Storybook enables capturing UI variations as “stories”. When developing a component variation in isolation, save it as a story. When writing an article, save it as a story in notebook. Storybook is mostly known for **Design System workshop**. By creating granular UI component variation designers, engineers and teams in collaborative mode are using those stories **for software development, testing, and documentation**.

Each story allows us to demonstrate a specific variation of the component to verify appearance and behavior. The Remirror Editor integration with Storybook is suitable for most of the UI frameworks and is powerful content creation and editing framework.

Storybook is built as a static web application, you can also **publish it to any web host**, including GitHub Pages, Netlify, AWS S3, and more.

The top frontend engineering teams rely on Storybook to ship world-changing products.