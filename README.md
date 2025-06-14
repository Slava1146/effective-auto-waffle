# [effective-auto-waffle] Test Autamation framework based on Playwright and Typescript

## 1 - About the author

Hi all and welcome to my first piblic repository! My name is Slava. I am a QA Engineer with expertise in functional and non-functional testing, ensuring software quality across web, mobile, and integrated systems. My experience includes:
- Functional Testing: New features, web services, integration testing, smoke/regression testing, mobile testing.
- Non-Functional Testing: Compatibility, UI/GUI, usability, internationalization/localization, and requirements validation.
- Bug Reporting & Verification: Identifying, documenting, and tracking issues for efficient resolution.
- Knowledge Transfer & Onboarding: Creating structured plans and delivering onboarding sessions to newcomers, ensuring smooth transitions and understanding.
- Test Documentation: Writing, updating, and reviewing test cases, plans, and reports for accuracy and clarity.
I am also learning test automation, focusing on JavaScript, Playwright, and TypeScript, to enhance testing efficiency and broaden my technical skill set.

## 2 - Apps under test
- https://thinking-tester-contact-list.herokuapp.com/
This web application is a contact list application with a web UI component and a REST API component. It’s excellent as a dummy web application because it allows us to practice more than just UI testing. This app was created by [Kristin Jackvony](https://thinkingtester.com/about/).
- TBD

## 3 - Notes
- User credentials should be stored in .env file.
- Example:
`CONTACT_LIST_USER = ''
CONTACT_LIST_USER_LOGIN = ''
CONTACT_LIST_PASS = ''`

## List of commands
- `npm run contactListUiHeaded` to run all tests in /src/contactList/tests in headed mode
- `npm run contactListUi` to run all tests in /src/contactList/tests in headless mode

- `npm run format` to format files