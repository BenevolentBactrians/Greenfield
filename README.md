# Synopsis

Hump Day is a weekly task manager that allows users to store and view tasks for a given week or day and track their progress.
Users can create a task with a specific date and time range and can mark it as completed. 

Additional tools include:
    - 1. Note pad for easy addition of notes
    - 2. Rubber Ducky displays inspirational quotes when clicked
    - 3. Pomodoro timer
    - 4. Chart of task completion progress

## Functionality



## File Structure

### HumpDay File Structure
```
CLIENT
  DIST
      - index.html
      - Bundle.js
      - styles.css
      ASSETS
  SRC
      COMPONENTS
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
SERVER
  - server.js
DATABASE
  - Index.js (basic db connection and schemas)
  - Data.json
  - Quotes.js
Views
  - Index.ejs
  - Login.ejs
  - Signup.ejs
webpack.config.js
package.json
.gitignore
```

## Installing Dependencies
From within the root directory:
```
npm install
mongod --dbpath=./data/db
npm run build
npm run dev
```

## Current Issues

- AddTask and Notes Components should have clear fields buttons
- Checkbox in DailyTaskEntry Component should receive checked state from parent component so it will reflect actual completed state
- Weekly Component should display days in order


## Contributors
- vasyl-n
- mjraybk07
- echi81


**Contribute By**


Fork HumpDay repository. Send Pull Request for review and merge.
