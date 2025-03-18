import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Configuration, OpenAIApi } from "azure-openai";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { useState } from 'react';

import Footer from './Footer.jsx';
import HeaderComp from './HeaderComp.jsx'
import reactLogo from './assets/react.svg'

function MainEntry() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/app" element={<App />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </Router> ); 
}

function FirstPage() {

//  const [input, setInput] = useState('Bitte aus meiner Daten beantworten, mit genaue Quellenangabe: unterliegen Energieerzeugnisse der Energiesteuer?');
  const [input, setInput] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    //e.preventDefault(); 
    setLoading(true);
    
    //const url = "https://deva-m871as5e-eastus2.cognitiveservices.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-10-21";
    //const apiKey = '8R9bmKFEBNVREb9Q0JI0N18zgHDTdwfMsgX43AEiiDPNKf2JQldhJQQJ99BCACHYHv6XJ3w3AAAAACOGfOb9';
    
    const url = "https://deva-m8blsul4-westus.openai.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-10-21";
    const apiKey = "FX6ANBefu2qbluscjYo37YXcLOwRUpKXzruvNGWFlRquXznquOyIJQQJ99BCAC4f1cMXJ3w3AAAAACOG3rMm";
        
    const fetchAnswer = async () => {    
    const dataField = '{ "messages": [  { "role": "user",  "content": "' + input.trim() + '" } ],   "max_tokens": 1500, "temperature": 0.7, "top_p": 1, "stop": []}'
//const dataField =  {"data_sources": [{"type": "azure_search","parameters": {"endpoint": url, "index_name": "v3index2","semantic_configuration": "default","query_type": "vector","fields_mapping": {},"in_scope": true,"role_information": "Sie sind KI-Assistent und helfen Personen, Informationen zu finden.", "filter": null,"strictness": 4, "top_n_documents": 20, "authentication": {"type": "api_key","key": apiKey},"embedding_dependency": {"type": "gpt-35-turbo","deployment_name": "text-embedding-ada-002"},"key": "'$search_key'","indexName": "'$search_index'"}}],  "messages": [{"role": "system","content": "Sie sind KI-Assistent und helfen Personen, Informationen zu finden." }],  "temperature": 0.7,"top_p": 0.95,"max_tokens": 800,"stop": null,"stream": true,"past_messages": 10,"frequency_penalty": 0,"presence_penalty": 0,"azureSearchEndpoint": "https://v3azurekisearchservice.search.windows.net",  "azureSearchKey": "***","azureSearchIndexName": "v3index2"};
      
      const response = await fetch(url, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
            'api-key': apiKey,
         },
         body: dataField
      });
    

      try {
        setBotResponse("Warten ...");      
        const responseData = await response.json();
        console.log("----ResponseData:-----");
        console.log(responseData);

        if (responseData.error != null) {
          setBotResponse("ERROR: " + responseData.error.message);      
        } else {
          setBotResponse(responseData.choices[0].message.content);      
        }
        setLoading(false);
      } catch (error) {
        console.log("----ERROR RECEIVED: ----");
        console.log(error);
        setLoading(false);
      }
    };

      fetchAnswer();
      //console.log((await response.json()).choices[0].message.content);    
      //let [botResponse, setBotResponse] = useState("xx");
  };  

  let x = 0;

  const PP= [
              "Welche bestehenden und zukünftigen Fördermaßnahmen auf EU- und Bundesebene sind für energieintensive Mittelstandsunternehmen besonders relevant? Analysiere die Wirksamkeit von Investitionszuschüssen, steuerlichen Abschreibungsmodellen und speziellen Industriestromtarifen im Vergleich zu direkten Subventionen. Welche Risiken entstehen durch Fehlanreize (z. B. „Carbon Leakage“ oder Mitnahmeeffekte), und wie könnte eine intelligente Förderpolitik ausgestaltet werden, um sowohl Klimaziele als auch die Wettbewerbsfähigkeit der deutschen Industrie zu sichern?",
              "Inwiefern können KI-gestützte Energiemanagementsysteme dazu beitragen, den Stromverbrauch in mittelständischen Produktionsbetrieben signifikant zu reduzieren? Untersuche dabei nicht nur die technischen Möglichkeiten (z. B. Demand Response, Lastprognosen, intelligente Produktionssteuerung), sondern auch regulatorische und wirtschaftliche Hindernisse bei der Implementierung. Welche staatlichen Förderprogramme oder steuerlichen Anreize könnten die Verbreitung solcher Technologien beschleunigen, und wie lassen sich Bürokratiehürden für KMU abbauen?",
              "Wie können mittelständische Industrieunternehmen in Deutschland langfristig wettbewerbsfähig bleiben, wenn gleichzeitig die Energiepreise steigen und subventionierte Stromtarife für Großkonzerne die Marktdynamik verzerren? Welche regulatorischen Anpassungen wären notwendig, um eine gerechtere Verteilung von Energiekosten zu ermöglichen, ohne Investitionen in erneuerbare Energien und Netzstabilität zu gefährden? Analysiere internationale Modelle, insbesondere aus den USA und China, und entwickle eine wirtschaftspolitische Strategie für Deutschland.",
              "Wie unterscheiden sich die Energiesteuersysteme in Deutschland, der EU und den USA hinsichtlich fossiler Brennstoffe und erneuerbarer Energien? Welche wirtschaftlichen und ökologischen Auswirkungen haben unterschiedliche Steuersätze auf Verbraucher und Industrie?",
              "Welche Rolle spielen das Erneuerbare-Energien-Gesetz (EEG) und das Energieeffizienzgesetz (EnEfG) bei der Erreichung der Klimaziele? Welche Änderungen wären notwendig, um den Ausbau erneuerbarer Energien noch schneller voranzutreiben?",
              "Welche konkreten Technologien und Prozessoptimierungen können energieintensive Industriezweige (z. B. Stahl-, Chemie-, oder Halbleiterproduktion) nutzen, um ihren Stromverbrauch signifikant zu reduzieren? Wie wirksam sind bestehende regulatorische Anreize?",
              "Welche nationalen und EU-weiten Förderprogramme existieren für Unternehmen und Privathaushalte zur Umstellung auf Solar-, Wind- oder Geothermie-Anlagen? Welche wirtschaftlichen Faktoren beeinflussen die Akzeptanz dieser Förderungen?",
              "Welche regulatorischen Anpassungen sind erforderlich, um Smart Grids effizient in bestehende Stromnetze zu integrieren? Welche steuerlichen oder fördertechnischen Maßnahmen könnten Anreize für Investitionen in intelligente Netzinfrastrukturen schaffen?",
              "Wie kann eine reformierte Strombesteuerung Haushalte mit niedrigem Einkommen entlasten, ohne den Anreiz zur Energieeinsparung zu verringern? Welche internationalen Best Practices könnten als Vorbild dienen?",
              "Wie lässt sich die Energiesicherheit eines Landes gewährleisten, während gleichzeitig fossile Subventionen reduziert und erneuerbare Energien gefördert werden? Welche rechtlichen und steuerlichen Instrumente könnten eine stabile Übergangsphase unterstützen?"
            ]

  return (
    <div className="flex flex-col items-center padding-4">
      
      <div className="ps-5 pt-2 pe-5 text-center" >
      <HeaderComp />
      <ModelSelector />
      <h2 className="text-2xl font-bold mb-4" style={{color: "#0099cc"}} >EnerNavi KI Chat</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-md" >
          <textarea
          className="border border-primary rounded " 
          rows="12" style={{width: "90%", backgroundColor: "#F9F9F9"}}
          readOnly
          placeholder="KI Antwort..."
          value={botResponse} 
          onChange={(e) => setBotResponse(e.target.value)}
        />          
        <div style={{paddingTop: "30px"}} >
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[0]); setBotResponse(""); return false;}}>Prompt 1</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[1]); setBotResponse(""); return false;}}>Prompt 2</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[2]); setBotResponse(""); return false;}}>Prompt 3</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[3]); setBotResponse(""); return false;}}>Prompt 4</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[4]); setBotResponse(""); return false;}}>Prompt 5</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[5]); setBotResponse(""); return false;}}>Prompt 6</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[6]); setBotResponse(""); return false;}}>Prompt 7</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[7]); setBotResponse(""); return false;}}>Prompt 8</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[8]); setBotResponse(""); return false;}}>Prompt 9</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput(PP[9]); setBotResponse(""); return false;}}>Prompt 10</button>
        </div>        
        <textarea
          className="border border-primary rounded mb-4"
          rows="5"
          placeholder="Frage stellen..."
          value={input}
          style={{width: "80%"}}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button style={{width: "120px", height: "40px"}}
          type="submit" className="btn btn-primary bg-xblue-500 text-black-100 py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
          onClick={() => {handleSubmit(this); return false;}       } 
        >{loading ? 'Warten...' : 'Go'}</button>
          <p /> <br />

      </form>
      </div>
      <Footer /> 
    </div>
  );
}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderComp  />

      <div>
        <a href="https://vite.dev" target="_blank">
          
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}> is {count}</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
        <br /><Link to="/" className="text-blue-500 underline">Home</Link>
      </p>
        </>
  )
}

