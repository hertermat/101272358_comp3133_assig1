const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Booking {
    _id: ID!
    event: Event!
    user: User!
}

type Event {
    _listing_id: ID!
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
    creator: User!
}
type User {
    _id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    userType: String!
    password: String
    createdEvents: [Event!]
}

type UserData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {
    listing_title: String!
    description: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
}

input UserInput{
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    userType: String!
}


type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): UserData!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)




