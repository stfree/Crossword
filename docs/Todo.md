## Things to Do:

- You guys don't have to do this (i'll do it) becasue juniors aren't expected to set everything up (I guess) but it's good to know how it works (we'll go over it)
- Run npm init to create npm module **DONE**
  - https://docs.npmjs.com/cli/v8/commands/npm-init
- Set up basic react/express/babel/webpack app **DONE**
  - look into why concurrently --kill-others sends sigterm to express
- install tailwindcss **DONE**
  - https://tailwindcss.com/
- Setup storybook **DONE**
  - https://storybook.js.org/
- Setup jest **DONE**
  - https://jestjs.io/
- Setup Prettier **DONE**
  - https://prettier.io/docs/en/install.html
- Setup eslint **DONE**
  - https://eslint.org/docs/user-guide/getting-started
- Create Test react component **DONE**

---

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

---

### Maybe:

- Maybe it makes sense not to colocate test/story files with app files
- split out eslint rules for both front end and back end
- prisma (orm)
- planetscale (mysql db service)
- trpc (endpoint typescript validation)

---

### Notes:

- I've been struggling in choosing between something like nextjs and a more "standard" react/express app where we explicitly setup webpack and babel and import some particular front end router etc. The basic trade off is this: using something like nextjs reduces start up time and makes things easier at the price of conflating front end and back end notions (which might be especially impactful for a novice). Setting up the regular react/express app with a very obvious distinction between the front end and the back comes at the cost of having to manually set up webpack and babel and other tooling. You also have to make more decisions that something like next would make for you. I think i'm just going to eat the cost of that in order to present to you a clearer model of clien/server architecture. That's my thinking on this so far.
