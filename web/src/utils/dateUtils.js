const getCurrentAcademicYear = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const academicYear = currentMonth > 7 ? currentYear : currentYear - 1;
  return academicYear
};

export const getGraduationYear = (text) => {
  const currentAcademicYear = getCurrentAcademicYear();
  
  const grade = text.split(" ")[1];
  const year =
    currentAcademicYear +
    4 -
    ["Freshman", "Sophomore", "Junior", "Senior"].indexOf(grade);
  return year;
};

// take dateTime and turn it into a date string like 01/01/2021
export const dateTimeToDate = (dateTime) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString();
}
// take dateTime and turn it into a time string 13:04
export const dateTimeToTime = (dateTime) => {
  const date = new Date(dateTime);
  // Get hours and minutes, ensuring to pad single digits with a leading zero
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  // Construct the time string in HH:MM format
  return `${hours}:${minutes}`;
}