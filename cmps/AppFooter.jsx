const { useSelector, useDispatch } = ReactRedux

import { Progress } from './Progress.jsx'
import { getStats } from '../store/actions/todo-actions.js'

export function AppFooter() {
    const filterBy = useSelector(state => state.filterBy)
    const dispatch = useDispatch()
    const maxPage = useSelector(state => state.maxPage)

    const { total, done } = useSelector(getStats)
    // const todos = useSelector(state => state.todos)
    // const doneTodos = todos.filter(todo => todo.isDone).length
    // const totalTodos = todos.length


    function onChangePage(diff) {
        dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy, pageIdx: filterBy.pageIdx + diff } })
    }

    return (
        <footer className="app-footer">
            <Progress />
            <div className="paging">
                {filterBy.pageIdx !== '' && filterBy.pageIdx !== undefined ? (
                    <React.Fragment>
                        <button onClick={() => dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy, pageIdx: '' } })}>Show All</button>

                        <button
                            disabled={filterBy.pageIdx === 0}
                            onClick={() => onChangePage(-1)}>
                            Prev
                        </button>

                        <span> Page {filterBy.pageIdx + 1} </span>

                        <button
                            disabled={filterBy.pageIdx >= maxPage - 1}
                            onClick={() => onChangePage(1)}>
                            Next
                        </button>


                    </React.Fragment>
                ) : (
                    <button onClick={() => dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy, pageIdx: 0 } })}>Show Pages</button>
                )}
            </div>
        </footer>
    )
}