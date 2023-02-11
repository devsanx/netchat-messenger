export const stringAvatar = (name: string) => {
  const nameSplit = name.split(" ");
  const firstLetter = nameSplit[0][0];
  const secondLetter = nameSplit.length > 1 ? nameSplit[1][0] : nameSplit[0][1];
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstLetter}${secondLetter}`,
  };
};

const stringToColor = (string: string) => {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
};
