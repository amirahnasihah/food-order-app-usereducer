# React AXIOS CRUD w/ JSON-server

## Setting up JSON server API

1. create a new folder: **server-api**

2. go to server-api folder → open in integrated terminal (vscode) → type `npm init --yes` to create the `package.json` file.

2. Go here: [json-server](https://www.npmjs.com/package/json-server)

3. Follow the instructions:
-- Install JSON Server type; `npm install -g json-server` (for global), for under the server-api folder `npm install --save json-server`. Recommended use `npm install --save json-server`

4. Create a file called `db.json` under the server-api folder. Inside the `db.json` file, we create our resource which will be a JSON object.

Example:

```json
// db.js
{
    "itemsData": [
        
    ]
}
```

pasting some fake data:

```json
{
  "itemsData": [
    {
      "id": "476a6332-7b79-4c55-bbef-9f5e8ed5b5bd",
      "name": "John",
      "email": "john@example.com"
    },
    {
      "id": "2c40e4f8-24bc-484d-8a39-483e210e1568",
      "name": "Jane",
      "email": "jane@example.com"
    }
  ]
}
```

5. Go to `package.json` file, under server-api folder → go to `"scripts": {...}` → remove the following: `"test": "echo \"Error: no test specified\" && exit 1"` → update with this: `"start": "json-server -p 3006 -w db.json"`

6. Open the intergrated terminal under server-api folder → type: `npm start`

7. Click to go to any of this:

```shell
Resources
http://localhost:3006/itemsData

Home
http://localhost:3006
```

## Re-starting the JSON server

1. if the node_modules folder deleted or not exist
2. type `npm install` → run the server with `npm start` in integrated terminal