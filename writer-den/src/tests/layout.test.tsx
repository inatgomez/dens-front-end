import { fireEvent, render, screen } from "@testing-library/react";
import Layout from "@/components/layout";

fetchMock.mockResponse(
  JSON.stringify({
    projects: [
      { unique_id: "1", name: "Sample project 1" },
      { unique_id: "2", name: "Sample project 2" },
      { unique_id: "3", name: "Sample project 3" },
    ],
  })
);

describe("Layout with Sidebar", () => {
  it("renders AppSidebar correctly within the layout", async () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );
    const sidebarElement = await screen.findByTestId("sidebar");
    expect(sidebarElement).toBeInTheDocument();
  });
});

describe("Sidebar Trigger Button", () => {
  it("collapses the sidebar to icon mode when SidebarTrigger is clicked with collapsible='icon'", async () => {
    render(
      <Layout>
        <div>Test content</div>
      </Layout>
    );

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });

    const sidebarElement = await screen.findByTestId("sidebar");
    expect(sidebarElement).not.toHaveAttribute("data-collapsible", "icon");

    fireEvent.click(toggleButton);

    expect(sidebarElement).toHaveAttribute("data-collapsible", "icon");
  });
});
