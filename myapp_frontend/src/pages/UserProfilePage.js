import React from "react"


const UserProfilePage = (props) => {

    if (!props.users.length) {
        return <h1>Loading...</h1>
    }
    const usersArray = props.users;
    const userId = props.match.params.id;
    const userInfo = usersArray.find((user) => (
        user.id === userId
    ));

    console.log(props.users)
    const { username } = userInfo


    return (
        <>
            <div>
                {
                    username ? `Hi, my name is ${username} !` :
                        null

                }
            </div>

            <div>

            </div>
        </>
    )
}

export default UserProfilePage


