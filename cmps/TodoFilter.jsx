import { utilService } from '../services/util.service.js'
import { SET_FILTER_BY } from '../store/reducers/todo.reducer.js'

const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux


export function TodoFilter() {

    const filterBy = useSelector(state => state.todoModule.filterBy)
    const dispatch = useDispatch()

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedSetFilter = useRef(utilService.debounce((newFilter) =>
        dispatch({ type: SET_FILTER_BY, filterBy: newFilter }), 500))


    useEffect(() => {
        console.log('useEffect fired:', filterByToEdit)

        debouncedSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { txt, importance, status, sortBy } = filterByToEdit

    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />

                <label htmlFor="status">Status: </label>
                <select name="status" id="status" value={status} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="done">Done</option>
                </select>


                <label htmlFor="sortBy">Sort: </label>
                <select name="sortBy" id="sortBy" value={sortBy} onChange={handleChange}>
                    <option value="">None</option>
                    <option value="txt">Text</option>
                    <option value="importance">Importance</option>
                    <option value="createdAt">Date</option>
                </select>


                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}