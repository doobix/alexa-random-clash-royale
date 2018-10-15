/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const SeeClashRoyale = require('see-clash-royale');

const APP_ID = 'amzn1.ask.skill.SKILL_ID_HERE';

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    this.emit('GetRandomClashRoyaleCard');
  },
  'GetRandomClashRoyaleCard': function() {
    const ssc = new SeeClashRoyale();
    const randomCard = ssc.getRandomCard();
    const speechOutput = `Your random Clash Royale card is: ${randomCard.name}. The rarity of this card is: ${randomCard.rarity}`;
    this.emit(
      ':tellWithCard',
      speechOutput,
      'Random Clash Royale Cards',
      `Card name: ${randomCard.name}. Rarity: ${randomCard.rarity}`
    );
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = 'This skill tells you a random Clash Royale card. Would you like to hear one?';
    this.emit(':ask', speechOutput, speechOutput);
  },
  'AMAZON.CancelIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.StopIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
  'AMAZON.YesIntent': function() {
    this.emit('GetRandomClashRoyaleCard');
  },
  'AMAZON.NoIntent': function() {
    this.emit(':tell', this.t('STOP_MESSAGE'));
  },
};
