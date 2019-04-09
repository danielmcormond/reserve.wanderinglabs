import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class PageAbout extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Header as="h4">
            <Header.Content>About</Header.Content>
          </Header>
          <p>
            Camping has never been more popular and thus campgrounds are often
            completely full and reserved months in advance. Your only chance to
            camp is to hope someone's plans change and they cancel their
            reservation. Freeing up space for you.{" "}
          </p>

          <p>
            How will you know there is now a few nights available? We will tell
            you. Our service checks for available campsites every few minutes
            and sends off an email giving you a heads up. That's it. That
            simple. It will be then up to you to actually reserve the open spot.
          </p>

          <Header as="h5">
            <Header.Content>
              Is this service still active and working?
            </Header.Content>
          </Header>

          <p>
            Check the activity log: <Link to="log">Activity Log</Link>
          </p>

          <Header as="h5">
            <Header.Content>Fan Mail</Header.Content>
          </Header>

          <p>
            You are amazing! Thank you so much. This is the only way we have
            been able to get these sites and they are a treat for our whole
            family. Really appreciate your help!
          </p>

          <p>
            I am so grateful for your program! This is a game changer for those
            who can’t book a year in advance! I was able to go camping last
            weekend and it was due to your program. Thank You, thank you, thank
            you!!!
          </p>

          <p>
            Great job! Another vacation reservation thanks to your great
            website! Keep up the good work!
          </p>

          <p>I think your site is worthless...</p>

          <p>Your site is amazing!</p>

          <p>
            Thanks for providing such a great service! I'm grateful that this
            exists since I love last-minute trips to paradise in the great
            outdoors{" "}
          </p>

          <p>Words cannot convey how much I appreciate your website!</p>

          <p>
            Just wanted to say Thank You sooooooooo much – this makes camping
            for our family possible at our favorite spots.
          </p>

          <p>
            Hi, I just wanted to thank you for this service. It is priceless to
            me! I have been able to snag many FL state park reservations (and
            other states as well) using this service. I appreciate this so much
            and just wanted to say thank you!
          </p>
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Header as="h4">
            <Header.Content>Who</Header.Content>
          </Header>
          <p>
            I'm Tim and I had a problem. My wife and I live fulltime in our
            Airstream and hate planning more then a month or two in advance but
            we love staying at our awesome (and well used) public campgrounds. I
            built this service to solve a problem and then decided to share. If
            you have comments or questions you can email me at:{" "}
            <a href="mailto:info@wanderinglabs.com">info@wanderinglabs.com</a>.
            I'll do my best to get back to you.
          </p>

          <p>
            <a href="http://wanderinglabs.com">Wandering Labs</a> is a creation
            of <a href="https://github.com/tiwatson">Tim Watson</a>
          </p>
          <p>
            Wandering Labs is not affiliated with, maintained by, or in any way
            officially connected with Reserve California, Recreation.gov,
            Reserve America, or Active Network.
          </p>
        </Grid.Column>
      </Grid>
    );
  }
}
