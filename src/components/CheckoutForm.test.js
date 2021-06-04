import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const { getByText } = render(<CheckoutForm />);
    const header = getByText(/Checkout Form/i);
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    const { getByLabelText, getByText, queryByTestId, queryByText } = render(<CheckoutForm />);

    const firstNameInput = getByLabelText(/First Name/i);
    const lastNameInput = getByLabelText(/Last Name/i);
    const addressInput = getByLabelText(/Address/i);
    const cityInput = getByLabelText(/City/i);
    const stateInput = getByLabelText(/State/i);
    const zipInput = getByLabelText(/Zip/i);


    fireEvent.change(firstNameInput, { target: { value: 'FirstName' } });
    fireEvent.change(lastNameInput, { target: { value: 'LastName' } });
    fireEvent.change(addressInput, { target: { value: 'Street1' } });
    fireEvent.change(cityInput, { target: { value: 'MyCity' } });
    fireEvent.change(stateInput, { target: { value: 'MyState' } });
    fireEvent.change(zipInput, { target: { value: '123456' } });

    const button = getByText("Checkout");
    fireEvent.click(button);
    expect(queryByTestId("successMessage")).toBeInTheDocument();
    expect(queryByText(/FirstName/i)).toBeInTheDocument();
    expect(queryByText(/LastName/i)).toBeInTheDocument();
    expect(queryByText(/Street1/i)).toBeInTheDocument();
    expect(queryByText(/MyCity/i)).toBeInTheDocument();
    expect(queryByText(/MyState/i)).toBeInTheDocument();
    expect(queryByText(/123456/i)).toBeInTheDocument();
});