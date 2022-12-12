import Head from "next/head";
import Image from "next/image";
import quotes from "../common/quotes.json";

export default function Home(props: any) {
  const { randomQuoteIndex } = props;
  const randomIndex = 1;

  return (
    <div>
      <Head>
        <title>SiaExplains.com</title>
        <meta
          name="description"
          content="We are growing together! SiaExplains | Entertainment + Education"
        />
        <meta
          name="keywords"
          content="software development, SiaExplains, education, programming, Entertainment, youtuber"
        />
        <meta name="author" content="Siavash Ghanbari" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="slider-image">
        <div className="quote">
          <span id="quote">“{quotes[randomIndex].text}”</span>
          <br />―<span id="quote-by"> {quotes[randomIndex].by}</span>
        </div>
      </div>
      <div className="se-container">
        <div className="se-container__section">
          <h1 id="about">Hey Friends</h1>
          <p>This section will be updated soon!</p>
          <p>This section will be updated soon!</p>
        </div>

        <div className="se-container__section">
          <h2 id="courses">Courses</h2>
          <p>Course will be updated soon!</p>
          <p>This section will be updated soon!</p>
          <p>This section will be updated soon!</p>
        </div>
        <div className="se-container__section blog">
          <h2 id="blog">Blog</h2>
          <div className="list-summary">
            <div className="item-summary">
              <a href="#">FlexBox vs Gird, which one is better?</a>
              <p>
                Grid is best for two-dimensional layouts with many elements that
                need to be precisely positioned relative to each other. Flexbox
                is better for one-dimensional or single-line layouts where you
                just need to space a bunch of elements a certain way....
              </p>
            </div>
            <div className="item-summary">
              <a href="#">What are the best stack for 2023?</a>
              <p>
                A full stack development framework is a collection of software
                that provides a complete end-to-end solution for web
                development. The term full-stack refers to the framework
                containing all the tools necessary to build a complete web
                application, from the front-end user interface to the back-end
                database....
              </p>
            </div>
            <div className="item-summary">
              <a href="#">Async programming</a>
              <p>
                Asynchronous programming is a technique that enables your
                program to start a potentially long-running task and still be
                able to be responsive to other events while that task runs,
                rather than having to wait until that task has finished. Once
                that task has finished, your program is presented with the
                result....
              </p>
            </div>
          </div>
          <p className="show-more">
            <a href="/blog">Show More</a>
          </p>
        </div>
        <div className="se-container__section">
          <h2 id="videos">Videos</h2>
          <p>Videos section will be updated soon!</p>
          <p>This section will be updated soon!</p>
          <p>This section will be updated soon!</p>
        </div>
        <div className="se-container__section">
          <h2 id="coaching">Coaching</h2>
          <p>Coaching section will be updated soon!</p>
          <p>This section will be updated soon!</p>
          <p>This section will be updated soon!</p>
        </div>
        <div className="se-container__section contact">
          <div className="left-side">
            <h2 id="contact">Contact</h2>
            <p>
              Email:
              <a href="mailto:SiaExplains@gmail.com">Send an email to me!</a>
            </p>
            <p>
              <a href="https://github.com/SiaExplains/">Github</a>
            </p>
            <p>
              <a href="https://www.linkedin.com/in/siavash-ghanbari/">
                LinkedIn
              </a>
            </p>
          </div>
          <div className="right-side">
            <Image
              width={200}
              height={200}
              className="buymeacoffee"
              src="/images/bmc_qr.png"
              alt="BuyMeACoffee"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
