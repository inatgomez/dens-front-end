import { fireEvent, render, screen } from "@testing-library/react";
import Layout from "@/components/layout";

describe("Layout with Sidebar", () => {
  it("renders AppSidebar correctly within the layout", () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    const sidebarElement = screen.getByRole("navigation");
    expect(sidebarElement).toBeInTheDocument();
  });
});

describe("Sidebar Trigger Button", () => {
  it("collapses the sidebar to icon mode when SidebarTrigger is clicked with collapsible='icon'", () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    const toggleButton = screen.getByRole("button", {
      name: /SidebarTrigger/i,
    });

    const sidebarElement = screen.getByRole("navigation");
    expect(sidebarElement).not.toHaveAttribute("data-collapsible", "icon");

    fireEvent.click(toggleButton);

    expect(sidebarElement).toHaveAttribute("data-collapsible", "icon");
  });
});
