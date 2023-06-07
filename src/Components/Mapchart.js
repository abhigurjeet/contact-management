import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import icon from "leaflet/dist/images/marker-icon.png";


import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
export default function Mapchart() {
  let DefaultIcon=L.icon({
    iconUrl:icon,
  })
  L.Marker.prototype.options.icon=DefaultIcon;
  const [worldData, setWorldData] = useState({});
  const [countryData, setCountryData] = useState([]);
  const [graphData, setGraphData] = useState(null);

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
    <div className="map-chart w-full mt-20 ml-32">
      <h1 className="mt-4 text-2xl">COVID-19 Dashboard</h1>
      <div className="chart-container">
        <h2>Worldwide Cases</h2>
        <p>Total Cases: {worldData.cases}</p>
        <p>Total Deaths: {worldData.deaths}</p>
        <p>Total Recovered: {worldData.recovered}</p>
        {graphData ? (
          <Line style={{ height: "500px",width:'80%',margin:'auto' }} data={buildGraphData()} />
        ) : (
          <p>Loading graph data...</p>
        )}
      </div>
      <div className="map-container">
        <h2>Country Cases</h2>
        <MapContainer className='bg-white text-black' center={[0, 0]} style={{ height: "500px",width:'75%',margin:'auto' }} zoom={3} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countryData.map((country) => (
            <Marker 
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <h5 className='bg-white text-black m-0 p-0'>{country.country}</h5>
                <p className='bg-white text-black m-0 p-0'>
                Active Cases: {country.active}
                </p>
                <p className='bg-white text-black m-0 p-0'>
                Recovered Cases: {country.recovered}
                </p>
                <p className='bg-white text-black m-0 p-0'>
                Deaths: {country.deaths}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
