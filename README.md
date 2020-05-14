# Guestbook 
##### This Project allows the user first thing to register using method POST and url `/user/register` by sending the request with body where all feilds required except isOwner where isOwner indicates the user is the owner of the event so that all submitted messages will sent to him/her
```
{
    "name":"John Doe",
    "email":"example@example.com",
    "password":"password",
    "isOwner": false
}
``` 
#####Response
```
{
    "data": {
        "isOwner": false,
        "_id": "5ebcd94dca70d643bbf6319b",
        "name": "John Doe",
        "email": "example@example.com",
        "createdAt": "2020-05-14T05:38:21.370Z",
        "updatedAt": "2020-05-14T05:38:21.370Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJfaWQiOiI1ZWJjZDk0ZGNhNzBkNjQzYmJmNjMxOWIiLCJpc093bmVyIjp0cnVlLCJpYXQiOjE1ODk0MzQ3MDEsImV4cCI6MTU5MDAzOTUwMSwiYXVkIjoiZ3Vlc3Rib29rIiwiaXNzIjoiR3Vlc3Rib29rIEFwcCIsInN1YiI6InVzZXIifQ.AJCakzVYl4X2gfokSMXGluFiUHkGojAhTbMAhukIVxU"
}
```

##### Login using method POST and url `user/login` by sending request body and returning the same response as register
```
{
    "email":"example@example.com",
    "password":"password"
}
``` 
----
***User gets authorized in the following routes using jwt token generated when signed in or registered which will be passed in the headers ``token:JhbGciOiJIUzI1NiIsInR5cCI6I...``*** 

---

##### The second part where user can create/delete/editview messages 
- First user can create message using method POST and url `/messages`. The Request body here represents the message to be sent and the receiver (the owner). User gets to send one message to the owner
  <sub><sup>Due to the design i had to hard code the id of the owner when submitting messages request from the frontend app given that there will always be on owner for the event to get the guestbook. It can be solved by assigning roles to users as admin/user but time didn't aid me </sup></sub> 
```
{
	"message":"Congratulations",
	"receiverId":"5ebc07beaa055e7d9c6bba15"
}
```
##### Response
```
{
    "data": {
        "reply": "",
        "_id": "5ebcbf53df0e1138add51e91",
        "message": "Congratulations,
        "userId": "5ebc082baa055e7d9c6bba17",
        "receiverId": "5ebc07beaa055e7d9c6bba15",
        "createdAt": "2020-05-14T03:47:31.586Z",
        "updatedAt": "2020-05-14T03:47:31.586Z",
        "__v": 0
    }
}
```
- Second user can edit his/her own message using method PUT and url `/message/:id` where the id in request params is the id of the message and the body will contain only the updated message 
```
{
	"message":"Congratulations Friends"
}
```
  ##### Response
```
{
    "data": {
        "reply": "",
        "_id": "5ebcbf53df0e1138add51e91",
        "message": "Congratulations,
        "userId": "5ebc082baa055e7d9c6bba17",
        "receiverId": "5ebc07beaa055e7d9c6bba15",
        "createdAt": "2020-05-14T03:47:31.586Z",
        "updatedAt": "2020-05-14T03:47:31.586Z",
        "__v": 0
    },
    message:"Message Update Successfully"
}
```
- Third user can view all messages using method GET and url `/message` 
  ##### Response
