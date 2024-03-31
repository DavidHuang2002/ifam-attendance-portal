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

