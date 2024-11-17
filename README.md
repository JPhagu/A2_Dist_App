# A2_Dist_App
API Base URL
The base URL for the API is:

http://localhost:3000/api

# Setup
run this:
```
npm install
```
then this to run the api:
```
node app.js
```
# Testing
## 1. POST /greeting
This endpoint receives a GreetingRequest object and returns a GreetingResponse.

### Request Body (GreetingRequest):
- timeOfDay: string (e.g., "Morning", "Afternoon", "Evening")
- language: string (e.g., "English", "French", "Spanish")
- tone: string (e.g., "Formal", "Casual")
```
{
  "timeOfDay": "Morning",
  "language": "English",
  "tone": "Casual"
}
```

### Response (GreetingResponse):
The response will contain the greeting message for the given timeOfDay, language, and tone.

```
{
  "greetingMessage": "Hey, Good Morning!"
}
```

### Error Responses:
- 400 Bad Request: If any required fields (timeOfDay, language, or tone) are missing in the request body.
- 404 Not Found: If no greeting is found for the given parameters.

```
{
  "error": "Greeting not found for the given criteria."
}
```

## 2. GET /timesOfDay
This endpoint retrieves all available timeOfDay values.
```
[
  "Morning",
  "Afternoon",
  "Evening"
]
```
## 3. GET /languages
This endpoint retrieves all supported languages.

```
[
  "English",
  "French",
  "Spanish"
]
```