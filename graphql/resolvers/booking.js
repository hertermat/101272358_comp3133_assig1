const Booking = require('../../models/booking');
const {transformBooking, transformEvent} = require('./merge');
const Event = require('../../models/event');


module.exports = {
    bookings: async(args, req) => {
        if(!req.isAuthor){
            throw new Error('Access not granted');
        }
        try{
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return transformBooking(booking);
            });

        }catch(err){
            throw err;
        }
    },

    bookEvent: async (args,req) => {
        if(!req.isAuthor){
            throw new Error('Access not granted');
        }
        const fetchedEvent = await Event.findOne({_listing_id: args.eventId});
        const booking = new Booking({
            user: req.userId,
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking(result);
    },

    cancelBooking: async (args, req) => {
        if(!req.isAuthor){
            throw new Error('Access not granted');
        }
        try{
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(booking.event);
            return event;
        } catch (err){
            return err;
        }
    }
}