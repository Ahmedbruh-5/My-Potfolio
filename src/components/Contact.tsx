import React, { useState } from 'react';
import '../assets/styles/Contact.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import EmailIcon from '@mui/icons-material/Email';
import TextField from '@mui/material/TextField';
import resumePdf from '../assets/resume/Ahmed_Aamir_Resume.pdf';
import SectionHeader from './SectionHeader';
import { CONTACT_EMAIL, LINKEDIN_URL } from '../constants/contact';

function Contact() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const hasNameError = name.trim() === '';
    const hasEmailError = email.trim() === '';
    const hasMessageError = message.trim() === '';

    setNameError(hasNameError);
    setEmailError(hasEmailError);
    setMessageError(hasMessageError);

    if (hasNameError || hasEmailError || hasMessageError) {
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name.trim()}`);
    const body = encodeURIComponent(
      `${message.trim()}\n\n---\nFrom: ${name.trim()}\nReply to: ${email.trim()}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <SectionHeader
            eyebrow="Contact"
            title="Get in touch"
            subtitle="Got a project waiting to be realized? Let's collaborate and make it happen!"
          />

          <div className="contact-direct">
            <Button
              className="resume-primary"
              size="large"
              variant="contained"
              component="a"
              href={`mailto:${CONTACT_EMAIL}`}
              startIcon={<EmailIcon />}
            >
              {CONTACT_EMAIL}
            </Button>
            <Button
              className="resume-secondary"
              size="large"
              variant="outlined"
              component="a"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </Button>
          </div>

          <div className="contact-actions">
            <Button
              className="resume-secondary"
              size="large"
              variant="outlined"
              component="a"
              href={resumePdf}
              download
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </Button>
            <Button
              className="resume-secondary"
              size="large"
              variant="outlined"
              component="a"
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </Button>
          </div>

          {submitted && (
            <p className="contact-success" role="status">
              Your email client should open shortly. If it doesn't, email me directly at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          )}

          <Box
            component="form"
            noValidate
            autoComplete="off"
            className="contact-form"
            onSubmit={sendEmail}
          >
            <div className="form-flex">
              <TextField
                required
                id="contact-name"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                helperText={nameError ? 'Please enter your name' : ''}
              />
              <TextField
                required
                id="contact-email"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
                helperText={emailError ? 'Please enter your email or phone number' : ''}
              />
            </div>
            <TextField
              required
              id="contact-message"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={8}
              className="body-form"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              error={messageError}
              helperText={messageError ? 'Please enter the message' : ''}
            />
            <Button className="send-btn" variant="contained" type="submit" endIcon={<SendIcon />}>
              Send Message
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Contact;
