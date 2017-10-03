# sahito-frontend

> Sahito frontend

## Build Setup

``` bash
# install dependencies
npm install

# copy all asset files from sahito-html; like images, scripts, stylesheets to "static" directory
cp -r sahito-html/assets/* ./sahito-gui/static

# serve with hot reload at localhost:8080
npm run dev
```

## Deploy

Run `npm run build`. It will compile and bundle all files to `dist` directory.

You can copy all files inside of `dist` directory to your web root directory (something like `/var/www`).
For example, on Laravel/Lumen you can copy all files inside `dist` directory to `public` directory.
