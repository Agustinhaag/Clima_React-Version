import React, { useState } from "react";
import ReactDOMServer from 'react-dom/server';
import "../style.css";
import ReactSwitch from "react-switch";
import { useTemaContext } from "../context/ThemeContext";

const Clima = () => {
  const [inputText, setInputText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const {contextTheme, setContextTheme}= useTemaContext()
  const [change, setChange] = useState(false)
  const cambiar = (nextchange)=>{
    setContextTheme((state)=>(state === "Light"? "Dark":"Light"))
   setChange(nextchange)
  }
  const mostrar = (data) => {
    const container = document.querySelector("#res");
    if (data) {
      let city = `${data.name}, ${data.sys.country}`;
      let date = new Date().toLocaleDateString();
      let temp = (data.main.temp - 273.15).toFixed(1);
      let desc = `${data.weather[0].description}`;
      let min = (data.main.temp_min - 273.15).toFixed(1);
      let max = (data.main.temp_max - 273.15).toFixed(1);
      let tmin = `${min}°C/${max}°C`;
      const src = actualizarImg(data);

      let info = (
        <>
          <div className="container-city">
            <p id="city">{city}</p>
          </div>
          <div className="container-date">
            <p id="date">{date}</p>
          </div>
          <div className="container-img">
            <img id="img" src={src} alt="" />
            <p id="temp">{temp}</p>
          </div>
          <div className="container-descripcion">
            <p id="desc">{desc}</p>
          </div>
          <div className="container-temp">
            <p id="min">{tmin}</p>
          </div>
        </>
      );
      container.style.display = "block";
      const infoHTML = ReactDOMServer.renderToString(info);
      container.innerHTML = infoHTML;
    }
  };

  const enviar = async (e) => {
    e.preventDefault();
    const api = "bfe63af478e163961ee2e827a315d3cf";
    const clima = `https://api.openweathermap.org/data/2.5/weather?q=${inputText},${selectedCountry}&appid=${api}`;
    try {
      const response = await fetch(clima);
      const data = await response.json();
      mostrar(data);
    } catch (err) {
      console.error(err);
    }
  };

  const actualizarImg = (data) => {
    let ico = data.weather[0].icon;
    let src;
    switch (ico) {
      case "01d":
        src = "clima/soleado.png";
        break;
      case "02d":
        src = "clima/parcial.png";
        break;
      case "03d":
      case "04d":
      case "03n":
      case "04n":
        src = "clima/nublado.png";
        break;
      case "09d":
      case "09n":
        src = "clima/chubasco.png";
        break;
      case "10d":
        src = "clima/lluvia-sol.png";
        break;
      case "11d":
      case "11n":
        src = "clima/tormenta.png";
        break;
      case "13d":
      case "13n":
        src = "clima/nieve.png";
        break;
      case "01n":
        src = "clima/luna.png";
        break;
      case "02n":
        src = "clima/luna-nubes.png";
        break;
      case "10n":
        src = "clima/luna-lluvia.png";
        break;
      case "50d":
      case "50n":
        src = "clima/niebla.jpg";
        break;
    }
    return src;
  };
  return (
    <div className="body" id={contextTheme}>
      <main>
        <div className="container-switch">
          <ReactSwitch   
            onChange={cambiar}
            checked= {change}
            onColor="#86d3ff"
            onHandleColor="#63a9b8"
            handleDiameter={30} 
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"/>
            <p> {contextTheme}</p>
        </div>
      
        <div className="container-all">
          <form action="" onSubmit={enviar}>
            <label htmlFor="text">
              <span className="span1"> Ingrese la ciudad:</span>
              <div className="container-small">
                <input
                  placeholder="Buscar ciudad"
                  id="text"
                  name="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="form-control"
                  type="text"
                />
              </div>
            </label>
            <label htmlFor="codigo">
              <span className="span2">Ingrese el País:</span>
              <div className="container-small">
                <select
                  name="country"
                  id="codigo"
                  className="form-control"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value=""></option>
                  <option value="ar">Argentina</option>
                  <option value="us">Estados unidos</option>
                  <option value="br">Brasil</option>
                  <option value="cl">Chile</option>
                  <option value="py">Paraguay</option>
                  <option value="uy">Uruguay</option>
                  <option value="bo">Bolivia</option>
                  <option value="uk">Inglaterra</option>
                </select>
              </div>
            </label>
            <button id="btn" type="submit">
              Buscar
            </button>
          </form>
          <div className="container-res" id="res"></div>
        </div>
      </main>
      <footer>
        <p className="copy">Creado por Agustin Haag</p>
        <p>&copy;All rights reserved 2023 - Open weather</p>
      </footer>
    </div>
  );
};

export default Clima;
