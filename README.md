# <a href="https://github.com/nestjs/nest" target="blank">Nest</a> + <a href="https://github.com/typeorm/typeorm" target="blank">Typeorm</a> + <a href="https://www.postgresql.org" target="blank">PostgreSQL</a> starter

## Ready to use and extend Nest application with environment validation and custom Typeorm database repository

Basic Nest.js starter for REST API, which includes:

- Validation of environment variables using <a href="https://zod.dev" >Zod</a>
- Easy to extend custom <a href="https://github.com/typeorm/typeorm" target="blank">Typeorm</a> repository
- Default global interceptor which removes all <code>password</code> fields from response
- Validation of request parameters such as <code>body</code>, <code>query</code>, <code>params</code> using <a href="https://github.com/typestack/class-validator" target="blank">class-validator</a> and <a href="https://github.com/typestack/class-transformer" target="blank">class-transformer</a>

## Recommnented package manager: <a href="https://yarnpkg.com" target="blank">yarn</a>

## How to get started?

1. Clone starter

```bash
git clone git@github.com:ArtemKurtiak/nest-typeorm-starter.git
```

2. Install dependencies

```bash
yarn
```

3. Setup environment

```bash
cp .env-example .env
```

4. Fill <code>.env</code> file template with your parameters

### That's it!

<br />

## How to start project?

### Production start

Builds and starts application in production mode

```bash
yarn build && yarn start:prod
```

### Development start in watch mode

Starts application in development watch mode

```bash
yarn start:dev
```

### Development start without watch mode

Starts application in development environment without watch mode

```bash
yarn start
```

## How to interact with Typeorm?

### Generate new migration

Generates migration based on changes in entities at provided path

```bash
yarn migration:generate ./src/shared/database/migrations/<name of migration file>
```

### Generate new seed

Generates migration which will be used like seed at provided path

```bash
yarn migration:create ./src/shared/database/seeds/<name of seed file>
```

### Run pending migrations & seeds

Runs all pending migrations and seeds

```bash
yarn migration:run
```

### Revert latest migration or seed

Reverts migration or seed which was run latest

```bash
yarn migration:revert
```

### Other commands

```bash
yarn typeorm:datasource <your command>
```
