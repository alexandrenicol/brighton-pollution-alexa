# brighton-pollution-alexa
An Alexa skill that fetches air quality data for Brighton and Hove

## Intent schema
```json
{
  "intents": [
    {
      "intent": "FetchAirQuality"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    }
  ]
}
```

## Sample utterances
```
FetchAirQuality what is the air quality

FetchAirQuality give me the current air quality

FetchAirQuality what is the pollution

FetchAirQuality for the air quality

FetchAirQuality for the air pollution

FetchAirQuality the pollution

FetchAirQuality the air quality

FetchAirQuality what is the air pollution

