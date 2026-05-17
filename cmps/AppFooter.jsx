const { useSelector } = ReactRedux

export function AppFooter() {
    const todos = useSelector(state => state.todos)
    const doneTodos = todos.filter(todo => todo.isDone).length
    const totalTodos = todos.length

    return (
        <footer className="app-footer">
            <div className="progress-bar">
                <span>{doneTodos}/{totalTodos} done</span>
                <progress value={doneTodos} max={totalTodos}></progress>
            </div>
        </footer>
    )
}