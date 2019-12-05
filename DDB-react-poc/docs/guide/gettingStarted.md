# Setting Up

## Cloning Repository

1. Clone the audit repository using `git clone https://stash.caseware.com/scm/sol/audit.git`

2. Checkout the branch **DDB-react-poc** with `git checkout DDB-react-poc`

3. Navigate to the folder `DDB-react-poc` inside the root of the repo.




## Running Development Environment

1. Install npm packages `npm install`

2. To run the DDB 2.0 development server: `npm start`

3. To run the docs development server: `npm run docs:dev`


## Reinstalling Dependencies

Sometimes during development the need arises to reinstall all dependencies of the project - usually because of the development server being buggy. Surpisingly this seemingly simple task can actually be quite complicated sometimes.

Unfortunately, npm does not offer a command to reinstall all dependency libraries so to reinstall everything you need to delete the `node_modules` folder and then run `npm install` again.

**Note:** it is quite common to run into an error saying that the node_modules folder cannot be deleted. In the case of this happening a restart of your computer is needed in order to delete it completely.