import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Configuration, OpenAIApi } from "azure-openai";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { useState } from 'react';

import Footer from './Footer.jsx';
import HeaderComp from './HeaderComp.jsx'
import reactLogo from './assets/react.svg'

/**
 * This is the main App component.
 * It renders a header with links to the Vite and React documentation,

 * and a message that tells you to edit the file to test HMR.
 */


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

  const [input, setInput] = useState('Bitte aus meiner Daten beantworten, mit genaue Quellenangabe: unterliegen Energieerzeugnisse der Energiesteuer?');
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
    const dataField = '{ "messages": [  { "role": "user",  "content": "' + input + '" } ],   "max_tokens": 1000, "temperature": 0.7, "top_p": 1, "stop": []}'
//const dataField =  {"data_sources": [{"type": "azure_search","parameters": {"endpoint": url, "index_name": "v3index2","semantic_configuration": "default","query_type": "vector","fields_mapping": {},"in_scope": true,"role_information": "Sie sind KI-Assistent und helfen Personen, Informationen zu finden.", "filter": null,"strictness": 4, "top_n_documents": 20, "authentication": {"type": "api_key","key": apiKey},"embedding_dependency": {"type": "gpt-35-turbo","deployment_name": "text-embedding-ada-002"},"key": "'$search_key'","indexName": "'$search_index'"}}],  "messages": [{"role": "system","content": "Sie sind KI-Assistent und helfen Personen, Informationen zu finden." }],  "temperature": 0.7,"top_p": 0.95,"max_tokens": 800,"stop": null,"stream": true,"past_messages": 10,"frequency_penalty": 0,"presence_penalty": 0,"azureSearchEndpoint": "https://v3azurekisearchservice.search.windows.net",  "azureSearchKey": "***","azureSearchIndexName": "v3index2"};
      
      const response = await fetch(url, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
            'api-key': apiKey,
         },
         body: dataField
      });
    


      const message = "Entered: " + input;
      console.log(message)
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

  // <TreeControl setterFunc='setInput' />
  return (
    <div className="flex flex-col items-center padding-4">
      <HeaderComp  />
      <div className="ps-5 pt-2 pe-5 text-center" >
      
      <ModelSelector />
      <h1 className="text-2xl font-bold mb-4">EnerNavi KI Chat Wizard</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center max-w-md">
          <textarea
          className="border border-primary rounded "
          rows="10" style={{width: "80%"}}
          placeholder="KI Antwort..."
          value={botResponse} 
          onChange={(e) => setBotResponse(e.target.value)}
        />          
        <br /> <br />
        <br /> <br />

        <div>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput('Skizziere mir kurz die neueste News im Bereich Energien, Energiepolitik in Deutschland'); setBotResponse(""); return false;}}>Prompt 1</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput('Sag ganz kurz was über Solarenergie!'); setBotResponse(""); return false;}}>Prompt 2</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput('Sag ganz kurz was über Windenergie!'); setBotResponse(""); return false;}}>Prompt 3</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput('Sag ganz kurz was über Biogas!'); setBotResponse(""); return false;}}>Biogas</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput('Sag ganz kurz was über Fördergelder!'); setBotResponse(""); return false;}}>Fördergelder</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput('Sag ganz kurz was über Gesetzesänderungen für Energieverbraucher!'); setBotResponse(""); return false;}}>Verbraucher</button>
          <button className="btn m-2 btn-sm btn-outline-success" onClick={(e) => {e.preventDefault(); setInput('Wie kann ich mein Stromverbrauch als Gewerbetreibende  optimieren?'); setBotResponse(""); return false;}}>Optimieren</button>
        </div>        
        <textarea
          className="border border-primary rounded mb-4"
          rows="4"
          placeholder="Frage stellen..."
          value={input}
          style={{width: "65%"}}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button style={{width: "120px", height: "40px"}}
          type="submit" className="btn btn-primary bg-xblue-500 text-black-100 py-2 px-4 rounded hover:bg-blue-600"
          disabled={loading}
          onClick={() => {handleSubmit(this); return false;}       } 
        >{loading ? 'Warten...' : 'Absenden'}</button>
          <p /> <br />

      </form>
      </div>
      <Footer /> 
    </div>
  );
}


// Second Page Component


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

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * The ModelSelector component.
   *
   * This component renders a dropdown menu (select HTML element) that
   * allows the user to select a GPT model. The model options are hardcoded.
   * The selected model is stored in the component's state.
/******  84ec35bb-cc73-4a74-8385-1668e3ecfb00  *******/
function ModelSelector() {

  const [selectedGPT, setSelectedGPT] = useState("1");

  const handleChange = (event) => {
    setSelectedGPT(event.target.value);
  };
  return (
    <div className="float-right">
    <center style={{fontSize: "12pt"}}>
      <select value={selectedGPT} onChange={handleChange} className="form-select"  selected="2" aria-label="Selector" style={{width: "350px", float: "right" }}>
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
