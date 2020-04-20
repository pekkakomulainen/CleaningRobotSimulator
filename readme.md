# CleaningRobotSimulator

## What's here?

This repository contains a node.js app written to solve ***a certain developer test task***. I implemented this project mostly for fun and for learning purposes. Solving the task gave me a good reason to implement something with node.js, postgresql and Docker - all firsts for me. It turned out to be a fun exercise!

### Directory structure

- /docker
  - /compose
    - Docker-compose.yml
  - /postgres
    - Dockerfile: for building the postgres image.
    - init-db.sh: shell script for creating the user, database, required table inside the postgres image. NOTE! This file must use LF as end-of-line separator.
  - /powershell: contains powershell scripts for invoking the running application
  - /src: contains the application code
- Dockerfile: for building the application image.
- index.js: the application entrypoint.

## Usage

### Local use

First, navigate to repository root. Then:
- To prepare the repository, run ```npm install```.
- To execute tests, run ```npm test```.
- To start the application locally, run ```npm start```.

### In Docker

First, navigate to `./docker/compose`. Then:

- To start the application in docker, run ```docker-compose up --build -d```.
- To stop the application in docker and to remove the images, containers etc., run ```docker-compose down```.

## Environment variables used by the application

- **port**: The port that the ***application*** listens to.  Changing the value can come up handy if, for any reason, you want to run several instances of the application simultaneously. Default value is 5000.
- **use_database**: If true, application connects to database to save and query the results. If false, a mock is used instead - this allows running the application even in case there's problems running the postgre instance.
- **PGHOST**: Host of the postgre database the application connects to.
- **PGUSER**: User name used by the application when connecting to database.
- **PGDATABASE**: Postgre database the application connects to.
- **PGPORT**: Port of the postgre instance the application connects to.

## Notes about the implementation

- The path traversed by the robot is modeled as a linked list of edges.
- The calculation strategy implemented loops through the list of edges and for each edge:
  - Calculates the vertices visited by the edge that are NOT visited by any of the latter edges.
  - Adds the number to the total.
- The calculation strategy used does not scale very gracefully as the number of nodes grows (keyword: *arithmetic sum*). My main concern was the possible memory usage while tracking the number of vertices visited along the path. As far as I understand, the route may contain a maximum of about 1e9 vertices out of the maximum of about 40e9 vertices contained by the grid.
- The calculation time is affected by both the number of edges along the path and the length of the individual edges.

## Disclaimer

The code is available as-is. Run it with your own risk. I take no responsibility whatsoever.

## License

Free to use. To my best knowledge all libraries included have permissive licenses.

## Stuff

New stuff. More stuff. Even more stuff.
