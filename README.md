# Test
<p align="center">
    <img src="./docs/img/capstone.png" alt="capstone">
</p>

## Template for Capstone Project

### Tools

- yarn v1.22.10
- node v18.0.0

### Setup

- yarn install
- yarn dev
- visit: localhost:3000

### Storybook

- yarn storybook

### Tests

- yarn test

### Run Jest GUI (majestic)

- yarn mtest

### Run Jest GUI (majestic) and Storybook Concurrently

- yarn smtest

### Prettier

- yarn prettier

### Lint

- yarn lint

## Things to Do:

You guys don't have to do this (i'll do it) becasue juniors aren't expected to set everything up but it's good to know how it works (we'll go over it)

- [x] Run npm init to create npm module
  - https://docs.npmjs.com/cli/v8/commands/npm-init
- [x] Set up basic react/express/babel/webpack app
  - [x] look into why concurrently --kill-others sends sigterm to express
- [x] install tailwindcss
  - https://tailwindcss.com/
- [x] Setup storybook
  - https://storybook.js.org/
- [x] Setup jest
  - https://jestjs.io/
- [x] Setup Prettier
  - https://prettier.io/docs/en/install.html
- [x] Setup eslint
  - https://eslint.org/docs/user-guide/getting-started
- [x] Create Test react component
- [x] Add sourcemaps for local development
- [x] Add webpack watch for client side changes (local development)
- [x] Add jest GUI (majestic)
- [x] Add example of jest snapshot test
  - "Instead of rendering the graphical UI, which would require building the entire app, you can use a test renderer to quickly generate a serializable value for your React tree." - Jest Docs
- [x] Add yarn command to run both majestic and storybook at the same time
- [ ] Think about name for capstone project
- [ ] Create public repo (maybe org too)
- [ ] Add router (Contributors)
- [ ] Add state management (maybe?) (Contributors)
- [ ] Lock down main branch of public repo
- [ ] setup ci for public repo
- [ ] When public repo is stood up create qa and prod environments (probably in aws);

## 3rd Party Libraries

- React Router
  - https://reactrouter.com/docs/en/v6
- Socket.io (for client/server communication)
  - https://socket.io/
- React Flow (for the DAG diagram)
  - https://reactflow.dev/docs/examples/overview/
- allotment (for DAG panel open/close)
  - https://github.com/johnwalley/allotment
- @babel/parser (to parse code as part of the DAGification)
  - https://www.npmjs.com/package/@babel/parser
  - https://babeljs.io/docs/en/babel-parser#docsNav
- react-markdown (to allow users to add markdown cells)
  - https://github.com/remarkjs/react-markdown
- text editor (to be used inside cell)
  - Either:
    - https://uiwjs.github.io/react-codemirror/ (probably this one)
    - https://github.com/microsoft/monaco-editor
- Markdown react component
  - https://playground.lexical.dev/
- Drag and Drop
  - https://github.com/atlassian/react-beautiful-dnd
  - https://react-beautiful-dnd.netlify.app/?path=/story/single-vertical-list--basic
- ZeroMQ
  - https://zguide.zeromq.org/docs/chapter1/

## Maybe:

- split out eslint rules for both front end and back end
- prisma (orm)
    - https://www.prisma.io/
    - https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping
- planetscale (mysql db service)
    - https://planetscale.com/
- trpc (endpoint typescript validation)
    - https://trpc.io/
- Front end State management?
    - https://react-query.tanstack.com/ (for data calls?)
    - https://github.com/pmndrs/jotai (for simple global state, i.e. which cell is active?)
- Create two packages that will make up the backend DAGification procedure
    - A package to generate the DAG and to incrementally update and produce sub-graphs (this package will be agnostic as to the node/edge generation)
    - Another package that parses code (invoking @babel/parser)
    - Use both these on the backend (parse code in cell and then connect cell node to another cell node)
    - Host them on github packages (via npm)
        - https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry

## Notes:

- I've been struggling in choosing between something like nextjs and a more "standard" react/express app where we explicitly setup webpack and babel and import some particular front end router etc. The basic trade off is this: using something like nextjs reduces start up time and makes things easier at the price of conflating front end and back end notions (which might be especially impactful for a novice). Setting up the regular react/express app with a very obvious distinction between the front end and the back comes at the cost of having to manually set up webpack and babel and other tooling. You also have to make more decisions that something like next would make for you. I think i'm just going to eat the cost of that in order to present to you a clearer model of client/server architecture. That's my thinking on this so far.

- Maybe have the path be:

  - client sends request -> DAG is update
  - client invokes cell evaluation -> server generates DAG subgraph -> puts either subgraph in queue or stitched up code in queue -> kernal receives request to evaluate -> sends code to microVM -> receives results object -> puts in queue to send back to server -> server receives results -> puts in db -> client subscribed to db via socket connections gets update and slots in results
    - https://github.com/Nozbe/WatermelonDB

- Socket.io pub/sub with redis between client and server
- Zeromq queue between server and kernel orchestrator

## Back end evaluation of JS code:

- Can we use something like cloudflare workers?
  - No
    - "Disadvantages: No technology is magical, every transition comes with disadvantages. An Isolate-based system can’t run arbitrary compiled code. Process-level isolation allows your Lambda to spin up any binary it might need. In an Isolate universe you have to either write your code in Javascript (we use a lot of TypeScript), or a language which targets WebAssembly like Go or Rust."
      - https://blog.cloudflare.com/cloud-computing-without-containers/
- Here's an interesting idea:
  - Use docker image but transmogrify it into a Firecracker micro-VM
    - https://fly.io/blog/docker-without-docker/
    - Use a service to do this:
      - https://hackernoon.com/how-to-deploy-firecracker-microvms-using-weave-firekube-311h3ug1
      - https://ignite.readthedocs.io/en/stable/usage/
      - https://github.com/weaveworks/ignite
      - https://github.com/weaveworks/ignite/blob/main/docs/footloose.md
      - https://github.com/weaveworks/footloose
    - Run it on an i3.metal EC2 instance (aws)
      - https://aws.amazon.com/ec2/instance-types/i3/
