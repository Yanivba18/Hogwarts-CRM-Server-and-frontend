import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "tabler-react/dist/Tabler.css";
import { Switch, Route, BrowserRouter as Router, useParams } from 'react-router-dom';
import { Page, Card, Button } from "tabler-react";
import NavBar from './components/NavBar';
import Students from './components/Students';
import AddStudent from './components/AddStudent';
import StudentPage from './components/StudentPage';
import HomePage from './components/HomePage';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
            {/* <Card>
              <Card.Header>
                <Card.Title>Card Title</Card.Title>
              </Card.Header>
              <Card.Body>
                <Button color="primary">A Button</Button>
              </Card.Body>
            </Card> */}
          </Route>
          <Route exact path="/students">
            <Students />
          </Route>
          <Route exact path="/students/add-student/">
            <AddStudent />
          </Route>
          <Route path="/students/:studentName">
              <StudentPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
