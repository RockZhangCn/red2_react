// Example of extracting the number from the avatar string
const extractNumber = (avatarPath) => {
  const match = avatarPath.match(/_(\d+)\.png/);
  return match ? Number(match[1]) : 0; // Returns the number or null if not found
};

const generateAvatarPath = (avatar) => {
  return `/avatar/icon_${avatar}.png`;
};

export { extractNumber, generateAvatarPath };
