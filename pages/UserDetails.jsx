const { useState } = React
const { useSelector } = ReactRedux


import { updateUser } from '../store/actions/user-actions.js'

export function UserDetails() {
    const user = useSelector(state => state.userModule.loggedinUser)
    const [fullname, setFullname] = useState(user ? user.fullname : '')
    const [color, setColor] = useState(user && user.prefs ? user.prefs.color : '#000000')
    const [bgColor, setBgColor] = useState(user && user.prefs ? user.prefs.bgColor : '#ffffff')


    function onSave() {
        const updatedUser = { ...user, fullname, prefs: { color, bgColor } }
        updateUser(updatedUser)
    }


    if (!user) return <div>Please login first</div>

    return (
        <section
            className="user-details"
            style={{
                color: user.prefs ? user.prefs.color : '#000000',
                backgroundColor: user.prefs ? user.prefs.bgColor : '#ffffff'
            }
            }>

            <h1>Profile</h1>
            <h2>Hello {user.fullname}</h2>
            <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
            />
            <p>Balance: ${user.balance}</p>

            <label>Color: </label>
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />

            <label>BG Color: </label>
            <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
            />

            <h2>Activities</h2>
            {user.activities && user.activities.length > 0
                ? <ul>
                    {user.activities.map((activity, idx) =>
                        <li key={idx}>{activity.txt} - {new Date(activity.at).toLocaleString()}</li>
                    )}
                </ul>
                : <p>No activities yet</p>
            }

            <button onClick={onSave}>Save</button>

        </section>
    )
}