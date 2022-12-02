//functional comp is plain js that accepts props as an argument and returns a react component
//before funnction comp data from the state had to be passsed down as props from class comp to functinal component
// func comp to use state we can use the usestate hook.
// in func comp we declare a state variable along with with a set state variable
// by using array destructuring instead of declaring state as an obj 
// import React, { useState } from 'react';
// const FunctionComponent = () => {
//   const [list, setList] = useState([]);
//   const [currentItem, setCurrentItem = useState('');
//   return ();
// }
// export default FunctionComponent

// each item in the list is an obj with 3 properties each id task and completed
//we have initalized state and rendered out our components. let add some functionality
// that will manipulate our state data such as adding tasks, markings task complete and deleting tasks

//in both state and functional components, when updating the state we should not uodate directly.
// or class components the provided method is setState.
//  function components, we can use the set state variable we declared when we initialized our state using the React hook useState.

// Unlike in the class component where we can update two properties at once, with useState we have to do it separately for each.



import React, { useState, useEffect } from 'react'

 const  FunctionalState =() => {
    const [list, setList] = useState(
        [
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
      )

// The handleChange and handleSubmit will use the set variables we declared when we initialized our state via the useState React hook.
//Recall that when we set up our array destructuring for currentItem the second item was setCurrentItem. This is what we use to update our currentItem 
//user enter info will store below
const [currentItem, setCurrentItem] = useState('')

      useEffect(() => {
        let localList = JSON.parse(localStorage.getItem('list'));
        if (localList !== null) {
          setList(localList)
        }
      }, []) // empty array as second argument will behave exactly like componentDidMount

      const handleChange = e => setCurrentItem(e.target.value)
      const handleSubmit = e => {
        e.preventDefault()

         // generate an unused id
    let newId = 1;
    let sortedListByIds = list.slice().sort((a, b) => (a.id - b.id))
    for (let i = 0; i < sortedListByIds.length; i++) {
      if (newId === sortedListByIds[i].id) {
        newId++
      }
    }

    //  useState can also accept a function as an argument and we can pass in an argument to that function,
    //  in our case prevList, to grab the previous data. To reset the input field we can pass in an empty string in setCurrentItem…
    setList(prevList => {
        const newItem = {
          id: newId,
          task: currentItem,
          completed: false,
        }
        return [...prevList, newItem]
      })
    // reset the input field we can pass in an empty string in setCurrentItem
      setCurrentItem('')
    }
  
// marking an item as complete or incomplete and for the button to delete a task will be the same. 
// Clicking a list item will give it a strike-through to indicate the task is complete and clicking it again
//  will remove the strike-through indicating that it is not complete. Each list item will also have a button to delete the item from the list.


// For toggleCompleteStatus we’ll pass in an id and use setState to return an object with a list property. We’ll use the map method to map through 
// the current list and find the item with the matching id and toggle that item’s complete status from false to true or vice versa.
    const toggleCompleteStatus = id => {
        setList(list.map( item => item.id === id ? {...item, completed: !item.completed} : item))
      }
   
    //   For the deleteTask function, we’ll also pass in an id. We’ll also declare a variable let filteredList and we’ll use the 
    //   filter method to search each item in the list for an id that doesn’t match the argument. All items that don’t match
    //    will be returned in a new array leaving out the item that is being deleted. We can then use setState to return an object with the list property equal to an array with the filteredList spread out.
      const deleteTask = id => {
        let filteredList = list.filter( item => item.id !== id)
        setList([...filteredList])
      }
    
    //   This first is a string which is used as our key and the second is a JSON object which is used as our value. We’ll use the method JSON.stringify and pass in our list to convert it to a JSON object…
      useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
      }, [list])

  return (
    // <div>FunctionalState</div>
    <>
<ul style={{listStyleType: 'none'}}>
            {list.length ? (
              list.map( item => (
                <React.Fragment key={item.id}>
                  <li onClick={() => toggleCompleteStatus(item.id)} style={{textDecoration: item.completed ? 'line-through' : 'none'}}>
                    {item.task}
                  </li> <button onClick={() => deleteTask(item.id)}>x</button>
                </React.Fragment>
              ))
            ) : (
              null
            )}
          </ul>
<h4>Add task:</h4>
<form onSubmit={handleSubmit}>
  <input type="text" autoFocus value={currentItem} onChange={handleChange} />
  <button type="submit">+</button>
</form>
</>
  );
}

export default FunctionalState


  
  
 
