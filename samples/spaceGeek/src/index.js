/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Brad Pitt wears many hats, an actor, a father, a fiancé, a philanthropist, world's sexiest man and a furniture designer.",
    "Brad Pitt was born on December eighteenth, nineteen sixty three and his full name is William Bradley Pitt.",
    "Brad Pitt was active at school, was involved in the debating society, and was in the drama club.",
    "Brad Pitt didn’t make it onto his middle school's basketball team so he got creative. He put together his own unofficial squad whom he jokingly named the team the Cherokee Rejects and even enlisted his father, Bill Pitt, as coach.",
    "Brad Pitt was in fifth grade with comedian David Spade.", 
    "Brad Pitts high school nickname was Brad the Pitt-Bull.",
    "Brad Pitt was plagued with acne while growing up. He later avoided scars by turning to the dermabrasion procedure.",
    "Brad Pitts mom, Jane Pitt, was a high school counselor before her retirement and his dad, Bill Pitt, owned a trucking company.",
    "Brad Pitt was a member of the Sigma Chi fraternity while attending the University of Missouri. He could have become a journalist, but he dropped out of college two weeks shy of graduation.",
    "Brad Pitt moved to Los Angeles in nineteen eighty six with three hundred twenty five dollars in his pocket and slept on Melissa Etheridge's couch.",
    "Brad Pitt did many small, low paying jobs before his acting career took off. Some of the most notable ones include being a dancing mascot for a restaurant, being a pool boy and serving as a chauffeur and drove around stippers.",
    "Brad Pitt went to an acting class with one of the strippers he drove around and met famous acting coach Roy London, which he says set him on the path to where I am now.",
    "Before Brad Pitt both hit it big, he was friends with Beverly Hills, nine oh two one oh star Jason Priestley.",
    "Brad Pitt made a Pringle’s commercial in nineteen eighty nine.",
    "Brad Pitt was only in Los Angeles for seven months before getting an agent.",
    "Brad Pitts first on-screen kiss happened with actress Shalane McCall during his five-episode run on the primetime soap Dallas.",
    "Brad Pitt almost wasn't going to star in Thelma & Louise which was his big break. He got the role when Billy Baldwin dropped out to do Backdraft.",
    "Brad Pitt was banned from entering China due to his controversial role in nineteen ninety sevens Seven Years in Tibet.",
    "Brad Pitt takes his acting career very seriously and is prepared to do anything to best portray his character. Brad voluntarily went to a dentist to have his front teeth chipped for the role of Tyler Durden in Fight Club. His teeth were fixed after he finished making the movie.",
    "Brad Pitt showed his parents the Chemical Burn scene from Fight Club to convince them to not watch the film.",
    "Brad Pitt spent a day at a Philadelphia psychiatric ward to help him get into character for his nine ninety five movie Twelve Monkeys.",
    "Brad Pitt won The Golden Globe for Twelve Monkeys. The movie starred Bruce Willis and Madelyn Stowe.",
    "During the filming of one of his most popular movies Seven, Brad Pitt broke his arm. Instead of delaying the filming due to this unfortunate event, the director had the injury written into the script.",
    "Brad Pitt went through a dark time in nineteen ninetys. I got really sick of myself at the end of the ninetys. I was hiding out from the celebrity thing; I was smoking way too much dope; I was sitting on the couch and just turning into a doughnut; and I really got irritated with myself. What's the point? I know better than this. He turned his life around and got back into acting.",
    "Director Tim Burton considered Brad Pitt for the lead in both “Sleepy Hollow” and “Charlie and the Chocolate Factory.” However, he ended up giving both roles to Johnny Depp.",
    "Brad Pitt has done work in animation; Sinbad: Legend of the Seven Seas. King of the Hill and 2010's animated hit Megamind.",
    "Brad Pitt injured his Achilles tendon while playing Achilles in Troy in two thousand four. According to the director Wolfgang Petersen, Brad injured himself while doing a stunt and was hobbling around for months.",
    "Brad Pitt quit smoking while filming Troy.",
    "Brad Pitt sued Playgirl magazine in nineteen ninety seven to stop the publication of nude photos of him. The nude photos were taken by paparazzi.",
    "Brad Pitt speaks Japanese, although not fluently, but well enough to carry a conversation.",
    "A nineteen year old girl entered Brad Pitts Los Angeles home through an open window in nineteen ninety nine, dressed in his clothes and slept in his bed before the alarm went off ten hours later. She was ordered to stay at least one hundred yards away from him for three years.",
    "Brad Pitt was named Sexiest Man Alive by People magazine in nineteen ninety five and two thousand.",
    "In two thousand five, Brad Pitt earned four point five million dollars for a Heineken commercial that aired during the two thousand five Super Bowl.",
    "Brad Pitt has dated some stellar names in Hollywood. Previous love interests include Robin Givens, Christina Applegate and Juliette Lewis. He was engaged to Gwyneth Paltrow and later married Jennifer Aniston. While he was still married to Aniston, he had a guest appearance on Friends during the eighth season of the hit series. He played a guy who had a grudge against Jennifer's character, Rachel.",
    "Brad Pitt helped designer Silvia Damiani create the round diamond ring that he proposed to Jennifer Aniston with in nineteen ninety nine. Unfortunately, the marriage didn’t last after becoming friendly with Angelina Jolie on the set of Mr and Mrs Smith in two thousand five.",
    "Fan appreciation for Brad Pitt dropped significantly when he connected with Angelina Jolie. Many called Jolie a “homewrecker,” as Aniston withdrew from the public eye.",
    "Brad Pitt and Angelina Jolie had their first daughter, Siloh, on May twenty seventh two thousand six in Namibia, away from the prying paparazzi.",
    "Brad Pitts partner, Angeles Jolie gave birth to twins, Knox Leon and Vivienne Marcheline, on July twelfth, two thousand eight, in a seaside hospital in southern France.",
    "Brad Pitt and Angelina Jolie sold the rights for the first images of their twins to People and Hello magazines for fourteen million dollars, making them the most expensive celebrity pictures ever taken. The money went to the Jolie-Pitt Foundation.",
    "Brad Pitt is a doting father to their six children - Maddox, Pax, Shiloh, Knox, Pax and Zahara. He reportedly wakes up early and makes breakfast for the children.",
    "Brad, Angelina and the younger children share a family bed which has extra long sheets and two couch extension to make enough room for everyone.",
    "Brad Pitt believes he suffers from prosopagnosia, the inability to remember faces. Pitt stated he means no disrespect, but remembering people’s face are nearly impossible unless he sees them consistently.",
    "Brad Pitt is very good friends with George Clooney. Brad once joked during an interview that he would marry Angelina Jolie only when friend and fellow Hollywood heartthrob George Clooney could marry a man, poking fun at the gay rumors surrounding George.",
    "Brad Pitt has donated money to support same-sex marriages and opposes California legislation banning such unions.",
    "Before Brad Pitt married Angelina Jolie in twenty fourteen, the couple said they will only get married once gay marriage is legal in the United States.",
    "Brad Pitts children are not allowed to Google him or Angelina Jolie. Brad said, On all the kids computers we had our names blocked. They can't Google their mom and dad. I don't want to make myself dependent on what other people think.",
    "Inspired by Angelina’s piloting skills, Brad Pitt also learned how to fly and has his pilots license.",    
    "Just like Angelina, Brad Pitt has also booked a ticket to fly to space on on Richard Branson’s Virgin Galactic.",
    "Brad Pitt designed and released his own line of high-concept furniture, which included a marble bathtub for two and a glass dining table with a geometric base.",
    "President Barack Obama is Brad Pitts ninth cousin. Researchers from the New England Historic Genealogical Society made the discovery in two thousand eight. They are connected by Edwin Hickman, who died in Virginia in seventeen sixty nine.",
    "Brad Pitt was involved in constructing one hundred fifty new homes in December two thousand six in New Orleans. He partnered with Steve Bing and offered five million dollars towards the Make It Right project.",
    "Brad Pitt sold his Malibu home to Ellen DeGeneres and Portia de Rossi in twenty twelve for thirteen million dollars.",
    "Brad Pitt is an ambassador for d.a.t.a, an advocacy group that champions debt reduction, fair trade and AIDS relief in Africa.",
    "World War Z. is now Brad Pitts highest grossing movie. Paramount Pictures said the zombie flick, which was produced by Brad’s company Plan B., has crossed the five hundred million dollar mark, surpassing Troy to become his highest grossing film to date.",
    "Brad Pitt offers pearls of wisdom. This idea of perpetual happiness is crazy and overrated, because those dark moments fuel you for the next bright moments; each one helps you appreciate the other, he said. We are all searching for meaning in our lives, love and betterment for ourselves and those around us.",
    "In the movie Fight Club, Brad Pitts character Tyler Durden flashes on screen four times before we actually meet him in the movie.",
    "Before shooting the movie Fight Club, Brad Pitt took boxing and soap making classes.",
    "Brad Pitts height is five foot eleven",
    "Before deciding on Brad Pitt for the role of Tyler Durden in Fight Club, the producers initially wanted Russell Crowe to play the part.",
    "Brad Pitt and Helena Bonham Carter spent three days recording orgasm sounds for their unseen sex scenes in Fight Club.",
    "In the scene where the narrator first punches Tyler Durden in the movie Fight Club, Edward Norton was supposed to fake-hit Brad Pitt…But at the last minute, director David Fincher told Edward Norton to actually punch Brad Pitt. Pitt’s wince of pain is real, and you can see Norton laughing about it.",
    "In the Fight Club scene when Tyler Durden who, played by Brad Pitt is giving a speech to the Fight Club members, he looks directly at Jared Leto’s character when he mentions rockstars, who ironically is a rock star."
    
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a brad pitt fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