```
{
    "data": {
        "reply": "",
        "_id": "5ebcbf53df0e1138add51e91",
        "message": "Congratulations,
        "userId": "5ebc082baa055e7d9c6bba17",
        "receiverId": "5ebc07beaa055e7d9c6bba15",
        "createdAt": "2020-05-14T03:47:31.586Z",
        "updatedAt": "2020-05-14T03:47:31.586Z",
        "__v": 0
    }
}
```
```
{
    "data": [
        {
            "reply": "Thank yoouu!!!!",
            "_id": "5ebc0a4ba122f082fa526cde",
            "message": "congrats friends",
            "userId": {
                "isOwner": false,
                "_id": "5ebc083baa055e7d9c6bba18",
                "name": "Marshal",
                "email": "guest3@guests.com",
                "createdAt": "2020-05-13T14:46:19.989Z",
                "updatedAt": "2020-05-13T14:46:19.989Z",
                "__v": 0
            },
            "receiverId": "5ebc07beaa055e7d9c6bba15",
            "createdAt": "2020-05-13T14:55:07.255Z",
            "updatedAt": "2020-05-14T03:25:52.426Z",
            "__v": 0
        },
        {
            "reply": "Thanks My Friend",
            "_id": "5ebc11ed7d828090eb29c217",
            "message": "congratulations to new beginnings",
            "userId": {
                "isOwner": false,
                "_id": "5ebc0808aa055e7d9c6bba16",
                "name": "Clark",
                "email": "guest1@guests.com",
                "createdAt": "2020-05-13T14:45:28.872Z",
                "updatedAt": "2020-05-13T14:45:28.872Z",
                "__v": 0
            },
            "receiverId": "5ebc07beaa055e7d9c6bba15",
            "createdAt": "2020-05-13T15:27:41.111Z",
            "updatedAt": "2020-05-14T05:21:14.584Z",
            "__v": 0
        },
        {
            "reply": "",
            "_id": "5ebcbf53df0e1138add51e91",
            "message": "God Bless You All<3",
            "userId": {
                "isOwner": false,
                "_id": "5ebc082baa055e7d9c6bba17",
                "name": "Ted",
                "email": "guest2@guests.com",
                "createdAt": "2020-05-13T14:46:03.147Z",
                "updatedAt": "2020-05-13T14:46:03.147Z",
                "__v": 0
            },
            "receiverId": "5ebc07beaa055e7d9c6bba15",
            "createdAt": "2020-05-14T03:47:31.586Z",
            "updatedAt": "2020-05-14T03:48:03.171Z",
            "__v": 0
        }
    ]
}
```
- Fourth User can get specific message details using method GET and url `/message/:id` id represents the requested message id
  ##### Response
```
{
    "data": {
        "reply": "",
        "_id": "5ebcbf53df0e1138add51e91",
        "message": "Congratulations,
        "userId": "5ebc082baa055e7d9c6bba17",
        "receiverId": "5ebc07beaa055e7d9c6bba15",
        "createdAt": "2020-05-14T03:47:31.586Z",
        "updatedAt": "2020-05-14T03:47:31.586Z",
        "__v": 0
    }
}
```
- Fifth Owner can reply to messages using method PUT and url `message/:id/reply`  id represents the requested message id with body 
  
```
{
    "reply": "Thank You <3"
}
```
  ##### Response

```
{
    "data": {
        "reply": "Thank You <3",
        "_id": "5ebcbf53df0e1138add51e91",
        "message": "Congratulations,
        "userId": "5ebc082baa055e7d9c6bba17",
        "receiverId": "5ebc07beaa055e7d9c6bba15",
        "createdAt": "2020-05-14T03:47:31.586Z",
        "updatedAt": "2020-05-14T03:47:31.586Z",
        "__v": 0
    },
    message:"Reply Added Successfully"
}
```
- Sixth and last user can delete his/her own message method DELETE and url `message/:id/reply`  id represents the requested message id with body 
  ##### Response
```
  {
    "data": {
        "reply": "Thank yoouu!!!!",
        "_id": "5ebc0a4ba122f082fa526cde",
        "message": "congrats friends",
        "userId": "5ebc083baa055e7d9c6bba18",
        "receiverId": "5ebc07beaa055e7d9c6bba15",
        "createdAt": "2020-05-13T14:55:07.255Z",
        "updatedAt": "2020-05-14T03:25:52.426Z",
        "__v": 0
    },
    "message": "Deleted Successfully"
}
```
---
***Please find the Backend REPO : https://github.com/MernaMaklad/Guestbook***
***Please find the Frontend REPO : https://github.com/MernaMaklad/Guestbook-Frontend***