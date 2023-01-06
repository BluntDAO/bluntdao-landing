import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Events.module.css";
import EventSlider from "./EventSlider";
import EventsCover from "./EventsCover";

const status = {
  started: "live",
  live: "upcoming",
  completed: "completed",
  ended: "completed",
};

const Events = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(
        `https://www.eventbriteapi.com/v3/organizations/${process.env.REACT_APP_ORGANIZTION_ID}/events/`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PRIVAT_TOKEN}`,
          },
        }
      );

      const eventsData = data?.data?.events.map((event) => ({
        id: event.id,
        name: event.name.text,
        description: event.description.text,
        url: event.url,
        venue_id: event.venue_id,
        status: status[event.status],
        img_url: event.logo.original.url,
        start: event.start.utc,
      }));
      const venueIDs = [];
      eventsData.forEach((event) => {
        if (event.venue_id) {
          venueIDs.push(event.venue_id);
        }
      });
      let venueData = await axios.get(
        `https://www.eventbriteapi.com/v3/organizations/${process.env.REACT_APP_ORGANIZTION_ID}/venues/`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PRIVAT_TOKEN}`,
          },
        }
      );
      const venus = {};
      venueData.data.venues.forEach((venue, idx) => {
        const id = venueData.data.venues[idx].id;
        venus[id] = {
          address: venue.address.localized_address_display,
          country: venue.address.country,
        };
      });
      const neweventsData = eventsData.map((event) => {
        event.venue_id = event.venue_id
          ? venus[event.venue_id]
          : { address: "online" };
        return event;
      });
      setEvents(neweventsData);
    };
    fetchData();
  }, []);
  return (
    <div className={`${style.container} section`}>
      <div className={style.section}>
        <div className={style.header}>Events</div>
        <div className={style.subheader}>
          This section contains the the master list of upcoming and recently
          ended events hosted by BluntDAO & Partners
        </div>
        <div className={style.eventsWrapper}>
          <EventsCover events={events} />
          <EventSlider events={events} />
        </div>
      </div>
    </div>
  );
};

export default Events;