function ModelSelector() {

  const [selectedGPT, setSelectedGPT] = useState("1");

  const handleChange = (event) => {
    setSelectedGPT(event.target.value);
  };
  return (
    <div className="float-right">
    <center style={{fontSize: "9px", color: "#0099cc"}} >
      <select value={selectedGPT} onChange={handleChange} className="form-select"  selected="2" aria-label="Selector" style={{width: "300px", marginTop: "10px", fontSize: "11px", float: "right" }}>
      <option value="0">GPT Auswählen ... </option>
      <option value="1">gpt-4o</option>
      <option value="2">dall-e-2</option>
      <option value="3">dall-e-3</option>
      <option value="4">davinci-002</option>
      <option>google-pegasus-newsroom</option>
      <option>gpt-35-turbo</option>
      <option>gpt-35-turbo-16k</option>
      <option>gpt-35-turbo-instruct</option>
      <option>gpt-4</option>
      <option>gpt-4-32k</option>
      <option>gpt-4o</option>
      <option>gpt-4o-audio-preview</option>
      <option>gpt-4o-mini</option>
      <option>gpt-4o-mini-audio-preview</option>
      <option>gpt-4o-mini-realtime-preview</option>
      <option>gpt-4o-realtime-preview</option>
      <option>Gretel-Navigator-Tabular</option>
      <option>Llama-3.2-11B-Vision-Instruct</option>
      <option>Llama-3.3-70B-Instruct</option>
      <option>Ministral-3B</option>
      <option>o1</option>
      <option>o1-mini</option>
      <option>o1-preview</option>
      <option>o3-mini</option>
      <option>oliverguhr-fullstop-punctuation-multilingual-base</option>
      <option>persiannlp-mt5-large-parsinlu-opus-translation-fa-en</option>
      <option>Phi-3-small-8k-instruct</option>
      <option>Phi-4</option>
      <option>Prism</option>
      <option>Spracherkennung</option>
      <option>Sprachsynthese</option>
      <option>Sprachsynthese</option>
      <option>Stable-Diffusion-3.5-Large</option>
      <option>Stable-Image-Core</option>
      <option>Virchow</option>
      <option>Virchow2</option>
      <option>whisper</option>
      <option>Zero-Shot-Bildklassifizierung</option>
      </select>
</center>
</div>   
    
  );

}

