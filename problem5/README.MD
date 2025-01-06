### MINI SERVER USING Express - Typescript

This project implements a simple RESTful API for managing employee data using Express.js and TypeScript.

Features:
CRUD Employee Resource.<br/>
Database: MongoDB<br/>
Error Handling: Includes basic error handling with appropriate HTTP status codes:
200: OK<br/>
201: Created<br/>
204: No Content (on successful deletion)<br/>
404: Not Found<br/>
Swagger Documentation: Swagger UI is integrated for easy API exploration at <strong>/api-docs</strong>.<br/>
Environment Variables:<br/>
<strong>PORT</strong>: define port to start the server.<br/>
 default:   ```3000```
<strong>MONGODB_URI</strong>: define the connection string to MongoDB.<br/>
default:
```
mongodb+srv://nhatthanhtranho:nhatthanh123@cluster0.kmr8e.mongodb.net/employeeDB
```
Getting Started:
Install Dependencies:

```
npm install
```

Create <strong>.env</strong> file:

Copy <strong>.env.example</strong> to <strong>.env</strong> file.<br/>
Run in Development:


```
npm run dev
```
Build Production version:
```
npm run build
```
Run in Production:
```
npm run start
```
API Endpoints:

```GET /employees```

Retrieves a list of all employees.
Optional query parameters for filtering (fullName, role).<br/>
```GET /employees/:id```

Retrieves a single employee by their ID.<br/>
```POST /employees```

Creates a new employee and returns the created employee.<br/>
```PUT /employees/:id```

Updates an existing employee by their ID.<br/>
```PATCH /employees/:id```

Updates an existing employee by their ID.<br/>
```DELETE /employees/:id```

Deletes an employee by their ID.