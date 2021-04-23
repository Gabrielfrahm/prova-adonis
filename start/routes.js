'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('users', 'UserController').apiOnly();
Route.post('/session', 'SessionController.store');

Route.group( () => {

Route.resource('games', 'GameController').apiOnly();

Route.resource('bets.games', 'BetController').apiOnly();

}).middleware(['auth']);
