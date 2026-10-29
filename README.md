# parentportal

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Docker and Dokploy deployment

The Docker image serves the Vue build with Nginx and proxies `/backend/` and
`/images/` to the runtime `BACKEND_ORIGIN`. Configure that variable in Dokploy
for each environment; the same image can then be used for staging and
production. Do not put secrets in `VUE_APP_*` variables because Vue CLI embeds
them into the browser bundle at build time.

Set `BACKEND_ORIGIN` to the backend origin in Dokploy's application environment.
The container requires this value at startup. `.env.example` shows the required
runtime variable; local `.env` files are excluded from the Docker build context.
The current app chooses its locale in code; `VUE_APP_I18N_LOCALE` and
`VUE_APP_I18N_FALLBACK_LOCALE` in a local `.env` do not currently change it.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
