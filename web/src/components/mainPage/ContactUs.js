//import React from 'react';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

/*export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjswe
      .sendForm('service_z6ftge9', 'service_z6ftge9', form.current, {
        publicKey: 'VYHdyH1a8DTcRyrEv',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
    <label>Name</label>
    <input type="text" name="user_name" />
    <label>Email</label>
    <input type="email" name="user_email" />
    <label>Message</label>
    <textarea name="message" />
    <input type="submit" value="Send" />
  </form>
);
};
*/




export  function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you would typically send the formData to your server
    // or a third-party service handling form submissions
    setSubmitted(true);
  };

  if (submitted) {
    return <div>Thank you! We received your submission.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="surname">Surname</label>
      <input id="surname" type="text" name="surname" value={formData.surname} onChange={handleChange} />
      
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
      
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" value={formData.message} onChange={handleChange} />
      
      <button type="submit">Send</button>
    </form>
  );
}


