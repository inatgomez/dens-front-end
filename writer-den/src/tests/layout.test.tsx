import { render, screen } from "@testing-library/react";
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
