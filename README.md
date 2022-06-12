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

- You guys don't have to do this (i'll do it) becasue juniors aren't expected to set everything up (I guess) but it's good to know how it works (we'll go over it)
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
- [ ] Create public repo (maybe org too)
- [ ] Lock down main branch of public repo
- [ ] setup ci for public repo
- [ ] When public repo is stood up create qa and prod environments (probably in aws);

### 3rd Party Libraries

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
- Drag and Drop
  - https://github.com/atlassian/react-beautiful-dnd
  - https://react-beautiful-dnd.netlify.app/?path=/story/single-vertical-list--basic
- ZeroMQ
  - https://zguide.zeromq.org/docs/chapter1/

### Maybe:

- Maybe it makes sense not to colocate test/story files with app files
- split out eslint rules for both front end and back end
- prisma (orm)
- planetscale (mysql db service)
- trpc (endpoint typescript validation)

### Notes:

- I've been struggling in choosing between something like nextjs and a more "standard" react/express app where we explicitly setup webpack and babel and import some particular front end router etc. The basic trade off is this: using something like nextjs reduces start up time and makes things easier at the price of conflating front end and back end notions (which might be especially impactful for a novice). Setting up the regular react/express app with a very obvious distinction between the front end and the back comes at the cost of having to manually set up webpack and babel and other tooling. You also have to make more decisions that something like next would make for you. I think i'm just going to eat the cost of that in order to present to you a clearer model of clien/server architecture. That's my thinking on this so far.

- Figure out if I'm using child props correctly
- Figure out if I'm setting defaultprops values correctly

- Maybe have the path be:
  - client sends request -> DAG is update
  - client invokes cell evaluation -> server generates DAG subgraph -> puts in queue -> kernal recieves request to evaluate -> sends code to microVM -> receives results object -> puts in queue -> server receives results -> puts in db -> client subscribed to db via socket connections gets update and slots in results
    - https://github.com/Nozbe/WatermelonDB
