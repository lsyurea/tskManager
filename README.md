# tskManager4u

## Introduction

tskManager is a web application that allows users to:

1. Create and manage todo list under /dashboard (must first login)
2. Schedule and create timed tasks under /calendar (must first login)
3. Search and add Modules under /
4. View current todo task (miscellaneous task) and scheduled task (from calendar) and modules that we are taking under /module (must first login)

## Project Overview

tskManager aims to streamline the process of managing tasks and homework on top of module requirements by automatically adding exam dates, details into the calendar

## Requirements Gathering

The requirements for tskManger was gathered through conducting surveys on the number one stressor as students in NUS.

## Design

The software architecture of the tskManager follows the Component-Based architecture enforced by React.
It can be further modified to use Model View Controller (MVC) architecture by implementing libraries such as React-Redux

## Development

### Coding Standards

- JavaScript code follows the Airbnb style guide.
- CSS code adheres to BEM (Block Element Modifer) methodology.
- Consistent indentation

### Version Control

- Git is used for version control.
- Separate branches are created for development purposes

### Development Practices

- Code reviews conducted before merging into main branch.
- Unit tests written using Vitest.
- Continuous Integration abstracted using GitHub and netlify.

## Testing

- tskManager development follows a test-driven development (TDD) approach.
- Unit testing is performed to verify functionality of each component before Integration testing, which is also done using Vitest
- Run npx Vitest to test the components.

![Evidence](https://github.com/lsyurea/tskManager/assets/96010792/64909580-ba7b-4b56-8010-50f1f52e0145)

## User Acceptance Testing(UAT)

- Conducted Every Month from July 2023 to August 2023
- User faced the issue whereby the datepicker is not in 'en-GB format' but in MM/DD/YYYY. This issue was subsequently redressed (July)
- User faced the issue whereby the todo list rendering is too slow while waiting for information to be retrieved from supabase. This was subsequently optimised using session storage. (July)

## Installation process

tskManager Installation process:

- Install the latest version of node package manager
- Clone this project
- create supabase project and place key and url in .env file under frontend, where:
    VITE_KEY = {{Insert Supabase Key here}}
    VITE_URL = {{Insert Supabase URL here}}
- run cd frontend && npm install
- run cd frontend && npm run dev for local hosting

## Tech stack

React, Supabase, HTML, CSS, JS, PostgreSQL

## Sample

[Visit Our Website](https://tskmanager4u.netlify.app/)
