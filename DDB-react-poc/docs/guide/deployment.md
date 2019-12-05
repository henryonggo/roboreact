# Deployment

## Testing in Working Papers

To automatically deploy to Working Papers run the following command:

```bash
npm run wpbuild:[template version]
```

Running `npm run wpbuild` will default to `int`, as with any of the following commands.

Make sure that the template you're buidling to has been installed.

If the project already been built and you only want to install it run:

```bash
npm run wpcopy:[template version]
```

Visit `cw:index.html` using the URL bar in Working Papers to access DDB2.0.

**Note:** running either of these commands will not reset any data from previous builds. To do that run:

```bash
npm run wpreset:[template version]
```

**Template Versions:**

```bash
# Template version options
# - int: AuditINT
# - us: AuditUS
```

## React App Deployment Documentation

[create-react-app deployment](https://facebook.github.io/create-react-app/docs/deployment)