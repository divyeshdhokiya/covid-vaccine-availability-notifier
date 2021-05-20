# Covid Vaccine Slots Availability Notifier - India


### Overview
Covid-19 Vaccine Slots Availability Notifier - India

Vaccine slots are getting booked within the time you blink your eyes. You can't expect it to be available by the time you receive SMS or Email alert. Here, you get the alerts by **system pop-up** alerts with sound and **more information directly on your terminal** within the seconds slots get open. Also, you can get results by dose number as well.

### How it works
It is a schedule based task runner to get notified when vaccine slots are available in provided district(s) or pincode(s). It uses public APIs provided by [**cowin**.](https://apisetu.gov.in/public/marketplace/api/cowin/cowin-public-v2#/)

_This script is written based on my need. you're welcome to modify as per yours. :) Hope this helps someone!_

### This is how it notifies with the provided filters

<img width="640" alt="Screenshot 2021-05-16 at 6 56 41 PM" src="https://user-images.githubusercontent.com/11074646/118999814-37fe7780-b9a8-11eb-88a2-941fef6fd07a.jpg">


### Steps to run the scheduler job:

#### Install [Nodejs](https://nodejs.org/en/) if not there already

#### Install NPM modules

```
npm i
```

#### Run scheduler

```
npm start   // Looks for the pincode(s)
```

```
npm run start:dist   // For district(s)
```

Default it checks in every 3 seconds. you can modify the time in the code as per your need.

### Options

```
// Basic Filters
const AGE = 18;
const DATE = "15-05-2021";
const DOSE = 2;

// Other Options
const type = process.env.TYPE || "pincode"; // Find slots by "pincode" or "dist"
const PINCODES = ["360004"];
const DISTRICT_IDS = [775]; //Rajkot Corp

const SCHEDULE = "*/3 * * * * *"; // Every 3 seconds
SOUND_ALERT = true; // More detail on https://www.npmjs.com/package/node-notifier
```

List of districts and it's ids are under ```data > district-ids.txt``` file.
