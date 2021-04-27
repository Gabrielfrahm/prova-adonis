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

Route.post('forgot-Password', 'ForgotPasswordController.store').validator('forgot-password/ForgotPassword');
Route.put('reset-password', 'ForgotPasswordController.update').validator('forgot-password/ResetPassword');

Route.post('/sessions', 'SessionController.store').validator('session/Session');

Route.group(() => {
  Route.resource('games', 'GameController').apiOnly().validator(new Map(
    [
      [
        ['games.store'],
        ['games/GameCreate']
      ],
      [
        ['games.update'],
        ['games/GameUpdate']
      ]
    ]
  ));
  Route.resource('game.bets', 'BetController').apiOnly().validator(new Map (
    [
      [
        ['game.bets.store'],
        ['bets/BetCreate']
      ],
      [
        ['game.bets.update'],
        ['bets/BetUpdate']
      ]
    ]
  ));
}).middleware(['auth']);
