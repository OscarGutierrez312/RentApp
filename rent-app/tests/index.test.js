import Carousel from "../components/carousel";
import Seguro from "../pages/info/seguros";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Carousel", () => {
    it("renders a Carousel", () => {
      render(<Carousel />);
      // check if all components are rendered
      expect(screen.getByTestId("tittle")).toBeInTheDocument();
    });
  });