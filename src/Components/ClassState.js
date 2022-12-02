
import React, { Component } from 'react'

class ClassState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          task: 'Create tasks',
          completed: false,
        },
        {
          id: 2,
          task: 'Read tasks',
          completed: false,
        },
        {
          id: 3,
          task: 'Mark complete',
          completed: false,
        },
        {
          id: 4,
          task: 'Delete tasks',
          completed: false,
        },
      ],
      currentItem: '',
    }
  }

  componentDidMount() {
    let localList = JSON.parse(localStorage.getItem('list'));
    if (localList !== null) {
      this.setState(() => {
        return {
          list: localList
        }
      })
    }
  }

  handleChange = e => {
    this.setState({currentItem: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()

    // generate an unused id
    let newId = 1;
    let sortedListByIds = this.state.list.slice().sort((a, b) => (a.id - b.id))
    for (let i = 0; i < sortedListByIds.length; i++) {
      if (newId === sortedListByIds[i].id) {
        newId++
      }
    }
    this.setState(prevState => {
      const newItem = {
        id: newId,
        task: prevState.currentItem,
        completed: false,
      }
      return {
        list: [...prevState.list, newItem],
        currentItem: '',
      }
    }, () => localStorage.setItem('list', JSON.stringify(this.state.list))
    )
  }

  toggleCompleteStatus = id => {
    this.setState(() => {
      return {
        list: this.state.list.map( item => item.id === id ? {...item, completed: !item.completed} : item)
      }
    }, () => localStorage.setItem('list', JSON.stringify(this.state.list))
    )
  }

  deleteTask = id => {
    let filteredList = this.state.list.filter( item => item.id !== id)
    this.setState({
      list: [...filteredList]
    }, () => localStorage.setItem('list', JSON.stringify(this.state.list))
    )
  }

  render() {
    return (
        <div>      
            <h3>Things to do:</h3>
            <ul style={{listStyleType: 'none'}}>
              {this.state.list.length ? (
                this.state.list.map( item => (
                  <React.Fragment key={item.id}>
                    <li onClick={() => this.toggleCompleteStatus(item.id)} style={{textDecoration: item.completed ? 'line-through' : 'none'}}>
                      {item.task}
                    </li> <button onClick={() => this.deleteTask(item.id)}>x</button>
                  </React.Fragment>
                ))
              ) : (
                null
              )}
            </ul>
            <h4>Add task:</h4>
            <form onSubmit={this.handleSubmit}>
              <input type="text" autoFocus value={this.state.currentItem} onChange={this.handleChange} />
              <button type="submit">+</button>
            </form>
      </div>
    );
  }
}
 
export default ClassState;