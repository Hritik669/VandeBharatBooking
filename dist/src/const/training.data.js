"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifier = void 0;
const natural_1 = __importDefault(require("natural"));
const trainingData = [
    {
        input: "hii",
        output: "hello welcome"
    },
    {
        "input": "what is your name",
        "output": "I am Thor's Hammer chatbot, you can ask me anything about Vande Bharat Train Booking"
    },
    {
        "input": "who are you",
        "output": "I am Thor's Hammer chatbot, you can ask me anything about Vande Bharat Train Booking"
    },
    {
        "input": "How can I book a train ticket?",
        "output": "You can book a train ticket by visiting our website or mobile app, or by visiting a nearby train station."
    },
    {
        "input": "What are the different classes of train tickets?",
        "output": "We offer several classes of train tickets, including first class, second class, and sleeper class. Each class has its own amenities and pricing."
    },
    {
        "input": "How much does a train ticket from [source] to [destination] cost?",
        "output": "The cost of a train ticket from [source] to [destination] depends on factors like the class of travel, distance, and availability. Please provide more details for a specific quote."
    },
    {
        "input": "Can I book a ticket for a specific date and time?",
        "output": "Yes, you can book a train ticket for a specific date and time. Please provide your travel details, and we will assist you in finding available options."
    },
    {
        "input": "What is the refund policy for train tickets?",
        "output": "Our refund policy varies depending on the type of ticket and the time of cancellation. Please refer to our website or contact our customer support for detailed information."
    },
    {
        "input": "How can I check my train ticket's status?",
        "output": "You can check your train ticket's status by using our website or mobile app. Simply enter your PNR number, and you'll get real-time information about your journey."
    },
    {
        "input": "Are there any discounts available for group bookings?",
        "output": "Yes, we offer discounts for group bookings. The eligibility criteria and discount rates may vary. Please contact our customer support for more information."
    },
    {
        "input": "What are the accepted payment methods for booking a train ticket?",
        "output": "We accept various payment methods, including credit cards, debit cards, net banking, and mobile wallets. You can choose the one that suits you best during the booking process."
    },
    {
        "input": "How can I contact customer support for further assistance?",
        "output": "You can contact our customer support team by calling [customer support number] or emailing us at [customer support email]. We're here to help you with any questions or issues."
    },
    {
        "input": "What is the luggage allowance on trains?",
        "output": "Luggage allowance on trains varies depending on the class of travel and train service. Generally, you can carry a certain weight of luggage for free, and there may be additional charges for excess baggage."
    },
    {
        "input": "Can I make changes to my train ticket after booking?",
        "output": "Yes, you can make changes to your train ticket, such as date or class of travel, depending on the ticket type and availability. Please check our website or contact us for information on ticket modification."
    },
    {
        "input": "Are there any special discounts for senior citizens or students?",
        "output": "Yes, we offer special discounts for senior citizens, students, and other eligible groups. Please provide your details during booking, and we will apply the appropriate discount if applicable."
    },
    {
        "input": "How early should I arrive at the train station before departure?",
        "output": "We recommend arriving at the train station at least 30 minutes to an hour before your train's departure time to allow for security checks and boarding procedures."
    },
    {
        "input": "Do you provide food and beverages on the train?",
        "output": "Yes, we offer food and beverage services on most of our trains. You can choose from a variety of options during your journey. Please check with the train staff for menu details."
    },
    {
        "input": "Is there Wi-Fi available on the trains?",
        "output": "Some of our trains are equipped with Wi-Fi services. However, availability may vary depending on the route and train type. You can inquire about Wi-Fi when booking your ticket."
    },
    {
        "input": "How can I cancel my train ticket, and what are the cancellation charges?",
        "output": "You can cancel your train ticket through our website or at the train station. Cancellation charges depend on factors such as the time of cancellation and the type of ticket. Please refer to our cancellation policy for details."
    },
    {
        "input": "What documents do I need to carry while traveling by train?",
        "output": "You should carry a valid ID proof, such as Aadhar card, passport, or driver's license, along with your train ticket. It's essential to have these documents for verification during the journey."
    },
    {
        "input": "Tell me about the different types of trains available.",
        "output": "We offer various types of trains, including express trains, local trains, and high-speed trains. Each type serves different purposes and has varying levels of comfort and speed."
    },
    {
        "input": "How can I find the train schedule for a specific route?",
        "output": "You can find the train schedule for a specific route on our website or mobile app. Just enter your source and destination stations, and you'll get a list of available trains with their departure and arrival times."
    },
    {
        "input": "What amenities are provided in first-class train compartments?",
        "output": "First-class train compartments typically offer more spacious seating, better upholstery, and additional amenities such as complimentary meals, charging ports, and better privacy."
    },
    {
        "input": "What is the process for booking a ticket for a physically challenged passenger?",
        "output": "We provide assistance for physically challenged passengers. During the booking process, you can specify any special requirements, and we will do our best to accommodate them, including wheelchair accessibility."
    },
    {
        "input": "How can I track my train's real-time location during the journey?",
        "output": "You can track your train's real-time location using our mobile app or website. We provide live tracking information so you can stay updated on your train's progress."
    },
    {
        "input": "Are there any travel packages or tour options available with train bookings?",
        "output": "Yes, we offer travel packages and tour options in collaboration with tour operators. These packages can include train tickets, accommodations, and guided tours. Check our website for available options."
    },
    {
        "input": "Can I book a train ticket for an international journey?",
        "output": "Currently, our services are primarily for domestic train travel. For international train journeys, you may need to contact the respective international railway operators or agencies."
    },
    {
        "input": "What are the options for online check-in and e-tickets?",
        "output": "We offer e-tickets, which can be booked online and downloaded as PDFs. You can carry the e-ticket on your mobile device or print it for easy access during your journey."
    },
];
exports.classifier = new natural_1.default.BayesClassifier();
trainingData.forEach((data) => {
    exports.classifier.addDocument(data.input, data.output);
});
exports.classifier.train();
//# sourceMappingURL=training.data.js.map