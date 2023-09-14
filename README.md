# How to Install

- Make sure you already setup Node / NPM in your machine.

For this project, I prefer using pnpm. You can set up to your machine with this following [https://pnpm.io/installation](link).
After setup pnpm, run command:

```
pnpm install
```
Since this project is Fullstack and use `mysql` as database, please make sure it already installed on your computer. After `mysql` installed in your machine, please run this command to setup your database:

```
pnpm dlx prisma migrate dev --init
```

This command will create the database for you.

After installing, please **Run data seeder** with this command:
```
pnpm seed
```

Then, login with user:
```
email: admin@brik.id
password: admin123