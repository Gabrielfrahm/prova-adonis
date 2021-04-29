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


const Route = use('Route')

Route.post('forgot-Password', 'ForgotPasswordController.store').validator('forgot-password/ForgotPassword');
Route.put('reset-password', 'ForgotPasswordController.update').validator('forgot-password/ResetPassword');

Route.post('/sessions', 'SessionController.store').validator('session/Session');

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
  Route.get('game/bets/:game_id?', 'BetController.index');
  Route.get('game/bets/:game_id/:id', 'BetController.show');
  Route.post('game/bets', 'BetController.store');
  Route.put('game/bets/:id', 'BetController.update').validator('bets/BetUpdate');
  Route.delete('game/bets/:id', 'BetController.destroy');

}).middleware(['auth']);
