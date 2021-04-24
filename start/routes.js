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

Route.resource('users', 'UserController').apiOnly().validator(new Map(
  [
    [
      ['users.store'],
      ['users/UserCreate']
    ],
    [
      ['users.update'],
      ['users/UserUpdate']
    ]
  ]
));

Route.post('forgot-Password', 'ForgotPasswordController.store').validator('ForgotPassword');
Route.put('reset-password', 'ForgotPasswordController.update').validator('ResetPassword');

Route.post('/sessions', 'SessionController.store');

Route.group(() => {
  Route.resource('games', 'GameController').apiOnly();
  Route.resource('bets.games', 'BetController').apiOnly();
}).middleware(['auth']);
