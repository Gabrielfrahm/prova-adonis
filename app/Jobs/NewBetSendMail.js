'use strict'

const Mail = use('Mail');
class NewBetSendMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewBetSendMail-job'
  }

  // This is where the work is done.
  async handle ({name, email, type }) {
    console.log(`job: ${NewBetSendMail.key}`);
    await Mail.send(
      ['emails.new_bet'],
      {
        name,
        type
      },
      message => {
        message
          .to(email)
          .from('notResponde@TLG.com', 'Equipe TLG | <>')
          .subject('novo jogo realizado')
      }
    )
  }
}

module.exports = NewBetSendMail

