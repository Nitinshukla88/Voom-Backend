# Voom Backend

## API Documentation

### Endpoint: `/users/register`

#### Method: `POST`

#### Description:
This endpoint is used to register a new user. It validates the input, hashes the password, and generates a JWT token for the user.

#### Request Body:
The request body should be in JSON format and include the following fields:

| Field               | Type   | Required | Description                                      |
|---------------------|--------|----------|--------------------------------------------------|
| `fullname.firstname` | String | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastname`  | String | Yes      | The last name of the user (minimum 3 characters).  |
| `email`             | String | Yes      | The email address of the user (must be valid).   |
| `password`          | String | Yes      | The password for the user (minimum 8 characters). |

#### Validation Rules:
- `fullname.firstname` must be at least 3 characters long.
- `fullname.lastname` must be at least 3 characters long.
- `email` must be a valid email address.
- `password` must be at least 8 characters long.

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "token": "JWT_TOKEN_HERE",
  "newUser": {
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password_here",
    "socketId": null,
    "_id": "USER_ID_HERE"
  }
}
```

### Endpoint: `/users/login`

#### Method: `POST`

#### Description:
This endpoint is used to log in an existing user. It validates the input, checks the credentials, and generates a JWT token for the user.

#### Request Body:
The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                      |
|------------|--------|----------|--------------------------------------------------|
| `email`    | String | Yes      | The email address of the user (must be valid).   |
| `password` | String | Yes      | The password for the user (minimum 8 characters). |

#### Validation Rules:
- `email` must be a valid email address.
- `password` must be at least 8 characters long.

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password_here",
    "socketId": null
  }
}