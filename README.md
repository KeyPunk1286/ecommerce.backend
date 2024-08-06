Розгортання проекту

# 1. DOCKER .

створення нової локальної бази даних
За допомогою такої команди можна створити локально нову пусту базу данних postgres

docker run --name myPostgresDb -p 5455:5432 -e POSTGRES_USER=postgresUser -e POSTGRES_PASSWORD=postgresPW -e POSTGRES_DB=postgresDB -d postgres

Наприклад:

```
docker run --name EcommerceDB -p 5555:5432 -e POSTGRES_USER=ecommerce -e POSTGRES_PASSWORD=ecommerce -e POSTGRES_DB=ecommerce -d postgres
```

# 2. Підключення до бази даних .

- Створіть файл .env та скопійюйте в нього зміст файлу: .env.example
  (в даному випадку данні команди створення бази даних в докері та
  данні у файлі .env.example співпадають - ви можете їх змінити
  на будь-які свої.)

# 3. Розгартання бази даних .

- Встановлення залежностей це можна зробити так:

```
npm install
```

- першочергово нам треба створити таблиці у базі даних так як
  наразі вона пуста - потрібно запустити міграції, це можна зробити
  за допомогою цієї команди:

```
npx sequelize-cli db:migrate
```

- далі нам потрібно заповнити в цій таблиці якимись даними
  так як наразі таблиці пусті, це можна зробити за допомогою
  цієї команди:

```
npx sequelize-cli db:seed
```
