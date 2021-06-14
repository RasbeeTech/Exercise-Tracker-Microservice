# Exercise-Tracker-Microservice
Api microservice for tracking excercise

### Usage:
```
Get all users: GET /api/users  
```
```
Create a new user: POST /api/users  
```
```
Create exercise: POST /api/users/:_id/exercises  
```
```
Get user exercise log: GET /api/users/:_id/logs?[from][&to][&limit]  
```
### Returns:
```
{"_id":"60c79d13b65a1d08b3e09ea0","username":"test_user","date":"Sat Sep 11 1993","duration":15,"description":"This is a test"}  
```
```
{"_id":"60c79d13b65a1d08b3e09ea0","username":"test_user","count":3,"log":[{"description":"test","duration":60,"date":"2021-06-14T18:16:51.901Z"},{"description":"This is a tes","duration":15,"date":"1993-09-12T00:00:00.000Z"},{"description":"This is a tes","duration":15,"date":"1993-09-12T00:00:00.000Z"}]}
```
