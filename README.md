# node-server
server

---
# DOCUMENTATION
# API
## Create user

**URL**

```/registration```

**Permissions**

Public

**Method**

POST

**Request example**

```json
{
  "name": "test",
  "email": "test@email.com",
  "password": "Password1111"
}
```
**Response**

```json
{
    "message": "User was created"
}
```

## Obtain auth token

**URL**

```/login```

**Permission**

Public

**Method**

Post

**Request example**

```json
{
  "email": "test@email.com",
  "password": "Password1111"
}
```
**Response**

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmM4MzUzLWEwZDktNGUxMC1iYjlhLTgxZDViOGU2M2U0ZiIsImlhdCI6MTY0MjUzODIzMSwiZXhwIjoxNjQyNTM4ODMxfQ.qv3P1xE3DLAN8mo343c03aEv9NskVLdou8asb0zm5JM",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmM4MzUzLWEwZDktNGUxMC1iYjlhLTgxZDViOGU2M2U0ZiIsImlhdCI6MTY0MjUzODIzMSwiZXhwIjoxNjQ1MTMwMjMxfQ.mqFuocK_Mnu00bEcQU3HZ35VFwanCeQaN9fNN1-r4v4",
    "user": {
        "email": "test@email.com"
    }
}
```
**Note**

To access authorized only endpoints, access token must be sent in HTTP headers
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjI4NTM5Njg2LCJqdGkiOiJhMDkyMTBiZjA5MjE0MzIxYWE2MGNjMGM5ZWFlNWZhMCIsInVzZXJfaWQiOjJ9.xlDUsFlVEBzdCgomCXI4KlHG4FGi6Xf5Yld6fyaIzJQ
```
access token lifetime - 1 hour
refresh token lifetime - 30 days

## Refresh auth token

**URL**

```/refresh```

**Permissions**

Public

**Method**

GET

**Request example**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmM4MzUzLWEwZDktNGUxMC1iYjlhLTgxZDViOGU2M2U0ZiIsImlhdCI6MTY0MjUzOTczNywiZXhwIjoxNjQ1MTMxNzM3fQ.JmUAawRANjsMOZDUjg03106fd3TieMnp8JfBajVcs6E
```

**Response example**

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmM4MzUzLWEwZDktNGUxMC1iYjlhLTgxZDViOGU2M2U0ZiIsImlhdCI6MTY0MjUzOTczNywiZXhwIjoxNjQyNTQwMzM3fQ.h1ZcUDYPV4i9XdN06dm6utHkF4dywmagycwF89ODtPs",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZmM4MzUzLWEwZDktNGUxMC1iYjlhLTgxZDViOGU2M2U0ZiIsImlhdCI6MTY0MjUzOTczNywiZXhwIjoxNjQ1MTMxNzM3fQ.JmUAawRANjsMOZDUjg03106fd3TieMnp8JfBajVcs6E"
}
```

## Auth

**URL**

```/auth```

**Permissions**

Authorized only

**Method**

GET

**Response**

```json
{
  "data": "success"
}
```
