# Grupo SBF - Code Challenge

## Description
Calculate a dynamic price based on a price, currency code and codein currency codes.\
Get currency prices from a third party api, case the third party api is unavailable it queries data from a database.

## Features available

## Built with
- Typescript
- NodeJS
- Express
- Axios
- Jest

## Setup project
**Build**
```
npm run build
```

**Start**
```
npm run start
```

### Run unit tests
```
npm run test
```

### Run integration tests

### Run project - without Docker

### Run project - with Docker
**Run the below command inside project folder**
```
docker-compose up
```

## Collections and utilities

## Software design/architecture
This application uses clean architecture approach.\
Follow the diagram below and the teardown section for better understanding.

![Application architecute diagram](/app-architecture.png)

- **Domain**
  - Inner layer
  - Doesn't depends on any other layer
  - Defines the system entities:
    - Dynamic price
      - Data source info
      - Price in
  - Defines the system use cases:
    - Dynamic price
    - Dynamic price calculator

- **Data**
  - Depends on domain layer
  - In this layer use cases are called **application services**
  - Dynamic price service
    - Depends on httpClient to request data **(THIS WILL CHANGE LATER)**
    - Depends on Dynamic price calculator service
  - Dynamic price calculator
    - Calculates a dynamic price
    - ***Taxes and other stuff are not considered in this calculus by now. To implement this, please add a usecase on domain and implement on this layer.***

- **Infra**
  - Provides tools (such as package implementations) for data and presentation layer
  - Implements external libraries:
    - http
      - Axios - http client
      - Express - http server
    - database **(TODO)**
      - Postgres Repository **(TODO)**

- **Presentation**
  - Depends on data layer
  - Implements abstract class Controller
    - Controller has perform method, it will be implemented by specific controllers **(WHY INHERITANCE AND NOT INTERFACE, ADD COMMENT LATER)**
  - Implements Dynamic price Controller

- **Main**
  - Depends on presentation, infra and data layer **(ADD ARROW ON DIAGRAM TO PRESENTATION LATER)**
  - This layer will bootstrap all necessary instances to fulfill dependency injection and return a webserver
  - Http routes uses Express adapter and factory methods
