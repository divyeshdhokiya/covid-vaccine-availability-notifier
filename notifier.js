const notifier = require("node-notifier");

const request = require("./util/request");
const API_V2 = "https://cdn-api.co-vin.in/api/v2";

/* -----------------------  HELPERS ------------------------ */

function checkSlots(type, values, options) {
  return getSlotsBy(type, values, options)
    .then((data) => {
      const slots = isSlotAvailable(data, options);
      if (slots && Object.entries(slots).length > 0) {
        notify("found", options.value, options.dose, slots);
      } else {
        notify("not_found", options.value);
      }
    })
    .catch((e) => {
      console.log("e", e);
      notify("error");
    });
}

function isSlotAvailable(data, options) {
  try {
    const centers = data.centers;
    const availableSlots = {};

    if (centers && centers.length > 0) {
      console.log("\n\nData successfully fetched for: ", options.value);
      centers.forEach((center) => {
        const sessions = center.sessions.filter(
          (session) =>
            session.min_age_limit === options.age &&
            (options.dose === 1
              ? session.available_capacity_dose1 > 0
              : session.available_capacity_dose2 > 0)
        );
        if (sessions.length > 0) availableSlots[center.pincode] = center;
      });

      return availableSlots;
    }

    return null;
  } catch (e) {
    console.log("Error :", e);
    notify("error");
  }
}

const notify = (type, value, dose, data = []) => {
  const cDate = new Date().toLocaleString();

  switch (type) {
    case "error":
      notifier.notify({
        title: "Something is wrong!",
        message:
          "Some unexpected happened during running a scheduler job. see terminal for more detail!",
        sound: SOUND_ALERT,
      });
      break;
    case "found":
      console.log(
        `Last checked on: ${cDate}
    ___SLOTS_FOUND___
  ${JSON.stringify(data, null, 4)}`
      );
      notifier.notify({
        title: `Slots Available for Dose: ${dose} in below Pincodes`,
        message: JSON.stringify(Object.keys(data), null, 4),
        sound: SOUND_ALERT,
      });
      break;
    case "not_found":
      console.log(
        `Last checked on: ${cDate}
    ___NO_SLOTS_FOUND___ for ${value}`
      );
      break;
    default:
      notifier.notify({
        title: "Something is wrong!",
        message:
          "Some unexpected happened during running a scheduler job. see terminal for more detail!",
        sound: SOUND_ALERT,
      });
  }
};

function getSlotsByPincode(pincode, options) {
  const payload = {
    url: `${API_V2}/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${options.date}`,
  };
  return request.get(payload);
}

function getSlotsByDist(distId, options) {
  const payload = {
    url: `${API_V2}/appointment/sessions/public/calendarByDistrict?district_id=${distId}&date=${options.date}`,
  };
  return request.get(payload);
}

function getSlotsBy(type, value, options) {
  switch (type) {
    case "dist": {
      return getSlotsByDist(value, options);
    }
    case "pincode": {
      return getSlotsByPincode(value, options);
    }
    // Control should not come here
    default: {
      return getSlotsByPincode(value, options);
    }
  }
}

module.exports = {
  checkSlots,
};
