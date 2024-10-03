import { extractNumber, generateAvatarPath } from "../utility/AvatarConvert";

function SeatedUser({avatar, nickname, showName}) {

    return (
    <div style={{ textAlign: 'center', backgroundColor: 'transparent', padding:'1px', borderRadius: '5px', width: '100%', height: '100%' }}>
        <img 
            src={generateAvatarPath(avatar)}
            title={nickname}
            style={{ 
                borderRadius: '50%', 
                width: '100%', // Adjust size as needed
                height: '100%', // Adjust size as needed
            }} 
        />
        {showName &&
        <p style={{maxWidth: '100%', maxHeight: '30%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nickname}</p>
    }
    </div>
    );
}

export default SeatedUser;