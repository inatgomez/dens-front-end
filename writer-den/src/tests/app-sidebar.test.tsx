import { render, screen } from "@testing-library/react";
import { AppSidebar } from "@/components/app-sidebar";

describe("Sidebar component", () => {
  it("renders correctly", () => {
    render(<AppSidebar />);
    const sidebarElement = screen.getByRole("navigation");
    expect(sidebarElement).toBeInTheDocument();
  });
});
