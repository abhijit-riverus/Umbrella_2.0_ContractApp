# Legacy Umbrella REACT frontend

## Pre Requisite Software 
node -v : 12.x
npm -v : 6.x

## Development

See `src/Configuration/global.ts` for backend URLs (currently targeting to production for both auth and backend)

### Serve development without build

```shell
yarn
yarn start
```

### Serve production without build

```shell
yarn
yarn start:production
```

### Build production

```shell
yarn
yarn build
```

### Serve production build

```shell
yarn global add serve # If not installed already
serve -s build
```

# TODO
1. Keycloak docker-compose file for local dev
