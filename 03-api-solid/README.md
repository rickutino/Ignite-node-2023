# App

GymPass style app.

## RFs (Functional requirements)

- [ ] It must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain the profile of a logged in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [ ] It should be possible for the user to obtain his check-in history;
- [ ] It should be possible for the user to search for nearby gyms;
- [ ] It should be possible for the user to search for gyms by name;
- [ ] It should be possible for the user to check-in at a gym;
- [ ] It should be possible to validate a user's check-in;
- [ ] It must be possible to register a gym;

## RNs (Business Rules)

- [ ] The user should not be able to register with a duplicate e-mail;
- [ ] The user cannot make 2 check-ins on the same day;
- [ ] The user cannot check-in if he/she is not close (100m) to the gym;
- [ ] The check-in can only be validated up to 20 minutes after being created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## RNFs (Non-Functional Requirements)

- [ ] User password must be encrypted;
- [ ] Application data needs to be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);