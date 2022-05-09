/*

How do we take a collection of cells and generate a directed acyclic graph
of all the cells necessary to properly evaluate a given cell?


                collection of cells

                ┌─────────────────────────────────────────────────┐
                │                                                 │
                │ const a = 1;                                    │ Cell 0
                │                                                 │
                └─────────────────────────────────────────────────┘
                ┌─────────────────────────────────────────────────┐
                │                                                 │
                │ const b = 4;                                    │ Cell 1
                │                                                 │
                └─────────────────────────────────────────────────┘
                ┌─────────────────────────────────────────────────┐
                │                                                 │
                │ const c = a + b                                 │ Cell 2
                │                                                 │
                └─────────────────────────────────────────────────┘
                ┌─────────────────────────────────────────────────┐
                │                                                 │
                │ console.log(a + c)                              │ Cell 3
                │                                                 │
                └─────────────────────────────────────────────────┘


                DAG of components necessary to evaluate cell 3


                ┌────────────────────┐       ┌────────────────────┐
                │                    │       │                    │
                │  Cell 0            │       │  Cell 1            │
                │                    │       │                    │
                │                    │       │                    │
                └──┬──┬──────────────┘       └────────────────┬───┘
                   │  │                                       │
                   │  │                                       │
                   │  │     ┌────────────────────────────┐    │
                   │  │     │                            │    │
                   │  │     │                            │    │
                   └──┼────►│         Cell 2             │◄───┘
                      │     │                            │
                      │     │                            │
                      │     │                            │
                      │     └────────────┬───────────────┘
                      │                  │
                      │                  ▼
                      │      ┌───────────────────────────┐
                      │      │                           │
                      │      │                           │
                      └─────►│        Cell 3             │
                             │                           │
                             │                           │
                             └───────────────────────────┘


* On the frontend we can generate a json object containing an array
  which contains objects that have the cell code in string format

* We send this object to our backend

* the backend receives the json object and converts it into an
  array holding cell objects which have a cell id and a cell order
  and a code field. As part of this conversion we run either babel/parse
  or acorn to parse the code in each cell and generate a list of identifiers

  [
    {
      cellId: 34314,
      cellPosition: 0,
      code: <code>,
      ...other meta data
    },
    ...
  ]

* we iterate over the array and generate an object of the form:
{
  cell0: [a],
  cell1: [b],
  cell2: [c, a, b],
  cell3: [c, a,]
}

then we iterate over the cell array again with two pointers

[{cell0},{cell1},{cell2},{cell3}]
  ^        ^

the second pointer walks down the array and the first pointer iterates from
0 to second pointer position each time. We do this in order to build up an
adjacency list representing the directed acyclic graph of the form:

{
  0: [2, 3],
  1: [2],
  2: [3],
  3: []
}

once we have this  adjacency list we can generate the DAG. Then when the user
evaluates a cell we can generate a js file of only the cell that was evaluated
plus all the upstream cells it depends on.

For example, if the user evaluates cell 2, we'd walk to cell 2 and the subgraph
of the DAG we'd be working with would be:

Cell 0                        Cell 1
┌────────────────────┐       ┌────────────────────┐
│  const a = 1       │       │ const b = 4        │
└──┬──-──────────────┘       └────────────────┬───┘
   │                                          │
   │              Cell 2                      │
   │       ┌────────────────────────────┐     │
   │       │                            │     │
   └──────►│         const c = a + b    │◄──-─┘
           │                            │
           └────────────--──────────────┘

Then we'd stich the code in these cells (and only these cells) into a js file
that looks something like this:

const a = 1;
const b = 4;
const c = a + b;

and run that through our evaluation pipeline



*/
