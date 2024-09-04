###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18 AS development

WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Install app dependencies using npm ci
RUN npm ci

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18 AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# Copy node_modules from development stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Use the node user from the image (instead of the root user)
USER node

###################
# PRODUCTION
###################

FROM node:18 AS production

WORKDIR /usr/src/app

# Set NODE_ENV environment variable
ENV NODE_ENV=production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env ./

# Clean npm cache
RUN npm cache clean --force

# Start the server using the production build
CMD ["node", "dist/index.js"]