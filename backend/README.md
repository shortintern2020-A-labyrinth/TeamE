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
```curl -X POST "localhost:3000/user/{uid}/favorites" -H "Content-Type: application/json" -d '{"id":"{aid}","name":"Lorde","image":{"height":640,"url":"https://i.scdn.co/image/d25fc756cd04c8b3ea196b7c07c6d057685cc405","width":640},"genres":["art pop","dance pop","metropopolis","nz pop","pop"],"n_followers":6297272,"popularity":79}'```

### Replace favorite artist with another artist
```curl -X PUT "localhost:3000/user/{uid}/favorites?aid={aid}" -H "Content-Type: application/json" -d '{"id":"{aid}","name":"Coldplay","image":{"height":640,"url":"https://i.scdn.co/image/4ffd6710617d289699cc0df60cf975e316025119","width":640},"genres":["permanent wave","pop"],"n_followers":26787887,"popularity":88}'```

### Remove artist from favorites
```curl -X DELETE "localhost:3000/user/{uid}/favorites?aid={aid}"```

### Follow a user
```curl -X GET "localhost:3000/user/{uid}/following?uid={uid}"```

### Unfollow a user
```curl -X DELETE "localhost:3000/user/{uid}/following?uid={uid}"```

### Edit self-introduction
```curl -X POST "localhost:3000/user/{uid}/self-intro" -H "Content-Type: application/json" -d '{"message":"your introduction text"}'```

## Spotify API Wrapper
### Search artists
```curl -X GET "localhost:3000/spotify/search-artist?name=Yonezu%20Kenshi" -H "access_token: {access_token}"```

### Top artists
```curl -X GET "localhost:3000/spotify/top-artist" -H "access_token: {access_token}"```

### Artist info
```curl -X GET "localhost:3000/spotify/artist-info/{aid}" -H "access_token: {access_token}"```
