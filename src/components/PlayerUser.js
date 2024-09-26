
function PlayerUser({avatar, nickname}) {

    return (
    <div style={{ textAlign: 'center', backgroundColor: 'transparent', padding:'auto', borderRadius: '5px', width: '100%', height: '100%' }}>
        <img 
            src={avatar}
            title={nickname}
            style={{ 
                borderRadius: '50%', 
                width: '100%', // Adjust size as needed
                height: '100%', // Adjust size as needed
                maxHeight: '7vh',
                maxWidth: '7vh'
            }} 
        />
        <p style={{maxWidth: '100%', maxHeight: '30%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nickname}</p>
    </div>
    );
}

export default PlayerUser;