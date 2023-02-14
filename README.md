# Truffle Health - Backend Software Engineering Internship Assessment

## Walkthrough

In your console:

- `npm start`: Begins the program and listens on port 3000
- `npm test`: Begins the test program in the console

## Postman Walkthrough

Requirements: [Postman](https://www.postman.com/downloads/)

1. In your console, type and enter `npm start`
2. Start up Postman and create a new request.

To perform GET requests:

1. Set the request URL to `http://localhost:3000/items/`
2. To GET all bills in memory: Send the request as is
3. To GET a bill with a specific id: Change the request URL to `http://localhost:3000/items/id`; Replace "id" in the request URL with the specific bill id and send the request

To perform POST requests:

1. Set the request URL to `http://localhost:3000/items/`
2. Under Body tab: Select "raw" and input a medical bill in the following format:

   ```{
      "id": 1,
      "patientName": "Leo Chung",
      "patientAddress": "123 Truffle St",
      "hospitalName": "Coney Island Hospital",
      "dateOfService": "2023-01-01",
      "billAmount": 10
    }
   ```

3. Send the request and review the response
