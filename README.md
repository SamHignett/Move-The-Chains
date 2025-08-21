# Moving the Chains

The plan for this project is to result in an NFL-related Web App/Website consisting of two main features-sets:

---

## 🏈 Reading the Field (Game Prediction Tracker)

- Make predictions for NFL games
  - For a team/set of team's schedules, select the winning team in each game
  - Set up a scoring system
    - Custom rules (select from a list of numerical stats like total game points, team scores, yards, touchdowns, interceptions etc)
    - e.g. Earn X points for correctly guessing a game winner, Earn Y points if the game score prediction was within Z
  - Account system
    - See "My Predictions"
      - Shows current leagues/predictions (and results for games that have been played) along with points scored and running total
    - Store rulesets
  - Create prediction leagues, with the ability to invite other users to join.

---

## 📊 Breaking Down Tape (Stat-tracking)

- Search/Select Player/Teams and see appropriate data/stats
  - Teams
    - See Matchups (with stats), general statistics like Offensive/Defensive ratings/rankings, turnovers etc.
    - Players tab
      - Shows team roster, and the ability to positions from an offensive/defensive formation visualisation (with each position being selectable which would filter the player list for that position)
      - Selecting a Player would bring up their stats (overview, with the ability to show detailed stats)
  - Player
    - Small bio (position, university, draft # & year, notable achievements etc.)
    - Show position-relevant stats (current season, compare to previous seasons, show trend etc.)
    - Embed highlights where possible
- Create an AI-chat agent that can answer stat-related questions e.g. "Who won the 2024 AP Offensive Player of the Year" (answer: Saquon Barkley)

---

This long-term plan should result in a vast improvement of my full-stack capabilities. The current plan regarding the tech stack (and some technical decisions in general) is as follows:

---

## 🛠 Tech Stack / Tools Plan

**Domain registration/CDN - Cloudflare**
- as a CDN, Cloudflare offers some auxiliary services that could prove useful such as user-tracking, data-caching and protection from attacks (e.g. a DDoS). Give that they are an industry standard and also offer Domain Registration (will look to grab "movethechains.app" if available), they seem to be a good choice.

**Front-End - React (NextJS)**
- Whilst Vite would be well-suited for static websites, due to the nature of this site being dynamic (with the potential for content such as team logos to change) it would make sense to use a more dynamic choice. NextJS is a mature, well-used and documented framework and so is an attractive option.

**Content - Hygraph CMS**
- A CMS might not be completely crucial (most textual itself would be either static or generated from API requests at runtime, and most visual elements would be unlikely to frequently need updating) but a basic understanding/implementation would prove useful to learn. I am currently not learned on the landscape of CMS, but again due to the likely limited use Hygraph seems as good a choice as any, being a respected CMS and offering a suitable free tier.

**Back-End - C# .Net**
- Responsible for communication between the front-end and APIs/Database(s). As I have some small experience in using .NET back-end, good experience in C#, have existing software as a reference to draw inspiration from, and it is a widely-used language/framework, why choose another?

**NFL Data API - RapidApi**
- Whilst I have not yet done a full evaluation on the scope/capabilities/scalability/etc on the available NFL Data sources, preliminary research suggests RapidApi to be a user-friendly, low-cost (with generous free usage limits) service which also contains a suitable amount of data to draw from. So at this early stage, it looks to be a strong candidate (TBC).

**Database - SQL**
- For storage of simple data, I see no reason to sway from the tried, tested and universally understood/respected SQL. Why rock the boat?

**Server/Hosting - Azure**
- As incredibly powerful (and therefore complicated) tools, I want to pick a cloud platform that is both well-used and suitable for my use-case. Azure, AWS and Google Cloud Platform are all valid options. However, as I am at least a small piece of experience in Azure, it seems the most sensible to build upon this foundation rather than switch to an entirely new platform without cause.

**Auth - Azure B2C**
- If I am picking the Azure Cloud Service Provider, then the logical extension would be to use its solution rather than further break down features into additional third parties unless there is a  significant upside which I have yet to see.

**Repository/Project management  - GitHub**
- Possibly THE standard for repository hosting/project management, and something I am very familiar with. Plenty to learn already so no need to add more without need.

**CI/CD - GitHub Actions**
- If I am using GitHub, then again utilizing its Actions solution for CI seems the most sensible. I again have experience in writing actions, and it contains all features required for Deployment (and future aspects such as testing)

**AI - TBD**
- I have not yet conducted any research, considering this will be a very late-stage feature.

**Additional technologies**
- Containers (e.g. Docker)
  - Microservice (Middleman calling API, kind of redundant but could be nice to have)

---

## 🚀 Development Stages

Additionally, I understand the scope of this project to be vast, especially considering my currently very-limited/non-existent experience in many areas of this. So, for the sake of not drowning in a sea of new languages/frameworks/services/etc, I am looking to break the development down into various Stages:

1. Setup/Deploy "Hello World" page  

2. Create first Stats page 
   - Making a single API request
   - Display a single piece of CMS Content
   - Show data from request on a single page

3. Expand Stat-tracking content
    - Add more data-pages:
      - Teams
      - Players in a team
      - X number of stats for each player
      - Positional data  

4. Create Initial prediction functionality 
    - Displaying of matches and storing & recalling predictions to/from a database

5. Include custom scoring rulesets to predictions  

6. Link Prediction functionality to Stat-viewing functionality
     - Allowing for predicted game breakdown
     - Selecting a player from that game to show their seasonal stat
7. Add Authentication/Accounts to restrict public ability to spam API/database/reduce chance of abuse/attacks.  

8. Implement multi-user interaction in the form of leagues 

9. Improve front-end visuals
    - Use animations/transitions/effects to enhance overall visual fidelity
    - Gather test-users and use feedback to improve UX

10. Develop basic AI integration  

11. Further development
    - Add Testing
    - General knowledge base for learning NFL concepts like formations/routes/schemes
    - Collating news
    - etc.  
