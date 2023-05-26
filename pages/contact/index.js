import { Fragment } from "react";
import ContactForm from "../../components/contact/contact-form";
import Head from "next/head";

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Contact meee" />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
