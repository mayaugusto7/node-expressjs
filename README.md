# node_expressjs

# cli express
npm install -g express-generator

# create a new project
express name_project

-e jade template
-c compiler sass or less
-f force

express -e -c less -f cli-app

# run project cli
cd cli-app
npm start

# folders estrutura
.
├── app.js 
├── package.json
├── views
    └── *.jade
├── routes
    └── *.js
├── models
    └── *.js
├── config
    └── *.js
├── public
    ├── javascripts
        └── *.js
    ├── images
        └── *.png, *.jpg
    └── stylesheets
        └── *.less, *.styl
├── test
    └── *.js
├── logs
    └── *.log