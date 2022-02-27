const Event = require('../../models/event');
const {transformEvent} = require('./merge')
const User = require('../../models/user');


module.exports = {
    events: () =>{
        return Event.find()
        .then(events => {
            return events.map(event => {
                return transformEvent(event);
            });
    
        })
        .catch(err => {
            throw err;
        })
    },
    createEvent: async (args, req) =>{
        if (!req.isAuthor) {
            throw new Error('User not valid');
          }
       
        const event = new Event({
            listing_title: args.eventInput.listing_title,
            description: args.eventInput.description,
            street: args.eventInput.street,
            city: args.eventInput.city,
            postal_code: args.eventInput.postal_code,
            price: +args.eventInput.price,
            email: args.eventInput.email,
            creator: req.userId
        });
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const creator = await User.findById(req.userId);
      
            if (!creator) {
              throw new Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();
      
            return createdEvent;
          } catch (err) {
            console.log(err);
            throw err;
          }
    }
}