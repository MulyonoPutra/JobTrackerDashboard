export const randomAvatar = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const endpoint = 'https://robohash.org'
  let text = '';

  for (let i = 0; i < 10; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return `${endpoint}/${text}`;
}
