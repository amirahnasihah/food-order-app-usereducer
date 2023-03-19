# Getting Started

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Installing Dependencies

1. axios
2. react-router-dom
3. json-server
4. material-ui
5. dotenv
6. react-toastify
7. sweetalert2

### 1. axios

`npm i axios`

### 2. react-router-dom

`npm react-router-dom@latest`

### 3. json-server (important)

Setting up JSON server API:

1. create a new folder: **server-api**

2. go to server-api folder -> open in integrated terminal -> type `npm init --yes` to create the `package.json` file

3. Go here: [json-server](https://www.npmjs.com/package/json-server)

4. Follow the instructions:
- - Install JSON Server `npm install -g json-server` (for global), for under the server-api folder `npm install --save json-server`

1. Create a file called `db.json` under the server-api folder. Inside the `db.json` file, we create our resource which will be a JSON object.

```json
// db.js
{
    "contacts": [
        
    ]
}

// after pasting the local storage:
{
  "contacts": [
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

5. Go to `package.json` file, under server-api folder -> go to `"scripts": {...}` -> remove the following: `"test": "echo \"Error: no test specified\" && exit 1"` -> update with this: `"start": "json-server -p 3006 -w db.json"`

6. Open the intergrated terminal under server-api folder -> type: `npm start`

7. go to any of this:

```bash
Resources
http://localhost:3006/contacts

Home
http://localhost:3006
```

### Make Changes so that we can fetch the data from the json server and not from local storage

1. Install AXIOS under the React app folder
2. Create a new folder named `api`. Inside, create a new file named `contacts.js`.
3. Go to the `contacts.js` file, put it like this:

```javascript
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3006/",
});
```

4. Axios is installed so now we can make changes in our React app


## Update CRUD

Use PUT method to update.
**PUT	/tasks/{taskId}	Task	Task	Update a task**

Example; mark tasks completed:

```javascript
fetch('https://PROJECT_TOKEN.mockapi.io/tasks/1', {
  method: 'PUT', // or PATCH
  headers: {'content-type':'application/json'},
  body: JSON.stringify({completed: true})
}).then(res => {
  if (res.ok) {
      return res.json();
  }
  // handle error
}).then(task => {
  // Do something with updated task
}).catch(error => {
  // handle error
})
```

### edit w/ modal or at different page

```javascript
// 1️⃣ItemsProvider
const updateItem = async (id, updatedItem) => {
  try {
    const response = await api.put(`/fakeData/${id}`, updatedItem);
    const updatedData = itemsData.map((item) =>
      item.id === id ? { ...response.data } : item
    );
    setItemsData(updatedData);
    console.log("Item updated successfully");
  } catch (error) {
    console.error(`Error updating item: ${error.message}`);
  }
};

// 2️⃣EditModal
export default function EditModal({ open, onClose, item }) {
  
  const { updateItem } = useItemsCrud();
  const [updatedItem, setUpdatedItem] = useState(item);
  const { name, description, price } = updatedItem;

  // HANDLING SUBMIT OF UPDATE FORM
  const update = async (e) => {
    e.preventDefault();
    try {
      await updateItem(updatedItem.id, updatedItem);
      toast.success("Item updated successfully");
      onClose();
    } catch (error) {
      toast.error(`Error updating item: ${error.message}`);
    }
  };

  // HANDLE INPUT FIELD
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  // 3️⃣HTML FORM
  <form onSubmit={update}>
  
  {/* handle for Name field */}
  <input
  label="Name"
  name="name"
  value={name}
  onChange={handleInputChange}
  />;

  {/* handle for Description text area */}
  <textarea
  rows={4}
  label="Description"
  placeholder="Description"
  name="description"
  value={description}
  onChange={handleInputChange}
  />;

  {/* handle for Price field */}
  <input
  label="Price"
  name="price"
  type="number"
  value={price}
  onChange={handleInputChange}
  />;

  {/* SAVE the updated value */}
  <button type="submit">Save</button>;
  
  </form>
}
```

### edit at the same page

# To put your code folder on GitHub using VS Code, you can follow these steps:

Create a new repository on GitHub.

Go to your GitHub account and click on the "+" sign on the top right corner of the screen.
Select "New repository" from the drop-down menu.
Enter a name for your repository and select the option to make it public or private.
Click on "Create repository" button.
Initialize the repository on your local machine.

Open the terminal or command prompt in VS Code.
Navigate to the folder containing your code.
Run the following commands to initialize the repository:
csharp
Copy code
git init
git remote add origin <repository URL>
Replace <repository URL> with the URL of your GitHub repository.
Commit your code to the local repository.

Stage the files that you want to commit by running the command:
csharp
Copy code
git add .
Commit the changes by running the command:
sql
Copy code
git commit -m "Initial commit"
Push the code to GitHub.

Run the following command to push the code to the GitHub repository:
css
Copy code
git push -u origin main
This command will push the code to the main branch of your GitHub repository.
After following these steps, your code folder should be uploaded to GitHub. You can now view your code on the GitHub website or continue to work on it 