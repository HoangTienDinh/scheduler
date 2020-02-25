import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText } from "@testing-library/react";

import Application from "components/Application.js";

// import "../../__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {



  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });

  });

  // using a promise for asynchronous calls
  // it("changes the schedule when a new day is selected", () => {
  //   const { getByText } = render(<Application />);

  //   return waitForElement(() => getByText("Monday")).then(() => {
  //     fireEvent.click(getByText("Tuesday"));

  //     expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //   });
  // });

  // using async await for asynchronous calls
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    // console.log(prettyDOM(appointment))

    // console.log(debug(appointment))

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //WHY DOES THE ORDER MATTER HERE?!
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    // console.log(debug(appointment))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
      );

    // console.log(prettyDOM(day));


    expect(getByText(day, "no spots remaining")).toBeInTheDocument();






  });



})