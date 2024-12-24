# DEVTINDER APIS

## authRouter
 - POST /signup
 - POST /login
 - POST /logout

## profileRouter
 - GET /profile/view
 - PATCH /profile/edit
 - PATCH /profile/password => forget password API

## connectionRequestRouter
 - POST /request/send/interested/:userId
 - POST /request/send/ignored/:userId
 - POST /request/review/accepted/:requestId
 - POST /request/review/rejected/:requestId

## userRouter
 - GET /user/connection
 - GET /user/requests 