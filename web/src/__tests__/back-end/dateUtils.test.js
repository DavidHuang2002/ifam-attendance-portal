import {
  getGraduationYear,
  dateTimeToDate,
  dateTimeToTime,
} from "../../utils/dateUtils";
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

describe("dateTimeToDate", () => {
  it("should convert a dateTime string to a formatted date string", () => {
    const dateTime = "2022-10-15T12:30:00Z";
    const expectedDate = "10/15/2022";

    expect(dateTimeToDate(dateTime)).toBe(expectedDate);
  });
});

describe("dateTimeToTime", () => {
  it("should convert a dateTime string to a formatted time string", () => {
    // the time is in UTC, so the expected time is 12:30 after factoring in the timezone offset
    const dateTime = "2022-10-15T17:30:00Z";
    const expectedTime = "12:30";

    expect(dateTimeToTime(dateTime)).toBe(expectedTime);
  });
});
