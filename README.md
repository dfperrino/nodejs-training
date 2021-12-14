# Introduction to NodeJS Course Material

The course covers basic NodeJS and Express concepts and has been taught by the
Minsait Valladolid front team in December 2021.

This project was bootstrapped with
[Express Generator](https://expressjs.com/es/starter/generator.html).

## Download and Install

After downloading the repository from Github, enter the following commands into
your command line from the project folder:

`npm install`

`npm start`

Then go to localhost:3000

## Each Lesson is a Git Branch

To view the code for a given lesson, checkout the appropriate branch name. The
branch will have the finished code from that lesson.

## Installing lesson branches

All the branches are checked out to your local machine automatically when you do
npm install. Just do a git branch to verify and see all branches after. If they
didn't appear, try running npm run branches to download all the branches.

To view a branch: git checkout [branch-name]

### Additional Tools

For Data Management lessons, it's required to install additional tools to manage
databases.

There is not only one way to perform the required environment but it's
recommended to use Docker for this purpose. Once Docker was installed on your
local machine, we provide scripts to setup the required containers.

In addition to Docker, it is heavily recommended to install some GUI tools to
review the content of our databases.

We recommend:

- For SQL database: [DBeaver](https://dbeaver.io/download/)
- For Mongo databas: [Robo 3T](https://robomongo.org)

## Useful links

- [Express Generator](https://expressjs.com/es/starter/generator.html)
- [Adding typescript to your express application](https://levelup.gitconnected.com/how-to-properly-set-up-express-with-typescript-1b52570677c9)
- Data Management Libraries:
  - [Sequelize](https://sequelize.org)
  - [TypeORM](https://typeorm.io/#/)
  - [Knex](https://knexjs.org)
  - [Mongoose](https://mongoosejs.com)
