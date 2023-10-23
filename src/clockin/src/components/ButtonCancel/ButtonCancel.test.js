import { render, screen } from "@testing-library/react";
import ButtonCancel from ".";

test("ButtonCancel component", () => {
  render(<ButtonCancel />);
  const ButtonCancelTest = screen.getByText("Cancelar");
  expect(ButtonCancelTest).toBeInTheDocument();
});
