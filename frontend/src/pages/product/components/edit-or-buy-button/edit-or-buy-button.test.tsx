import { fireEvent, render, screen } from "@testing-library/react";
import { EditOrBuyButton } from "./edit-or-buy-button";

afterEach(() => {
  jest.clearAllMocks();
});

describe("EditOrBuyButton component tests", () => {
  const setEditMode = jest.fn();
  const resetEditItemState = jest.fn();
  const onSave = jest.fn();

  it("Is rendered for user", () => {
    render(
      <EditOrBuyButton
        isUser={true}
        editMode={false}
        setEditMode={setEditMode}
        resetEditItemState={resetEditItemState}
        onSave={onSave}
        onSaveLoading={false}
        onSaveError={""}
        validationsError={""}
      >
        <p>This is text</p>
      </EditOrBuyButton>
    );

    expect(screen.getByText("This is text")).toBeVisible();
  });

  it("Is rendered for admin", () => {
    render(
      <EditOrBuyButton
        isUser={false}
        editMode={false}
        setEditMode={setEditMode}
        resetEditItemState={resetEditItemState}
        onSave={onSave}
        onSaveLoading={false}
        onSaveError={""}
        validationsError={""}
      >
        <p>This is text</p>
      </EditOrBuyButton>
    );

    expect(screen.getByText("РЕДАКТИРОВАТЬ")).toBeVisible();
  });

  it("Can switch to edit mode", async () => {
    render(
      <EditOrBuyButton
        isUser={false}
        editMode={false}
        setEditMode={setEditMode}
        resetEditItemState={resetEditItemState}
        onSave={onSave}
        onSaveLoading={false}
        onSaveError={""}
        validationsError={""}
      >
        <p>This is text</p>
      </EditOrBuyButton>
    );

    const editButton = screen.getByText("РЕДАКТИРОВАТЬ");

    fireEvent.click(editButton);

    expect(setEditMode).toBeCalled();
  });

  it("Can quit from edit mode", () => {
    render(
      <EditOrBuyButton
        isUser={false}
        editMode={true}
        setEditMode={setEditMode}
        resetEditItemState={resetEditItemState}
        onSave={onSave}
        onSaveLoading={false}
        onSaveError={""}
        validationsError={""}
      >
        <p>This is text</p>
      </EditOrBuyButton>
    );

    const cancelButton = screen.getByText("ОТМЕНА");

    fireEvent.click(cancelButton);

    expect(resetEditItemState).toBeCalled();
  });

  it("Can save", () => {
    render(
      <EditOrBuyButton
        isUser={false}
        editMode={true}
        setEditMode={setEditMode}
        resetEditItemState={resetEditItemState}
        onSave={onSave}
        onSaveLoading={false}
        onSaveError={""}
        validationsError={""}
      >
        <p>This is text</p>
      </EditOrBuyButton>
    );

    const saveButton = screen.getByText("СОХРАНИТЬ");

    fireEvent.click(saveButton);

    expect(onSave).toBeCalled();
  });
});
