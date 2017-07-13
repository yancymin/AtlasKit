FROM openjdk:8-jre-alpine

ARG LERNA_VERSION

#### <general-tools>
RUN echo "Installing general tools" \
&& apk --no-cache add \
  build-base \
  bash \
  git \
  openssh-client \
  curl \
  wget \
  ca-certificates \
  python \
  make \
  zip \
  unzip \
  tar \
  gzip
#### </general-tools>

#### <browserstack>
# Copied from https://github.com/sgerrand/alpine-pkg-glibc

ENV GLIBC_VERSION 2.23-r3

RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub \
&&  wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-$GLIBC_VERSION.apk" \
&&  apk --no-cache add "glibc-$GLIBC_VERSION.apk" \
&&  rm "glibc-$GLIBC_VERSION.apk" \
&&  wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-bin-$GLIBC_VERSION.apk" \
&&  apk --no-cache add "glibc-bin-$GLIBC_VERSION.apk" \
&&  rm "glibc-bin-$GLIBC_VERSION.apk" \
&&  wget "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/$GLIBC_VERSION/glibc-i18n-$GLIBC_VERSION.apk" \
&&  apk --no-cache add "glibc-i18n-$GLIBC_VERSION.apk" \
&&  rm "glibc-i18n-$GLIBC_VERSION.apk"

RUN wget -q https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip \
&&  unzip BrowserStackLocal-linux-x64.zip \
&&  rm BrowserStackLocal-linux-x64.zip
#### </browserstack>

#### <node>
# Copied from https://github.com/matriphe/docker-alpine-node/blob/master/Dockerfile
ENV TIMEZONE Australia/Sydney

# Last updated: 17-03-17 for compatibility with alpine 3.5
ENV NODE_VERSION 6.9.2-r1
# TODO: We can't use 3.10.8 yet: https://github.com/npm/npm/issues/14042
# Update 2016-10-27: still broken in 3.10.9 and won't be fixed in 3.x at all as 3.x was put in maintenance
# TODO: Update to npm v4: https://ecosystem.atlassian.net/browse/AK-706
ENV NPM_VERSION 3.10.7

RUN echo "Installing node & npm" \
  apk update && \
  apk upgrade && \
  apk add --update tzdata && \
  cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
  echo "${TIMEZONE}" > /etc/timezone && \
  apk --no-cache add nodejs="${NODE_VERSION}" && \
  npm install -g npm@"${NPM_VERSION}" && \
  npm cache clean -f && \
  apk del tzdata && \
  rm -rf /var/cache/apk/*
#### </node>

#### <atlaskit-tools>
RUN echo "Installing AtlasKit tools" \
&& npm install -g \
  cloudfront-invalidate-cli@1.2.0 \
  marky-markdown@8.1.0 \
  bitbucket-build-status@1.0.2 \
  npm-run-all@3.1.1 \
  lerna@"${LERNA_VERSION}" \
# lerna-semantic-release depends on semantic-release@^6.3.1, but the "latest" dist-tag
# is 6.3.2, which *doesn't* include https://github.com/semantic-release/semantic-release/pull/332
# However the version 6.3.6 exists which *does* include it, so we depend on that explicitly.
  semantic-release@6.3.6 \
  lerna-semantic-release@9.1.0 \
  indexifier@2.0.0 \
  @atlassian/prebake-distributor-runner@1.0.2 \
  yarn@0.18.1 \
&& npm cache clean -f
#### </atlaskit-tools>

#### <ssh-keys>
ENV HOSTS_FILE="/root/.ssh/known_hosts"
ENV BB_KEY="AAAAB3NzaC1yc2EAAAABIwAAAQEAubiN81eDcafrgMeLzaFPsw2kNvEcqTKl/VqLat/MaB33pZy0y3rJZtnqwR2qOOvbwKZYKiEO1O6VqNEBxKvJJelCq0dTXWT5pbO2gDXC6h6QDXCaHo6pOHGPUy+YBaGQRGuSusMEASYiWunYN0vCAI8QaXnWMXNMdFP3jHAJH0eDsoiGnLPBlBp4TNm6rYI74nMzgz3B9IikW4WVK+dc8KZJZWYjAuORU3jc1c/NPskD2ASinf8v3xnfXeukU0sJ5N6m5E8VLjObPEO+mN2t/FZTMZLiFqPWc/ALSqnMnnhwrNi2rbfg/rd/IpL8Le3pSBne8+seeFVBoGqzHM9yXw=="
ENV GH_KEY="AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ=="

RUN echo "Setting up SSH keys" \
&& mkdir -p /root/.ssh/ \
&& touch /root/.ssh/known_hosts \
&& echo "bitbucket.org ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "bitbucket.org,104.192.143.1 ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "bitbucket.org,104.192.143.2 ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "bitbucket.org,104.192.143.3 ssh-rsa $BB_KEY" >> $HOSTS_FILE \
&& echo "github.com ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.131 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.253.112 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.129 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.128 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,131.103.20.168 ssh-rsa $GH_KEY" >> $HOSTS_FILE \
&& echo "github.com,192.30.252.130 ssh-rsa $GH_KEY" >> $HOSTS_FILE
#### </ssh-keys>

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

CMD [ "npm", "start" ]
