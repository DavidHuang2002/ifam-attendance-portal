import { getGraduationYear } from "../../utils/dateUtils";
import { GRAD_STUDENT_CLASS } from "../../constants/participant";

describe("getGraduationYear", () => {
  it("should return the correct graduation year for a given grade", () => {
    const currentAcademicYear = 2023;

    // Test case 1: Freshman
    expect(getGraduationYear("Undergrauate Freshman")).toBe(
      currentAcademicYear + 4 - 0
    );

    // Test case 2: Sophomore
    expect(getGraduationYear("Undergrauate Sophomore")).toBe(
      currentAcademicYear + 4 - 1
    );

    // Test case 3: Junior
    expect(getGraduationYear("Undergrauate Junior")).toBe(
      currentAcademicYear + 4 - 2
    );

    // Test case 4: Senior
    expect(getGraduationYear("Undergrauate Senior")).toBe(
      currentAcademicYear + 4 - 3
    );

    // Test case 5: Graduate
    expect(getGraduationYear("Graduate")).toBe(GRAD_STUDENT_CLASS);
  });
});
