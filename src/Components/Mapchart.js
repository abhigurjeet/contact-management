import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function Mapchart() {
  const [worldData, setWorldData] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    fetchWorldData();
    fetchCountryData();
    fetchGraphData();
  }, []);

  const fetchWorldData = async () => {
    try {
      const response = await axios.get("https://disease.sh/v3/covid-19/all");
      setWorldData(response.data);
    } catch (error) {
      console.error("Error fetching world data:", error);
    }
  };

  const fetchCountryData = async () => {
    try {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      setCountryData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching country data:", error);
    }
  };

  const fetchGraphData = async () => {
    try {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      setGraphData(response.data);
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  const buildGraphData = () => {
    console.log(graphData);
    if (
      graphData &&
      graphData.cases &&
      graphData.deaths &&
      graphData.recovered
    ) {
      const casesData = Object.entries(graphData.cases).map(
        ([date, count]) => ({
          date: new Date(date),
          count
        })
      );

      console.log("Cases Data:", casesData);

      return {
        labels: casesData.map((data) => data.date.toDateString()),
        datasets: [
          {
            label: "Total Cases",
            data: casesData.map((data) => data.count),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            fill: true
          }
        ]
      };
    }

    return null;
  };

  return (
    <div className="map-chart w-full">
      <h1>COVID-19 Dashboard</h1>
      <div className="chart-container">
        <h2>Worldwide Cases</h2>
        <p>Total Cases: {worldData.cases}</p>
        <p>Total Deaths: {worldData.deaths}</p>
        <p>Total Recovered: {worldData.recovered}</p>
        {graphData === {} ? (
          <Line data={buildGraphData()} />
        ) : (
          <p>Loading graph data...</p>
        )}
      </div>
      <div className="map-container">
        <h2>Country Cases</h2>
        <MapContainer
          center={[0, 0]}
          zoom={2}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countryData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <strong>{country.country}</strong>
                <br />
                Active Cases: {country.active}
                <br />
                Recovered Cases: {country.recovered}
                <br />
                Deaths: {country.deaths}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
