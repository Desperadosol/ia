export function generatePassword(length = 15) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}

export function addMinutes(time, minutes) {
  const [hours, mins] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + mins + minutes;
  const hoursNew = Math.floor(totalMinutes / 60);
  const minsNew = totalMinutes % 60;
  return `${hoursNew.toString().padStart(2, "0")}:${minsNew
    .toString()
    .padStart(2, "0")}`;
}
