import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


const App= ()=> {

  let pageSize = 10;
  const apiKey=process.env.REACT_APP_NEWS_API_KEY;

  const [progress, setProgress] = useState(10);

    return (

      <>

        <Router>

          <NavBar />

          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
            />

          <Routes>

            <Route exact path='/home' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} key="general" country="in" category="general" />}> </Route>
            <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} key="sports" country="in" category="business" />}> </Route>
            <Route exact path='/entertainment' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} key="entertainment" country="in" category="entertainment" />}> </Route>
            <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} key="health" country="in" category="health" />}> </Route>
            <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} key="science" country="in" category="science" />}> </Route>
            <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} key="sports" country="in" category="sports" />}> </Route>
            <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={pageSize} key="technology" country="in" category="technology" />}> </Route>

          </Routes>


        </Router>

      </>

    );

}

export default  App;