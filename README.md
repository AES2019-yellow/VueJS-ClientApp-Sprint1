## Thingy-Api Yellow
### Web Client

This web client based on Vue, implements login an registering functionalities for the client, moreover is possible to see in real time wich is the information related to air quality and weather conditions, directly from Thingy-Api web service already implemented in the back end.

This implementation uses 2 third APIs as mashups:

* http://api.aerisapi.com for Air Quality
* http://api.openweathermap.org for Weather Conditions

The objective is compare the data gathered by Thingy-Device with the environmental information based on location of the web client user.

#### Thresholds

Based on formal data found in oficial web sites, It was stablished the thresholds to emit alerts on screen to the user. The oficial web sites are:

* [Effects of CO2 in humans](http://www.aragonvalley.com/en/effects-of-co2-in-humans/#.XfqFSoBKj3A)
* [Evaluating Thermal Comfort](https://www.researchgate.net/publication/305458070_Evaluating_Thermal_Comfort_in_a_Naturally_Conditioned_Office_in_a_Temperate_Climate_Zone)
* [National Oceanic and Atmospheric Administration](https://www.noaa.gov/)

#### Color conventions

**For Temperature**
* Light Blue: under 20°C, is good for human, but after a while is uncomfortable
* Dark Blue: between 20°C and 26°C is a perfectt temperature for human
* Yellow: between 26°C and 30°C is acceptable for human, but after a while is uncomfortable
* Red: more than 30°C is uncomfortable for human quickly, and combined with high humidity and CO2 levels could be dangerous.

**For CO2**

The regular level of CO2 outdoor is around 400 and 500 ppm, regarding to location, the thresholds implemented are:

* Green: under 350 ppm
* Light Blue: between 350 and 1000 ppm
* Dark Blue: between 1000 and 2000 ppm, is a low air quality
* Yellow: between 2000 and 5000 ppm, is a dirty air quality
* Red: more than 5000 ppm, a longe exposure could be dangerous


### Compiles and hot-reloads for development
```
npm run serve
```