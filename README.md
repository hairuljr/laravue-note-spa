# Laravel 8 + Vue.js
Single Page Application with Laravel 8 and Vue.js, let's make them love each other.

## What inside?
- Laravel ^8.6 - [laravel.com/docs/8.x](https://laravel.com/docs/8.x)
- Laravel UI 3.x [Laravel UI](https://github.com/laravel/ui)
- Vue.js ^2.6 - [Vue.js](https://vuejs.org/)
- Vue Router ^3.5 [Vue Router](https://router.vuejs.org/)
- Vue Toasted ^1.1 [Vue Toasted](https://www.npmjs.com/package/vue-toasted)
- Vue SweetAlert2 ^5.0 [SweetAlert2](https://www.npmjs.com/package/vue-sweetalert2)

Simple Notes application (CRUD).

## What next?
After clone or download this repository, next step is install all dependency required by laravel and laravel-mix.

```shell
# install composer-dependency
$ composer install
# install npm package
$ npm install
# build dev 
$ npm run dev
```

Before we start web server make sure we already generate app key, configure `.env` file and do migration.

```shell
# create copy of .env
$ cp .env.example .env
# create laravel key
$ php artisan key:generate
# laravel migrate
$ php artisan migrate
```
