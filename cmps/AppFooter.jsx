const { useSelector, useDispatch } = ReactRedux

export function AppFooter() {
    const todos = useSelector(state => state.todos)
    const filterBy = useSelector(state => state.filterBy)
    const dispatch = useDispatch()

    const doneTodos = todos.filter(todo => todo.isDone).length
    const totalTodos = todos.length

    function onChangePage(diff) {
        dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy, pageIdx: filterBy.pageIdx + diff } })
    }

    return (
        <footer className="app-footer">
            <div className="progress-bar">
                <span>{doneTodos}/{totalTodos} done</span>
                <progress value={doneTodos} max={totalTodos}></progress>
            </div>

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
                            disabled={todos.length === 0}
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