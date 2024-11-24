export const getLocaleDateTime = (offset = -5)  => {
  const dateCol = new Date().toLocaleString("en-US", {
    timeZone: "America/Bogota",
    hour12: false
  });
  const newDate = new Date(dateCol);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  const hora = String(newDate.getHours()).padStart(2, '0');
  const minutes = String(newDate.getMinutes()).padStart(2, '0');
  const second = String(newDate.getSeconds()).padStart(2, '0');
  const mSeconds = String(newDate.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hora}:${minutes}:${second}.${mSeconds}000`;
}