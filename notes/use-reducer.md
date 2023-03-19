# useReducer

> sauce 1️⃣ -> [reducer](https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer)
> 2️⃣ -> [useReducer](https://beta.reactjs.org/reference/react/useReducer)

**below examples mostly use switch case statement instead of if else statement**

## 1. reference syntax

```js
const [state, dispatch] = useReducer(reducer, initialArg, init?)
```

Call `useReducer` at the top level of your component to manage its state with a [reducer](https://beta.reactjs.org/learn/extracting-state-logic-into-a-reducer).

```js
import { useReducer } from 'react';

function myReducer(state, action) {
  // ...
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });
  // ...
```

### parameters - useReducer

**`useReducer(reducer, initialArg, init?)`**

- `reducer`: The `myReducer` function that specifies how the state gets updated. It must be pure, should **take the state and action as arguments, and should return the next state**. State and action can be of any types (string, boolean, number).

- `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next `init` argument.

- **optional** `init`: The initializer function that specifies how the initial state is calculated. If it’s not specified, the initial state is set to `initialArg`. Otherwise, the initial state is set to the result of calling `init(initialArg)`.

### returns - useReducer

`useReducer` returns an array with exactly **two values**:

1. The current state. During the first render, it’s set to `init(initialArg)` or `initialArg` (if there’s no `init`).

2. The **`dispatch` function** that lets you update the state to a different value and trigger a re-render.

## 2. `dispatch` function

The `dispatch` function returned by `useReducer` lets you **update the state to a different value and trigger a re-render**.

You need to **pass the action as the only argument to the dispatch function**:

```js
const [state, dispatch] = useReducer(reducer, { age: 42 });

function handleClick() {
    dispatch({ type: 'incremented_age' });
    // ...
```

React will set the next state to the result of calling the `myReducer` function you’ve provided with the current `state` and the action you’ve passed to `dispatch`.

<!-- MALAY TRANSLATION BTS LOGIC
1️⃣ `dispatch({ type: 'incremented_age' });`

- dispatch function yang dikembalikan oleh useReducer membolehkan kita update the state to a different value and also trigger a re-render.

- also, require hanya pass-kan the action as the ONLY argument ke kat dispatch function.


2️⃣`function myReducer (state, action) { // ... }`

- then, react akan set-kan state yg seterusnya based on result yg kita calling myReducer() function, yg ada sekali dgn two arguments iaitu state and action yg kita dah pass-kan ke kat dispatch.
-->

### paramaters - `dispatch` function

- `action`: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a `type` property identifying it and, optionally, other properties with additional information.

<!-- MALAY TRANSLATION BTS LOGIC

🔸`function myReducer (state, **action**) { // ... }`

`action`: Tindakan yang dilakukan oleh pengguna. apa2 jenis nilai boleh. Selalunya, action adalah js Object dgn `type` sbg property.

-->

### returns - `dispatch` function

`dispatch` functions do not have a return value.

# USAGE - Step by step how

## Adding a reducer to a component

```js
import { useReducer } from 'react';

function reducer(state, action) {
    // ...
}

const initialState = { age: 42 }

function MyComponent() {
    const [state, dispatch] = useReducer(reducer,initialState);
    // ...
```

1. `useReducer` returns an array with exactly two items:

1️⃣ - The `current state` of this state variable, initially set to the `initial state` you provided.

<!--

current state refers to this: [state, dispatch]

initial state refers to this: { age: 42 }

-->

2️⃣ - The `dispatch function` that lets you change it in response to interaction.

To update what’s on the browser, call `dispatch` **with an object representing what the user did**, called an *action*:

```js
function handleClick() {
  dispatch({ type: 'incremented_age' });
}
```

<!--

dispatch function refers to this: [state, dispatch]

action: dispatch( {type: "past_tense_action_by_users"} )

// action like `what the user just did??`
-->

2. React will pass the current state and the action to your `reducer function`. Your reducer will calculate and return the next state. React will store that next state, render your component with it, and update the UI.

<!--

🔸`function myReducer(state, action) { // ... }`

reducer function refers to this: myReducer()

-->

#### full example

```js
import { useReducer } from 'react';

function reducer(state, action) {
  if (action.type === 'incremented_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

const initialState = { age: 42 }

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <button onClick={() => {
        dispatch({ type: 'incremented_age' })
      }}>
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}
```

<iframe src="https://codesandbox.io/embed/jovial-sun-d55wkt?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="jovial-sun-d55wkt"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

# AVOID and Solution

## Avoid recreating the initial state

React saves the initial state once and ignores it on the next renders.

example below to avoid:

```js
function createInitialState(username) {
    // ...
}

function TodoList({ username }) {
    const [state, dispatch] = useReducer(reducer, createInitialState(username));
    // ...
```

Although the result of `createInitialState(username)` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating large arrays or performing expensive calculations.

**SOLUTION**

To solve this, you may pass it as an initializer function to useReducer as the third argument instead:

```js
function createInitialState(username) {
    // ...
}

function TodoList({ username }) {
    const [state, dispatch] = useReducer(reducer, username, createInitialState);
    // ...
```

Notice that you’re passing `createInitialState`, which is the ***function itself***, and NOT `createInitialState()`, which is the result of calling it. This way, the initial state does not get re-created after initialization.

In the above example, `createInitialState` takes a `username` argument. If your initializer doesn’t need any information to compute the initial state, you may pass `null` as the second argument to `useReducer`.

## The difference between passing an initializer and passing the initial state directly

# Basic useReducer examples - Form, Todo List, Immer (use switch case statement)

[Basic useReducer examples](https://beta.reactjs.org/reference/react/useReducer#examples-basic)

1️⃣ Example 1 of 3:
Form (object)

In this example, the reducer manages a state object with two fields: `name` and `age`.

<iframe src="https://codesandbox.io/embed/sad-wildflower-fjrfuh?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="sad-wildflower-fjrfuh"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>


2️⃣ Example 2 of 3:
Todo list (array)

In this example, the reducer manages an array of tasks. The array needs to be updated without mutation.

<iframe src="https://codesandbox.io/embed/kind-johnson-fskt7s?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="kind-johnson-fskt7s"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

3️⃣ Example 3 of 3:
Writing concise update logic with Immer

If updating arrays and objects without mutation feels tedious, you can use a library like Immer to reduce repetitive code. Immer lets you write concise code as if you were mutating objects, but under the hood it performs immutable updates:

<iframe src="https://codesandbox.io/embed/hidden-wildflower-hshcri?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="hidden-wildflower-hshcri"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

## useReducer -  `if/else` statements

```js
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [
      ...tasks,
      {
        id: action.id,
        text: action.text,
        done: false,
      },
    ];
  } else if (action.type === 'changed') {
    return tasks.map((t) => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter((t) => t.id !== action.id);
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}
```

## console.log of useReducer

```javascript
export default function tasksReducer(tasks, action) {
  // tasks is the existing state -> contain 3 initial state data of object
  // action is the new state -> contain `type` (mmg ada) + `task` property
  console.log("tasks:", tasks, "action:", action);

  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case "changed": {
      return tasks.map((t) => {
        // t shows all each of the data object line by line
        // console.log("changed - map (t)", t);
        if (t.id === action.task.id) {
          // action.task.id shows the id of each data object
          // action.task shows the detail of each data object
          // action shows the id of each data array with type + task property
          // console.log("action.task.id", action.task.id);
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
```

### debug

**Update Functionality**

- Observe the changes. Look at the line **354**

```javascript
// ✅ Correct

else if (action.type === "updated") {
    return state.map((i) => {
      if (i.id === action.item.id) {
        return action.item;
      } else {
        return i;
      }
    });
  }
```

```javascript
// ❌ Wrong

else if (action.type === "updated") {
    return state.map((item) => {
      if (item.id === action.state.id) {
        return action.state;
      } else {
        return item;
      }
    });
  }
```