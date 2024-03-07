/**
 * @jest-environment jsdom
 * Testing the Admin Dashboard Page
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "@/app/admin/page";

// Mocking the Next.js router
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

  it("renders the UpcomingEvents and LayoutSider components", () => {
    render(<Dashboard />);
    expect(screen.getByText("UpcomingEvents Component")).toBeInTheDocument(); // Mock or adjust based on actual component output
    expect(screen.getByText("LayoutSider Component")).toBeInTheDocument(); // Mock or adjust based on actual component output
  });
});
