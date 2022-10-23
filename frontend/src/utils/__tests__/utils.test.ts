import { allowOnlyNumbers, getNoun } from "../utils";

describe("Utils", () => {
  it("getNoun should return first string", () => {
    expect(getNoun(1, "предмет", "предмета", "предметов")).toEqual("предмет");
  });

  it("getNoun should return second string", () => {
    expect(getNoun(3, "предмет", "предмета", "предметов")).toEqual("предмета");
  });

  it("getNoun should return third string", () => {
    expect(getNoun(6, "предмет", "предмета", "предметов")).toEqual("предметов");
  });

  it("getNoun should return third string", () => {
    expect(getNoun(125, "предмет", "предмета", "предметов")).toEqual("предметов");
  });

  it("allowOnlyNumbers should remove anything other than numbers", () => {
    expect(allowOnlyNumbers("fkjskf123.sdla0-=##@U#*(")).toEqual("1230");
  });
});
