# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
FROM daocloud.io/node:10.5.0
MAINTAINER Shawn <624835942@qq.com>

COPY . /data

WORKDIR /data

# The RUN instruction will execute any commands
# Adding HelloWorld page into Nginx server
RUN npm install -g anywhere --registry=https://registry.npm.taobao.org \
  && npm install --registry=https://registry.npm.taobao.org \
  && npm run build

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime
EXPOSE 8000

WORKDIR /data/dist

# The CMD instruction provides default execution command for an container
# Start Nginx and keep it from running background
CMD anywhere -s
