'use strict'
const Kue = use('Kue');
const Job = use('App/Jobs/NewBetSendMail')

const SendMailHook = exports = module.exports = {}

SendMailHook.sendMail = async (emailInstance) => {
  if(!emailInstance.user_id && !emailInstance.dirty.user_id) return

  const {name, email} = await emailInstance.user().fetch();

  Kue.dispatch(Job.key, {name, email, type}, {
    attempts: 3
  });
}
