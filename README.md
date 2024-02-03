# sahakshak-backend

This is the backend of our project sahakshak. Sahakshak is a service for police department for case management.

## API Documentation

| Endpoint                 | Method | Description                                     | Request Body |
| ------------------------ | ------ | ----------------------------------------------- | ------------ |
| `/`                      | GET    | Dummy route to check if the API is working      | N/A          |
| `/api/cases`             | GET    | Retrieve all cases stored in the system         | N/A          |
| `/api/cases/:id`         | GET    | Retrieve a single case by its unique identifier | N/A          |
| `/api/cases`             | POST   | Create a new case                               | See below    |
| `/api/cases/phone/:phno` | GET    | Retrieve cases by phone number                  | N/A          |
| `/api/cases/:id`         | DELETE | Delete a case by its unique identifier          | N/A          |
| `/api/cases/:id`         | PUT    | Update all case data by its unique identifier   | See below    |

### Request Body for Creating a Case

```json
{
  "title": "String",
  "description": "String",
  "name": "String",
  "gender": "String (Male/Female/Other)",
  "age": "Number",
  "location": "String",
  "address": "String",
  "pinCode": "String",
  "phoneNumber": "String",
  "email": "String",
  "timeOfCrime": "Date",
  "suspect": "String"
}
```

## Criminal Routes

| Endpoint                      | Method | Description                                 | Request Body |
| ----------------------------- | ------ | ------------------------------------------- | ------------ |
| `/api/criminals`              | POST   | Create a new criminal record                | See below    |
| `/api/criminals`              | GET    | Retrieve all criminals stored in the system | N/A          |
| `/api/criminals/:id`          | GET    | Retrieve a single criminal by ID            | N/A          |
| `/api/criminals/:id`          | PUT    | Update a criminal by ID                     | See below    |
| `/api/criminals/:id`          | DELETE | Delete a criminal by ID                     | N/A          |
| `/api/criminals/case/:caseId` | GET    | Retrieve criminals by case ID               | N/A          |

### Request Body for Creating a Criminal

```json
{
  "caseId": "MongoDB ObjectID of the related case",
  "name": "String",
  "gender": "String (Male/Female/Other)",
  "age": "Number",
  "address": "String",
  "crime": "String",
  "status": "String (Wanted/Arrested/Released)"
}
```

| Endpoint                     | Method | Description                                | Request Body |
| ---------------------------- | ------ | ------------------------------------------ | ------------ |
| `/api/evidence`              | POST   | Create a new evidence record               | See below    |
| `/api/evidence`              | GET    | Retrieve all evidence stored in the system | N/A          |
| `/api/evidence/:id`          | GET    | Retrieve a single evidence by ID           | N/A          |
| `/api/evidence/:id`          | PUT    | Update an evidence by ID                   | See below    |
| `/api/evidence/:id`          | DELETE | Delete an evidence by ID                   | N/A          |
| `/api/evidence/case/:caseid` | GET    | Retrieve evidence records by case ID       | N/A          |

### Request Body for Creating an Evidence Record

```json
{
  "caseId": "MongoDB ObjectID of the related case",
  "type": "String",
  "description": "String",
  "locationFound": "String",
  "foundBy": "String",
  "foundOn": "Date and time in ISO 8601 format (e.g., 2024-01-28T12:00:00Z)",
  "collectedBy": "String",
  "collectedOn": "Date and time in ISO 8601 format (e.g., 2024-01-28T14:30:00Z)"
}
```
