import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../lib/api.js";

export default function Home() {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    API.GET(API.ENDPOINTS.allEntries)
      .then(({ data }) => {
        const lastEntries = [
          data[data.length - 1],
          data[data.length - 2],
          data[data.length - 3],
        ];
        setEntries(lastEntries);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
  }, []);

  return (
    <section className="heroPage">
      <div>
        <h1 className="importantTitles maintitle"> Adventure Map</h1>
        <h3 className="importantTitles subtitle"> Explore the world</h3>
        <h3 className="importantTitles subtitle"> Share your discoveries</h3>
      </div>
    </section>
  );
}
