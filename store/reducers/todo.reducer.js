import { todoService } from '../../services/todo.service.js'

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_TODOS_STATS = 'SET_TODOS_STATS'
export const SET_MAX_PAGE = 'SET_MAX_PAGE'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: false,
    doneTodos: 0,
    totalTodos: 0,
    maxPage: null,
}

export function todoReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case REMOVE_TODO:
            var todos = state.todos.filter(todo => todo._id !== cmd.todoId)
            return { ...state, todos }

        case ADD_TODO:
            var todos = [...state.todos, cmd.todo]
            return { ...state, todos }

        case UPDATE_TODO:
            var todos = state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo)
            return { ...state, todos }

        case SET_TODOS_STATS:
            return { ...state, doneTodos: cmd.doneTodos, totalTodos: cmd.totalTodos }

        case SET_MAX_PAGE:
            return { ...state, maxPage: cmd.maxPage }

        case SET_FILTER_BY:
            return { ...state, filterBy: cmd.filterBy }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        default:
            return state
    }
}