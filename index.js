
'use strict';

const Alexa = require('alexa-sdk');
const _ = require('lodash');
const Proquest = require('./lib/Proquest.js');

const APP_ID = '***********************';  

const languageStrings = {
    'en-GB': {
        translation: {
            
            SKILL_NAME: 'Brighton Pollution',
            GET_AIR_MESSAGE: "The pollution in Brighton is currently",
            DETAIL_MESSAGE: "This is based on Nitrogen Dioxide and Ozone measurements earlier today.",
            HELP_MESSAGE: 'You can ask me the current air quality, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            ERROR_MESSAGE: 'Sorry, We can\'t collect the data at the moment, please retry later',
            STOP_MESSAGE: 'Bye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('FetchAirQuality');
    },
    'FetchAirQuality': function () {
        let speechOutput = null;
        const self = this;
        Proquest.req({
            uri: 'https://b35hwcpmvk.execute-api.eu-west-1.amazonaws.com/prod/LondonAirAPI',
            method: 'GET',
            headers:{
                'x-api-key':'************************'
            }
        }).then(function (body) {
            body = JSON.parse(body);
            const highest = _.maxBy(body, function(measure){
                return parseInt(measure['@AirQualityIndex'], 10);
            });
            
            speechOutput = `${self.t('GET_AIR_MESSAGE')} ${highest['@AirQualityBand']}. ${self.t('DETAIL_MESSAGE')}`;
            self.emit(':tellWithCard', speechOutput, self.t('SKILL_NAME'), speechOutput);
        })  
        .catch(function(err){
            speechOutput = self.t('ERROR_MESSAGE');
            self.emit(':tellWithCard', speechOutput, self.t('SKILL_NAME'), speechOutput);
        }); 

        
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    }
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

