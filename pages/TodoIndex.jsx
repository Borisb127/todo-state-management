import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, saveTodo } from '../store/actions/todo-actions.js'
import { userService } from '../services/user.service.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    // const [todos, setTodos] = useState(null)
    // const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    // const [filterBy, setFilterBy] = useState(defaultFilter)
    const user = useSelector(state => state.loggedinUser)

    const todos = useSelector(state => state.todos)
    const filterBy = useSelector(state => state.filterBy)
    const isLoading = useSelector(state => state.isLoading)
    // console.log('store todos:', todos )

    const dispatch = useDispatch()

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()



    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                console.eror('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [
        filterBy.txt,
        filterBy.importance,
        filterBy.status,
        filterBy.sortBy,
        filterBy.pageIdx
    ])

    function onRemoveTodo(todoId) {
        if (!confirm('Are you sure you want to delete this todo?')) return

        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        saveTodo(todoToSave)
            .then(() => {
                showSuccessMsg(`Todo is ${(!todo.isDone) ? 'done' : 'back on your list'}`)
                if (!todo.isDone && user) {
                    userService.updateBalance(user._id, 10)
                        .then(() => {
                            return userService.addActivity(user._id, 'Completed: ' + todo.txt)
                        })
                        .then(updatedUser => {
                            dispatch({ type: 'SET_USER', loggedinUser: updatedUser })
                        })
                        .catch(err => console.log('Error:', err))
                }
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todo._id)
            })
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }


    // if (isLoading) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>

            <h2>Todos List</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <React.Fragment>
                    {todos.length === 0 && <div>No todos to show...</div>}
                    <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
                    <hr />
                    <h2>Todos Table</h2>
                    <div style={{ width: '60%', margin: 'auto' }}>
                        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
                    </div>
                </React.Fragment>
            )}
        </section>
    )
}