/**
 * @jest-environment jsdom
 * Testing the Admin Dashboard Page
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "@/app/admin/page";

// Mocking the Next.js router for testing purposes
jest.mock("next/link", () => {
  return ({ children }) => {
    return children;
  };
});

jest.mock("next/router", () => require("next-router-mock"));

describe("Admin Dashboard Page", () => {
  it("renders without crashing", () => {
    expect(
      screen.getByText("Welcome back to the Admin Portal!")
    ).toBeInTheDocument();
  });

  const upcomingEventsText = "Our Upcoming Events";

  it("renders the UpcomingEvents components", () => {
    render(<Dashboard />);
    expect(screen.getByText(upcomingEventsText)).toBeInTheDocument();
  });
});
