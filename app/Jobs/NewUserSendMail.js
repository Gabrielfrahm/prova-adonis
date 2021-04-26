'use strict'

const Mail = use('Mail');
class NewUserSendMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewUserSendMail-job'
  }

  // This is where the work is done.
  async handle ({name, email}) {
    console.log(`job: ${NewUserSendMail.key}`)
    await Mail.send(
      ['emails.signUp'],
      {
        name,
      },
      message => {
        message
          .to(email)
          .from('notResponde@TLG.com', 'Equipe TLG | <>')
          .subject('Cadastro realizado com sucesso!')
      }
    )
  }
}

module.exports = NewUserSendMail

