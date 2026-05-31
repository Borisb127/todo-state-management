import { todoService } from '../../services/todo.service.js'
import { addActivity, updateBalance } from './user-actions.js'
import { store } from '../store.js'
import { SET_TODOS, REMOVE_TODO, ADD_TODO, UPDATE_TODO, SET_IS_LOADING, SET_MAX_PAGE, SET_TODOS_STATS } from '../reducers/todo.reducer.js'


export function loadTodos(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(({ todos, maxPage, todosStats }) => {
            store.dispatch({ type: SET_TODOS, todos })
            store.dispatch({ type: SET_TODOS_STATS, doneTodos: todosStats.doneTodosCount, totalTodos: todosStats.totalTodos })
            store.dispatch({ type: SET_MAX_PAGE, maxPage })
        })
        .catch(err => {
            console.error('Cannot load todos:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
        .catch(err => {
            console.error('Cannot remove todo:', err)
            throw err
        })
}

export function saveTodo(todo, isToggle = false) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return todoService.getTodoStats()
                .then(todosStats => {
                    store.dispatch({
                        type: SET_TODOS_STATS,
                        doneTodos: todosStats.doneTodosCount,
                        totalTodos: todosStats.totalTodos
                    })
                    const user = store.getState().userModule.loggedinUser

                    if (user) {
                        const actionName = todo._id ? 'Updated' : 'Added'
                        addActivity(user._id, `${actionName} a Todo: ${todo.txt}`)
                        if (isToggle && todo.isDone) {
                            updateBalance(user._id, 10)
                        }
                    }
                    return savedTodo
                })
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

export function getStats(state) {
    return {
        total: state.todoModule.totalTodos,
        done: state.todoModule.doneTodos
    }
}