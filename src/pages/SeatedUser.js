function SeatedUser({avatar, nickname}) {
    return (
        <div style={{ textAlign: 'center', backgroundColor: 'transparent', padding:'1px', borderRadius: '5px', width: '100%', height: '100%' }}>
        <img 
            src={avatar}
            style={{ 
                borderRadius: '50%', 
                width: '100%', // Adjust size as needed
                height: '100%' // Adjust size as needed
            }} 
        />
        {/* <p style={{maxWidth: '100%', maxHeight: '30%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nickname}</p> */}
    </div>
    );
}

export default SeatedUser;