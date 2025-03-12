import './App.css';
import {React, useState, useEffect} from 'react';

function App() {
  const [initialDropdownVal, setInitialDropdownVal] = useState("");
  const [colorArray, setColorArray] = useState([]);
  const [inputColor, setInputColor] = useState("#000000")
  const dropdownItems = ["Monochrome", "Monochrome-dark", "Monochrome-light", "Analogic", "Complement", "Analogic-complement", "Triad"];
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }
  useEffect(() => {
    if (dropdownItems) {
      setInitialDropdownVal(dropdownItems[0])
    }
  }, [])

  const getInputColor = (e) => {
    setInputColor(perv => e.target.value)
  }

  return (
    <>
    <button id="dark-light-switch" onClick={toggleTheme}>Dark-Light</button>
    <div id='app-outer-container' className='container-fluid'>
      <div id='app-container' className='container light-mode'>

        <div id='app-head' className='container'>
          <input type='color' value={inputColor} onChange={getInputColor}></input>

          <div id='dropdown-container' className='dropdown'>
            <button id='dropdown-btn' className='btn dropdown-toggle' type='button' data-bs-toggle="dropdown">{initialDropdownVal}</button>
            <ul className='dropdown-menu'>
              {dropdownItems.map(item => {
                return (
                    <li key={item}>
                      <button className='dropdown-item btn btn-light'
                              onClick={() => setInitialDropdownVal(item)}>{item}</button>
                    </li>
                )
              })}
            </ul>
          </div>

          <button id="submit-btn" className='btn'
            onClick={() =>
              fetch(`https://www.thecolorapi.com/scheme?hex=${inputColor.slice(1)}&mode=${initialDropdownVal.toLowerCase()}`)
                .then(res => res.json())
                .then(data => setColorArray(data.colors))
            }
          >Get color scheme</button>
        </div>

        <div id="colors-container" className="container-fluid d-flex mt-2">
            {colorArray.map(item => {
              return (
                <>
                <div className="container color-container" style={{backgroundColor: item.hex.value}}>
                  <p className="bg-dark">{item.hex.value}</p>
                </div>
                </>
              )
            })}
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
