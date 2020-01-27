import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cliente from './components/cliente'

function App() {
  return (
    <Router>
      {/* <div className="container p-4"> */}
        <Route path="/" exact component={Cliente} />
{/*        <Route path="/edit/:id" component={CreateNote} />
 */}   {/*   </div> */}
    </Router>
  );
}

export default App;