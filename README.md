# neurological-diagnostic-tool

## Installation

Clone the repository and run the following command in the "Frontend" directory.

```bash
npm install
```

## Troubleshooting

If you encounter an error similar to this one:

```bash
npm ERR! code SELF_SIGNED_CERT_IN_CHAIN
npm ERR! errno SELF_SIGNED_CERT_IN_CHAIN
npm ERR! request to https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz failed, reason: self-signed certificate in certificate chain
```

Then do the following:

1. Run

```bash
npm config ls -l
```

2. Look for the "registry" field, it will most likely be (https://registry.npmjs.org/).
3. Get the certificate information for the site, in Chrome on Windows I had to click the "view site information" button to the left of the url field and navigate to "connection is secure > certificate is valid". Then export both the "PG Root CA" and "PG HTTPS Proxy".
4. Run the following command for both files:

```bash
npm config set cafile "[path to certificate]"
```

5. Run

```bash
npm install
```

again.

## Running the app

To run the app, simply run

```bash
npm run dev
```

in the command line.

## Running whole application with docker

```bash
docker-compose up --build
```
backend will run on http://0.0.0.0:80
frontend will run on http://localhost:5173/

