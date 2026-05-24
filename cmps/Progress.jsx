const { useSelector } = ReactRedux
import { getStats } from '../store/actions/todo-actions.js'

export function Progress() {
    const { total, done } = useSelector(getStats)

    return (
        <div className="progress">
            <span>{done}/{total} done</span>
            <progress value={done} max={total}></progress>
        </div>
    )
}