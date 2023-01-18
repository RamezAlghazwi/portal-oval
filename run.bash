docker build . -t portal-oval
docker run portal-oval -e "NODE_ENV=production"-p 3000:3000

