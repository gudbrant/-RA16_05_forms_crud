import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
import LoadData from './components/LoadData';
import AddForm from './components/AddForm';
import NotesList from './components/NotesList';

class App extends Component {
  constructor() {
    super();

    this.state = {
      notes: []
    };

    this.notesURL = "https://ra-crud-server.herokuapp.com/notes";
  }

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    axios
      .get(this.notesURL)
      .then(response => this.setState({ notes: response.data }));
  };

  handleAdd = note => {
    axios.post(this.notesURL, note).then(() => this.loadNotes());
  };

  handleDelete = id => {
    axios.delete(`${this.notesURL}/${id}`).then(() => this.loadNotes());
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="ui text container segment">
          <LoadData loadData={this.loadNotes}/>
          <NotesList notes={this.state.notes} handleDelete={this.handleDelete} />
          <AddForm handleAdd={this.handleAdd} />
        </div>
      </div>
    );
  }
}

export default App;
