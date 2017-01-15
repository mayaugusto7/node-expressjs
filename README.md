# node_expressjs

# cli express
npm install -g express-generator

# dependencias
npm install -g compression
npm install -g morgan
npm install -g connect-timeout
npm install -g method-override
npm install -g response-time
npm install -g serve-favicon
npm install -g serve-index
npm install -g vhost
npm install -g connect-busboy
npm install -g errorhandler
npm install -g express jade
npm install -g consolidate 
npm install -g swig 

# ----

npm install compression --save -dev
npm install morgan --save -dev
npm install connect-timeout --save -dev
npm install method-override --save -dev
npm install response-time --save -dev
npm install serve-favicon --save -dev
npm install serve-index --save -dev
npm install vhost --save -dev
npm install connect-busboy --save -dev
npm install errorhandler --save -dev
npm install --save -dev express jade
npm install consolidate --save -dev
npm install swig --save -dev

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