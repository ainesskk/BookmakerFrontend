import User from "./User.jsx";

export default function UsersList({ users }) {
    return (
        <>
            <div>
                {
                    users.map(user => {
                        return (
                            <User key={user.username} user={user} />
                        )
                    })
                }
            </div>
        </>
    )
}
