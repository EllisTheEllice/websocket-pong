####### Installation #######
1. Install dependencies
  - Go to the pong sources path
  - use npm install to install configured dependencies
  - use node server.js to make a test run
2. Create the service
  - place the pong.service file under /etc/systemd/system and adapt the paths if necessary
  - use systemctl enable pong.service to enable the service
  - use systemctl start pong to start pong
