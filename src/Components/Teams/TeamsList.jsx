import Team from "./Team.jsx";

export default function EventsList({teams}) {
    return (
        <>
            <div>
                {
                    teams.map(team => {
                        return <Team key={team.id} event={team}></Team>
                    })
                }
            </div>
        </>
    )
}