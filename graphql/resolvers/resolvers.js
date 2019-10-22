const bcrypt = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helper/date.helper");

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    //Binding the user function to the event.creator
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};
//Creating an events that will link to the user
const events = async eventIds => {
  try {
    //Finding all event ids that are been passed as an argument
    const events = await Event.find({ _id: { $in: eventIds } });
    //Map out all events that was find in the database
    return events.map(event => {
      //Return a new object that contains the event props its id a new date and its creator by binding user FUNCTION as event.creator
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

//Creating an user that links to the event that was been created
const user = async userId => {
  try {
    //Finding the user that has been passed as an argument to the MongoDB
    const user = await User.findById(userId);
    //Returns all the user properties on the mongodb and modify the id with user.id and createdEvents that binds the events.
    return {
      ...user._doc,
      _id: user.id,
      password: null,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  /*Creating a resolver named events 
  query{
    events{

    }
  }
  Since we are expecting asynchronous action here we are waiting for the Mongodb request to be fulfilled we use async*/
  events: async () => {
    try {
      const events = await Event.find();
      //Mapping all out the properties available in the MongoDB using map HOC
      return events.map(event => {
        //To avoid mutations. We will return new object by passing all the properties from doc and modifying things we want to do.
        //Understand that when we use a function call and bind it to a property it returns the whole property that we need
        return transformEvent(event); // Getting an object from the user function. The bind method allows to reference the same object.
      });
    } catch (err) {
      throw err;
    }
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  /* Creating an event. It accepts argument that will be the entry point of the front end to pass information by the user.
   */
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "5dad845e700a8534eccab4cc"
    });
    let createdEvent;
    try {
      //In order to execute dynamic relationship on the database. We store the result of createEvent mutation.
      const result = await event.save();
      //Upon storing the result in the database we have to append the createdEvent to its creator's createdEvents
      createdEvent = transformEvent(result);
      const creator = await User.findById("5dad845e700a8534eccab4cc");
      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createUser: async args => {
    //Checking if the user is already exist in the database
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      //If not hash the password using bcrypt with 12 salts
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      //Save the user on the database
      const result = await user.save();
      //This is to return a new object so that we can prevent object mutations
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5c0fbd06c816781c518e4f3e",
      event: fetchedEvent
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
