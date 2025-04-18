# Voom Backend

## API Documentation

## Users Endpoints

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
```

### Endpoint: `/users/profile`

#### Method: `GET`

#### Description:
This endpoint retrieves the profile of the currently logged-in user. The user must be authenticated to access this endpoint.

#### Headers:
| Header         | Value          | Required | Description                     |
|----------------|----------------|----------|---------------------------------|
| `Authorization` | Bearer `<JWT>` | Yes      | The JWT token of the logged-in user. |

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

### Endpoint: `/users/logout`

#### Method: `POST`

#### Description:
This endpoint logs out the currently logged-in user. It invalidates the JWT token by adding it to a blacklist and clears the authentication cookie.

#### Headers:
| Header         | Value          | Required | Description                     |
|----------------|----------------|----------|---------------------------------|
| `Authorization` | Bearer `<JWT>` | Yes      | The JWT token of the logged-in user. |

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "message": "Logged Out Successfully"
}
```

## Captains Endpoints

### Endpoint: `/captains/register`

#### Method: `POST`

#### Description:
This endpoint is used to register a new captain. It validates the input, hashes the password, and saves the captain's details along with their vehicle information in the database.

#### Request Body:
The request body should be in JSON format and include the following fields:

| Field                     | Type   | Required | Description                                                   |
|---------------------------|--------|----------|---------------------------------------------------------------|
| `fullname.firstname`      | String | Yes      | The first name of the captain (minimum 3 characters).          |
| `fullname.lastname`       | String | No       | The last name of the captain (minimum 3 characters).           |
| `email`                   | String | Yes      | The email address of the captain (must be valid).              |
| `password`                | String | Yes      | The password for the captain (minimum 8 characters).           |
| `vehicle.plate`           | String | Yes      | The vehicle's plate number (minimum 3 characters).             |
| `vehicle.color`           | String | Yes      | The color of the vehicle (minimum 3 characters).               |
| `vehicle.capacity`        | Number | Yes      | The capacity of the vehicle (must be a number greater than 0). |
| `vehicle.vehicleType`     | String | Yes      | The type of the vehicle (must be one of `car`, `bike`, or `auto`). |

#### Validation Rules:
- `fullname.firstname` must be at least 3 characters long.
- `fullname.lastname` must be at least 3 characters long (if provided).
- `email` must be a valid email address.
- `password` must be at least 8 characters long.
- `vehicle.plate` must be at least 3 characters long.
- `vehicle.color` must be at least 3 characters long.
- `vehicle.capacity` must be a number greater than 0.
- `vehicle.vehicleType` must be one of `car`, `bike`, or `auto`.

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "message": "Captain Registered Successfully",
  "captain": {
    "_id": "CAPTAIN_ID_HERE",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "plate": "ABC123",
      "color": "Red",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    }
  }
}
```

### Endpoint: `/captains/login`

#### Method: `POST`

#### Description:
This endpoint is used to log in an existing captain. It validates the input, checks the credentials, and generates a JWT token for the captain.

#### Request Body:
The request body should be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                      |
|------------|--------|----------|--------------------------------------------------|
| `email`    | String | Yes      | The email address of the captain (must be valid). |
| `password` | String | Yes      | The password for the captain (minimum 8 characters). |

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
  "captain": {
    "_id": "CAPTAIN_ID_HERE",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "plate": "ABC123",
      "color": "Red",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    }
  }
}
```

### Endpoint: `/captains/profile`

#### Method: `GET`

#### Description:
This endpoint retrieves the profile of the currently logged-in captain. The captain must be authenticated to access this endpoint.

#### Headers:
| Header         | Value          | Required | Description                     |
|----------------|----------------|----------|---------------------------------|
| `Authorization` | Bearer `<JWT>` | Yes      | The JWT token of the logged-in captain. |

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "captain": {
    "_id": "CAPTAIN_ID_HERE",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "plate": "ABC123",
      "color": "Red",
      "capacity": 4,
      "vehicleType": "car"
    },
    "status": "inactive",
    "location": {
      "latitude": null,
      "longitude": null
    }
  }
}
```

### Endpoint: `/captains/logout`

#### Method: `POST`

#### Description:
This endpoint logs out the currently logged-in captain. It invalidates the JWT token by adding it to a blacklist and clears the authentication cookie.

#### Headers:
| Header         | Value          | Required | Description                     |
|----------------|----------------|----------|---------------------------------|
| `Authorization` | Bearer `<JWT>` | Yes      | The JWT token of the logged-in captain. |

#### Response:

##### Success Response:
- **Status Code:** `200 OK`
- **Body:**
```json
{
  "message": "Logged Out Successfully"
}
```