# Projecto - direct screen sharing

Projecto is an application that makes screen sharing over LAN, joining using a QR-code, possible.

This project is currently still very much a proof-of-concept, and therefore does not handle errors,
disconnections or unusual network-configurations well. Use with caution, and do not use for
production environments!

## Motivation / Goal

The goal of Projecto is to allow shortsighted people or people with general poor eyesight to keep
participating in presentations. Initially this project is being developed for participating
in church services, where songs and text might be projected on a screen too far away or with
text that is too small.

## Development

This project uses Vite to build the client-side app (frontend), and Express.js as a backend
to negotiate peer-to-peer WebRTC-connections using PeerJS and serve the frontend.

Electron is used to launch the host and limit screens to be chosen from. Theoretically
the host-side can also be visited using a browser going to `http://localhost:3000/host`.

Run the dev server using. Hot Module Replacement does not work since PeerJS overrides the websocket.

```bash
npm run dev
```

## Usage

Since the project is in development, the necessary SDK-tools need to be present. Make sure to
have a working installation of:

- Node.js 24 (LTS)
- latest NPM

Install the Node dependencies by running

```bash
npm install
```

and build & start the application:

```bash
npm run build
npm start
```
