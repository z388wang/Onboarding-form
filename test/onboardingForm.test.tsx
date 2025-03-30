import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

global.fetch = jest.fn();

describe("Onboarding Form Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all input fields and submit button", () => {
    render(<Home />);
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("phoneNumber")).toBeInTheDocument();
    expect(screen.getByTestId("corporationNumber")).toBeInTheDocument();
    expect(screen.getByTestId("submit")).toBeInTheDocument();
  });

  test("shows error on empty required fields when submitting", async () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId("submit"));

    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Phone number is required")).toBeInTheDocument();
    expect(
      screen.getByText("Corporation number is required")
    ).toBeInTheDocument();
  });

  test("validates phone number is valid", async () => {
    render(<Home />);
    fireEvent.change(screen.getByTestId("phoneNumber"), {
      target: { value: "12345678" },
    });
    expect(screen.getByText("Invalid phone number")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("phoneNumber"), {
      target: { value: "5195735673" },
    });
    expect(screen.queryByText("Invalid phone number")).not.toBeInTheDocument();
  });

  test("validates corporation number is valid", async () => {
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (
        url ===
        "https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/222222222"
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              valid: false,
              message: "Invalid corporation number",
            }),
        });
      } else if (
        url ===
        "https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/123456789"
      ) {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              corporationNumber: "123456789",
              valid: true,
            }),
        });
      }
    });
    render(<Home />);

    fireEvent.change(screen.getByTestId("corporationNumber"), {
      target: { value: "222222222" },
    });
    fireEvent.blur(screen.getByTestId("corporationNumber"));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/222222222"
      );
      expect(
        screen.getByText("Invalid corporation number")
      ).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("corporationNumber"), {
      target: { value: "123456789" },
    });
    fireEvent.blur(screen.getByTestId("corporationNumber"));
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/123456789"
      );
      expect(
        screen.queryByText("Invalid corporation number")
      ).not.toBeInTheDocument();
    });
  });

  test("shows success message on valid form submission", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    render(<Home />);
    fireEvent.change(screen.getByTestId("firstName"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("lastName"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("phoneNumber"), {
      target: { value: "5195735673" },
    });
    fireEvent.change(screen.getByTestId("corporationNumber"), {
      target: { value: "123456789" },
    });
    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Onboarding successful");
    });
  });
});
