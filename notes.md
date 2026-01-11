# body-parser

- parses incoming request bodies so we can access req.body

# cookie-parser

- parses cookies so we can access req.cookies easily.

# How they work together

- User sends email & password → body-parser
- Server validates → creates JWT
- JWT stored in cookie → cookie-parser
- Protected routes read token from cookie

# CORS( Cross Origin Resource Sharing)

**Browser Security Rule**

- A frontend running on one origin cannot access a backend on another origin
  unless the backend allows it.( So we cannot sent request and get response)
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Browser blocks the request(backend must explicitly allows it using CORS)
- app.use(cors()) ==> "Allows request from any origin with default setting"

# Flow of backend

1. npm init -y
2. npm install express mongoose cors dotenv jsonwebtoken bcrypt cookie-parser
3. npm install -D nodemon

**_Express_** → Creates the server and handles requests & responses

**_Mongoose_** → Talks to MongoDB in an organized way

**_dotenv_** → Keeps secrets safe (passwords, DB URL)

**_bcrypt_** → Secures passwords by hashing

**_jsonwebtoken (JWT)_** → Creates digital identity (login token)

**_cookie-parser_** → Reads cookies sent by the browser

**_cors_** → Controls which frontend can talk to backend

**_nodemon_** → Developer helper (auto restart server)

**express.json()** → (middleware) reads json data sent from client and converts
it into JS object. - Frontend sends data in JSON format (PUT/POST request) -
Express cannot reads JSON by default. - express.json() parses the request
body. - without it req.body=undefined

4. index.js (entry point)

- load env variables
- Import different libraries like express, dotenv, cors(),
- Connect DB
- Register global middleware
- Register routes
- Starts server

5. create config/utils folder [Reusable setup logics]

- DB connection
- Token generation

6. routes folder [URL handler]

- Define endpoints
- Maps URL to controller

7. controller folder [Business logics]

**_Handles_**

- creating Auth controller for signup,signin and signout
- Includes Input validations
- DB operations
- Password hashing
- Token adding
- cookies setup
- sending response

**JWT & Cookies – “Digital ID Card”**

**_After login/signup_**

- Backend validates input data
- Backend created token
- Token is stored in cookie
- Cookie is send automatically with every request.
- Backend does not
  - ask for Email and password again
  - Store login state in memory
- Backend verify token every protected request.

8. middleware Folder – “Security Checkpoint”

**_Middleware runs before controller_**

- Checks if user is login
- Validate token
- Role-based access

**Credentials (email & password) are used \***ONLY-ONCE**_ - during Login/SignUp
after login that credentials are not sent again. Backends checks if email exists
does password match if correct backend created _**JWT**_ and stores JWT in
Cookie. if we do not have middleware _**Anyone can call APIs**\*
[Browser,Hacker,BOT,Postman]. Backend does not ask for credentials for every
request made after login it always use only token to verify users in each
request through middleware **

- **_NOTES_**

**Credentials are used only during login/signup after that, JWT is used on every
request via middleware to identify and authorize the user.**
