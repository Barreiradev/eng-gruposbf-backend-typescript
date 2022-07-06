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
- Typeorm
- Postgres

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

### Run project - with Docker
**Run the below command inside project folder**
```
docker-compose up
```

## Collections and utilities

### Deployment
The application is running on Heroku.\
There are two environments: **development** and **production**.\
Github actions execute the deploy when push happens on branch **develop** and **main**.\
(This is not happening automatically 'cause I don't have an enterprise account, sorry. But you can trigger the actions on the panel.)\

### Postman
Check the **__postman__** folder for a collection with the **development** and **production** urls to test service online.


## Software design/architecture
This application uses clean architecture approach.\
Follow the diagram below and the teardown section for better understanding.

![Application architecute diagram](/arch-core-gruposbf.png)

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
    - Data source

- **Data**
  - Depends on domain layer
  - In this layer use cases are called **application services**
  - Dynamic price service
    - Depends on Data Source
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
    - database
      - Postgres Repository

- **Presentation**
  - Depends on data layer
  - Implements abstract class Controller
    - Controller has perform method, it will be implemented by specific controllers
  - Implements Dynamic price Controller

- **Main**
  - Depends on presentation, infra and data layer
  - This layer will bootstrap all necessary instances to fulfill dependency injection and return a webserver
  - Http routes uses Express adapter and factory methods
