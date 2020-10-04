import React from "react";
import { Link } from "react-router-dom";

const fanMail = [
  `My wife and I are HUGE fans of your app. You helped us to find incredible places to stay for the two weeks that we spent traveling our national parks a couple years back, plus we've found it increasingly helpful now that we live in the PNW. Thanks for building such a great tool/service AND for sharing it!`,
  `You are amazing! Thank you so much. This is the only way we have been able to get these sites and they are a treat for our whole family. Really appreciate your help!`,
  `I am so grateful for your program! This is a game changer for those who can’t book a year in advance! I was able to go camping last weekend and it was due to your program. Thank You, thank you, thank you!!!`,
  `Great job! Another vacation reservation thanks to your great website! Keep up the good work!`,
  `I think your site is worthless...`,
  `Your site is amazing!`,
  `Thanks for providing such a great service! I'm grateful that this exists since I love last-minute trips to paradise in the great outdoors`,
  `Words cannot convey how much I appreciate your website!`,
  `Just wanted to say Thank You sooooooooo much – this makes camping for our family possible at our favorite spots.`,
  `Hi, I just wanted to thank you for this service. It is priceless to me! I have been able to snag many FL state park reservations (and other states as well) using this service. I appreciate this so much and just wanted to say thank you!`,
  `Let me say that Wandering Labs is an amazing site. I thank you for all the opportunities that you gave us to go camping when we couldn’t get a site. You created memories for us.`,
  `I just stumbled upon your site, and just wanted to say thank you!!! This is exactly what we've been looking for, and thanks to you we were able to snag a campsite for next week! `,
];

const PageAbout = () => {
  return (
    <div>
      <article className="prose mb-6">
        <h1>About</h1>
      </article>

      <div className="md:flex">
        <div className="md:flex w-full">
          <article className="prose">
            <p>
              Camping has never been more popular and thus campgrounds are often completely full and reserved months in
              advance. Your only chance to camp is to hope someone's plans change and they cancel their reservation.
              Freeing up space for you.{" "}
            </p>

            <p>
              How will you know there is now a few nights available? We will tell you. Our service checks for available
              campsites every few minutes and sends off an email giving you a heads up. That's it. That simple. It will
              be then up to you to actually reserve the open spot.
            </p>

            <h2>Is this service still active and working?</h2>

            <p>
              Check the activity log: <Link to="logs">Activity Log</Link>
            </p>

            <h2>Fan Mail</h2>

            {fanMail.map((item, i) => <p key={i}>{item}</p>)}

          </article>
        </div>
        <div className="md:flex w-full">
          <article className="prose">
            <h2>Who</h2>
            <p>
              I'm Tim and I had a problem. My wife and I live fulltime in our Airstream and hate planning more then a
              month or two in advance but we love staying at our awesome (and well used) public campgrounds. I built
              this service to solve a problem and then decided to share. If you have comments or questions you can email
              me at: <a href="mailto:info@wanderinglabs.com">info@wanderinglabs.com</a>. I'll do my best to get back to
              you.
            </p>

            <p>
              <a href="http://wanderinglabs.com">Wandering Labs</a> is a creation of{" "}
              <a href="https://github.com/tiwatson">Tim Watson</a>
            </p>
            <p>
              Wandering Labs is not affiliated with, maintained by, or in any way officially connected with Reserve
              California, Recreation.gov, Reserve America, or Active Network.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
