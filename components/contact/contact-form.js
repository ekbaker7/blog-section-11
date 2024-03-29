import { useRef, useState, useEffect } from "react";

import Notification from "../ui/notification";

import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

function ContactForm() {
  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();
  const [requestStatus, setRequestStatus] = useState() // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
        const timer = setTimeout(() => {
            setRequestStatus(null)
            setRequestError(null)
        }, 3000)

        return () => clearTimeout(timer)
    }
  }, [requestStatus])

  async function onSubmitHandler(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const message = messageRef.current.value;

    setRequestStatus("pending");

    try {
      await sendContactData({ email, name, message });
        setRequestStatus('success')
    } catch (error) {
        setRequestError(error.message)
        setRequestStatus('error')
    }
  }

  let notification

  if (requestStatus === 'pending') {
    notification = {
        status: 'pending',
        title: 'Sending message...',
        message: 'Sending your message right away!'
    }
  } else if (requestStatus === 'success') {
    notification = {
        status: 'success',
        title: 'Success!',
        message: 'Your message has been sent!'
    }
  } else if (requestStatus === 'error') {
    notification = {
        status: 'error',
        title: 'Something went wrong.',
        message: requestError
    }
  }

  return (
    <section className={classes.contact} onSubmit={onSubmitHandler}>
      <h1>How can I help you?</h1>
      <form className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" required ref={nameRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Name</label>
          <textarea id="message" rows="5" required ref={messageRef} />
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    </section>
  );
}

export default ContactForm;