function AboutPage() {
  return (
    <div className="">
      <HeaderComp />
      <div className="m-5">
        <h1 className="text-2xl font-bold">About KI Energy Wizard</h1>
        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        
        <div className="mt-5"></div>
        <h6>Version: v0.1234</h6>
        <h6>LLM Version: v1.567</h6>
        <h6>Letzte Aktualisierung: 11.02.2025 15:00</h6>
      </div>
      <center><Link to="/" className="text-blue-500 m-5 underline justify-content-center">Zurück zu Hauptseite ...</Link></center>
    </div>
  );
}



function TreeControl(setterFunc) {
  const [expanded, setExpanded] = useState({});

  const toggleNode = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="tree" style={{width: "100px", textAlign:"left", float: "left" }}>
      <h3 className="small">Promtbibliothek</h3>
      <ul className="list-unstyled">
        <li>
          <button
            className="nav-link"
            onClick={() => toggleNode("node1")}
          >
            {expanded["node1"] ? "▼" : "▶"} Solar
          </button>
          {expanded["node1"] && (
            <ul className="list-unstyled ms-3">
              <li><button className="btn btn-link p-0" onClick={() => setterFunc('Sag kurz Hallo') }>Prompt 1</button></li>
              <li><button className="btn btn-link p-0">Prompt 2</button></li>
            </ul>
          )}
        </li>

        <li>
          <button
            className="nav-link"
            onClick={() => toggleNode("node2")}
          >
            {expanded["node2"] ? "▼" : "▶"} Windkraft
          </button>
          {expanded["node2"] && (
            <ul className="list-unstyled ms-3">
              <li><button className="btn btn-link p-0">Prompt 3</button></li>
              <li><button className="btn btn-link p-0">Prompt 4</button></li>
              <li><button className="btn btn-link p-0">Prompt 4</button></li>
              <li><button className="btn btn-link p-0">Prompt 5</button></li>
            </ul>
          )}
        </li>

        <li>
          <button
            className="nav-link"
            onClick={() => toggleNode("node3")}
          >
            {expanded["node3"] ? "▼" : "▶"} Favoriten
          </button>
          {expanded["node3"] && (
            <ul className="list-unstyled ms-3">
              <li><button className="btn btn-link p-0">Prompt 7</button></li>
              <li><button className="btn btn-link p-0">Prompt 6</button></li>
              <li><button className="btn btn-link p-0">Prompt 8</button></li>
              <li><button className="btn btn-link p-0">Prompt 9</button></li>
              <li><button className="btn btn-link p-0">Prompt 10</button></li>
              <li><button className="btn btn-link p-0">Prompt 11</button></li>
              <li><button className="btn btn-link p-0">Prompt 12</button></li>
              </ul>
          )}
        </li>

      </ul>
    </div>

  );
}



export default MainEntry ;
