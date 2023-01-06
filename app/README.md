# miniature-adventure

## Dev Local
### Setup
1. Yarn
    ```sh
    yarn set version berry
    ```
2. Add in  .yarnrc.yml
   - ``nodeLinker: node-modules`` 

3. Add in .gitignore
   ```
    .yarn/*
    !.yarn/cache
    !.yarn/patches
    !.yarn/plugins
    !.yarn/releases
    !.yarn/sdks
    !.yarn/versions
   ```
4. Install 
    ```sh
    yarn
    ```