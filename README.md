# Online Louvre

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/bekeeeee/Extreme-Solution-Louvre-Backend)

# Description

This project aims to create a mini online version of the Louvre museum in which guests can login and
view ancient art pieces and know about their history and artists, That required the following:

- service is responsible for authenticate and login users.
- service is responsible for validating whether logged user is permitted to do get, update and delete an art .
- service is resbonsible for loggin users out from the system

# Table of Contents

- [Installation](#installation)

- [Getting started](#gettinStarted)

- [Tests](#tests)

- [Updates](#updates)

- [License](#license)

# Installation

The following necessary dependencies must be installed to run the application properly: nodejs and typescript

# Getting started

- Clone the repository

```
git clone  https://github.com/bekeeeee/Extreme-Solution-Louvre-Backend
```

- Install dependencies

```
npm install
```

- Build and run the project

```
npm run dev
```

Navigate to `http://localhost:5000`

- API Document endpoints

http://localhost:5000/api/v1/users

http://localhost:5000/api/v1/arts

## Testing

The tests are written in Jest.

- Run tests files

```
npm run test

```

## Updates

In the next version we implement forgot password, reset password and using nodemailer.

# License

This project is license under the MIT license.
