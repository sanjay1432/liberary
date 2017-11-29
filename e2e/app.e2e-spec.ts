import { LiberaryManagementSystemPage } from './app.po';

describe('liberary-management-system App', () => {
  let page: LiberaryManagementSystemPage;

  beforeEach(() => {
    page = new LiberaryManagementSystemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
