import React from "react";
import "./Contact.scss";
const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact us </h1>
      <form>
        <div className="topinputs">
          <div className="input-item">
            <div>
              <label>Nom</label>
            </div>
            <input type="text" placeholder="nom" />
          </div>
          <div className="input-item">
            <div>
              <label>Email</label>
            </div>
            <input type="text" placeholder="email" />
          </div>
        </div>
        <div className="input-item">
          <div>
            <label>Message</label>
          </div>
          <textarea typeof="text" aria-placeholder="your message here " />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Contact;
