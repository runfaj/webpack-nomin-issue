To replicate issue:

1. clone this repo
2. yarn or npm install
3. run the "build" command (ex. `yarn build`)
4. Open up the `dist` folder
5. Notice a chunk file appears as something like `<name>.<contenthash>.js`, but the associated nomin file does not match on the hash, thus cannot be loaded properly.