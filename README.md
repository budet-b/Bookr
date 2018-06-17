![Banner](https://github.com/alextoub/js-project/blob/master/resources/Banner.png)

**Book'R** is a bookmark manager for iOS and Android that allows the user
to log his read books and compare his reading progress with his friends.

**JS Project** made for an _EPITA's (4th year) project_.
By:
- Benjamin Budet (_budet\_b_) - [budet-b](https://github.com/budet-b)
- Alexandre Toubiana (_toubia\_b_) - [alextoub](https://github.com/alextoub)


## Requirement

- [Node](http://nodejs.org)
- [PostgreSQL](http://postgresql.org)
- [React Native](https://facebook.github.io/react-native/)

## The platform

![BookR](https://github.com/alextoub/js-project/blob/master/resources/BookR.png)

You can access to the API [here](http://bookr-api.herokuapp.com) hosted on
[heroku](https://www.heroku.com)

## Installation

### Backend

#### Database (PostgreSQL)

1. Get into the [backend/db](https://github.com/alextoub/js-project/tree/master/backend/db) folder.
2. Create the database
```bash
$ pg_ctl start
$ psql postgres -c "CREATE DATABASE bookr"
```
3. Get into the database using postgreSQL
```bash
$ psql bookr
```
4. Initalize and seed the database.
```sql
bookr=# \i ./init_db.sql
bookr=# \i ./datas.sql
```

#### API (NodeJS)

1. Get into the [backend/api](https://github.com/alextoub/js-project/tree/master/backend/api) folder.
2. Install and start the project
```bash
$ npm install
$ npm start
```
3. You can now access the API on [http://localhost:8080](http://localhost:8080)

### Frontend (React Native)

1. Get into the [frontend/Bookr](https://github.com/alextoub/js-project/tree/master/frontend/Bookr) folder.
2. Install and start the project
```bash
$ npm install
$ npm start
```
3. Launch the app on simulator or by scanning the QR Code to open the app on
Expo on your device.