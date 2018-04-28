###Synopsis

Hump Day is a weekly task manager that allows users to store and view tasks for a given week and day.
The user can choose give an expected time range for given date and can mark as completed when finished.
Users are able to view the percentage of completed tasks in a pie chart.

Additional tools include:
    1. Notes api for storing random notes
    2. A Rubber Ducky that display random quotes
    3. A pomodoro timer

###Functionality



###File Structure

*HumpDay File Structure*

**CLIENT**
**DIST**
  - index.html
  - Bundle.js
  - styles.css
  - SRC
    - COMPONENTS
      - App.jsx
      - Login.jsx
      - Chart.jsx
      - Weekly.jsx
      - WeeklyTaskEntry.jsx
      - Register.jsx
      - AddTask.jsx
      - Notes.jsx
      - Daily.jsx
      - DailyTaskEntry.jsx
      - AppHeader.jsx
      - Duck.jsx
      - Register.jsx
      - Index.jsx
**SERVER**
  - server.js
**DATABASE**
  - Index.js (basic db connection and schemas)
  - Data.json
  - Quotes.js
**Views**
  - Index.ejs
  - Login.ejs
  - Signup.ejs
**webpack.config.js**
**package.json**
**.gitignore**


###Installation

npm install

###Current Issues

- AddTask and Notes Components should have clear fields buttons
- Checkbox in DailyTaskEntry Component should receive checked state from parent component so it will reflect actual completed state
- Weekly Component should display days in order


###Contributors
- vasyl-n
- mjraybk07
- echi81


**Contribute By**

Fork HumpDay repository. Send Pull Request for review and merge.
