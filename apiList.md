# DevMatch API Lists 

## authRouter
- POST /Signup
- POST /Login
- POST /Logout

## profileRouter
- GET /profile/view
- PATCH /profile/password
- PATCH /profile/edit

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /user/connections
- GET /user/requests/
- GET /user/feed

status ignore , interested , accepted , rejected
