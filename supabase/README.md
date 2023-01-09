# Using Supabase

## Init

```sh
npx supabase login
```

```sh
npx supabase link --project-ref <project-ref>
```

```sh
npx supabase init
```

## Functions

Uses Deno

### New Function

```sh
npx supabase functions new <name-of-the-function>
```

### Deploy to prod

```sh
npx supabase functions deploy <name-of-the-function>
```

### Local Dev

Start Supabase stack

```sh
npx supabase start
```

Start Functions watcher

```sh
npx supabase functions serve <name-of-the-function> --env-file ./supabase/.env.local
```

Invoking a function

```sh
curl --request POST 'http://localhost:54321/functions/v1/<name-of-the-function>' \

  --header 'Authorization: Bearer <valid-token>' \

  --header 'Content-Type: application/json' \

  --data <stringified-body>
```

### Set Secrets

```sh
npx supabase secrets set --env-file ./supabase/.env
```
