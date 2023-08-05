const formatTime = (date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}  `;
};

const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};

const daysInIndonesian = [
  'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
];

const combineDateAndTime = (date, time) => {
  const combined = new Date(date);
  combined.setHours(time.getHours());
  combined.setMinutes(time.getMinutes());
  return combined;
};

export { formatDate, formatTime, isToday, daysInIndonesian, combineDateAndTime };