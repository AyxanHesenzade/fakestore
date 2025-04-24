
function Header ({name, surname, isLoggedIn, firends}){
    return (
    <div>
        <h1> 
            { isLoggedIn
            ? `${name}, ${surname}`
            : `Girish olmadi`
            }
        </h1>

        {
            firends.map((firend, index) => (
                <div key={firend.id}>
                   <p>{index+1} - {firend.name}</p> 
                </div>
            )
        )
        }
    </div>
    )
    
}

export default Header