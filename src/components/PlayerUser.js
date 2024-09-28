
function PlayerUser({avatar, nickname, horizontal}) {

    return (
    <div style={{textAlign: 'center', backgroundColor: 'transparent', padding:'auto', width: '100%', height: '20%' }}>
        <img 
            src={avatar}
            title={nickname}
            style={{ 
                display: horizontal?'inline':'block',
                marginLeft: 'auto',
                marginRight:'auto',
                borderRadius: '50%', 
                width: 'auto', // Adjust size as needed
                height: '100%', // Adjust size as needed
                maxHeight: '7vh',
                maxWidth: '7vh'
            }} 
        />
        <p style={{display: horizontal?'inline':'block', marginLeft: 'auto',marginRight:'auto', 
            maxWidth: '100%', maxHeight: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nickname}</p>
    </div>
    );
}

export default PlayerUser;