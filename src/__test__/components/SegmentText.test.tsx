import { render, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { SegmentText } from "../../components/atoms";

describe("<SegmentText />", () => {
  let component: RenderResult;
  beforeEach(() => {
    component = render(<SegmentText label="segment text" />);
  });
  test("Renders label text correctly", () => {
    const segmentIcon = component.container.querySelector("svg");
    expect(component.container).toHaveTextContent("segment text");
    expect(segmentIcon).toBeInTheDocument();
    expect(component.container).toBeInTheDocument();
  });
});
