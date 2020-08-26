# Amato Music API

## Authorization
### Get token
```curl -X GET "localhost:3000/auth/login"```

### Refresh token
```curl -X GET "localhost:3000/auth/refresh_token?refresh_token={refresh_token}"```

## User
### Login
```curl -X GET "localhost:3000/user/login" -H "access_token: {access_token}"```

### Get user
```curl -X GET "localhost:3000/user/{uid}"```

### Add artist to favorites
```curl -X PUT "localhost:3000/user/{uid}/favorites?aid={aid}"```

### Remove artist from favorites
```curl -X DELETE "localhost:3000/user/{uid}/favorites?aid={aid}"```

## Spotify API Wrapper
### Search artists
```curl -X GET "localhost:3000/spotify/search-artist?name=Yonezu%20Kenshi" -H "access_token: {access_token}"```

### Top artists
```curl -X GET "localhost:3000/spotify/top-artist" -H "access_token: {access_token}"```

### Artist info
```curl -X GET "localhost:3000/spotify/artist-info/{aid}" -H "access_token: {access_token}"```
