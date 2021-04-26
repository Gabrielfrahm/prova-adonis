'use strict'
const Kue = use('Kue');
const Job = use('App/Jobs/NewUserSendMail')

const SendMailCreatedUserHook = exports = module.exports = {}

SendMailCreatedUserHook.sendMail = async (emailInstance) => {
  if(!emailInstance.email && !emailInstance.dirty.email) return

  const {name, email} = await emailInstance;

  Kue.dispatch(Job.key, {name, email}, {
    attempts: 3
  });
}
