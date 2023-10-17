import GitContainer from "./components/GitContainer";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

import "./styles/components/app.sass";



function App() {

  return (
    <>
    <div id="portfolio">
     <h1>Vinicius Marcham da Silva</h1>
      <Sidebar />
      <MainContent />

    </div>
    
    <div id="Github">
     <GitContainer />
    </div>
    </>
  )
}

export default App
