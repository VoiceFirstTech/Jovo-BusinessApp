const expect = require('chai').expect;

const getPlatformRequestBuilder = require('jovo-framework').util.getPlatformRequestBuilder;
const {send} = require('jovo-framework').TestSuite;
const {Strings} = require('../config/strings');

for (let rb of getPlatformRequestBuilder('AlexaSkill', 'GoogleActionDialogFlowV2')) {

  describe('LaunchTestGroup', () => {
    // Launch -> WelcomeIntent
    it('welcomes users', () => {
      return send(rb.launch())
        .then((res) => {
            const matchedResponse = res.isAsk(Strings.launchResponse, Strings.launchReprompt);
            expect(matchedResponse).to.equal(true);
            return send(rb.intent('WelcomeIntent').setState("WelcomeState"))
        })
        .then((res) => {
            const matchedResponse = res.isAsk('Welcome to Voice First Tech. <break time=\"300ms\"/> Do you want to see our business card, get an estimate for your Voice App, or learn more?', 'Do you want to see our business card, get an estimate for your Voice App, or learn more?');
            expect(matchedResponse).to.equal(true);
        })
    });

  });


}
