/*

how to generate a DAG of cells from a json of cell data

How do we take a collection of cells and generate a directed acyclic graph
of all the cells necessary to properly evaluate a given cell?

collection of cells
--------
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
│ console.log(a + b)                              │ Cell 2
│                                                 │
└─────────────────────────────────────────────────┘
--------

DAG of components necessary to evaluate cell 2
┌────────────────────┐       ┌────────────────────┐
│                    │       │                    │
│  const a = 1;      │       │  const b = 4;      │
│                    │       │                    │
│                    │       │                    │
└──┬─────────────────┘       └────────────────┬───┘
   │       Cell 0                Cell 1       │
   │                                          │
   │                                          │
   │        ┌────────────────────────────┐    │
   │        │                            │    │
   │        │                            │    │
   └───────►│    console.log(a + b)      │◄───┘
            │                            │
            │                            │
            │                            │
            └────────────────────────────┘
                        Cell 2


* On the frontend we can generate a json object containing an array
  which contains objects that have the cell code in string format
  
* We send this object to your backend

























*/
