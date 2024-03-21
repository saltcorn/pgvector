# pgvector

Vector embeddings type

## Installation.

You must install the pgvector psotgresql module. see https://github.com/pgvector/pgvector for full instructions.

```
cd /tmp
git clone --branch v0.6.2 https://github.com/pgvector/pgvector.git
cd pgvector
make
make install # may need sudo
```

Restart PostgreSQL

then you must run `CREATE EXTENSION vector;` as the postgres user on your database

```
root@regqa:~# sudo -iu postgres psql -d saltcorn
psql (15.6 (Debian 15.6-0+deb12u1))
Type "help" for help.

saltcorn=# create extension vector;
```
