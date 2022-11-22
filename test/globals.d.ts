/* eslint-disable no-undef */

declare module NodeJS {
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    chaiExpect: Chai.ExpectStatic;
  }
  const chaiExpect: Chai.ExpectStatic;
}
